import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params, locals }) => {
  console.log('=== MEDIA SERVING REQUEST ===');
  
  try {
    // Get the full path - Astro provides it as params.key for catch-all routes
    const key = params.key;
    
    if (!key) {
      console.error('❌ No key provided');
      return new Response('Media key required', { status: 400 });
    }

    console.log('🔍 Fetching media with key:', key);

    const mediaBucket = locals.runtime.env.MEDIA_BUCKET;
    
    if (!mediaBucket) {
      console.error('❌ Media storage not configured');
      return new Response('Media storage not configured', { status: 500 });
    }

    // Get object from R2 - the key might be something like "photos/1764840799434-vexxhw3lh2r.jpg"
    const object = await mediaBucket.get(key);

    if (!object) {
      console.error('❌ Media not found in R2:', key);
      
      // Try without the "photos/" prefix in case it was stored differently
      if (key.startsWith('photos/')) {
        const alternateKey = key.replace('photos/', '');
        console.log('🔄 Trying alternate key:', alternateKey);
        const altObject = await mediaBucket.get(alternateKey);
        
        if (altObject) {
          console.log('✅ Media found with alternate key:', alternateKey);
          const headers = new Headers();
          if (altObject.httpMetadata?.contentType) {
            headers.set('Content-Type', altObject.httpMetadata.contentType);
          }
          headers.set('Cache-Control', 'public, max-age=31536000');
          
          return new Response(altObject.body, { status: 200, headers });
        }
      }
      
      // Return a 1x1 transparent PNG as placeholder
      // Use Uint8Array which works in both Node and Cloudflare Workers
      console.log('📷 Returning placeholder image for missing media');
      const transparentPngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
      
      // Decode base64 to bytes using atob (works in Workers)
      const binaryString = atob(transparentPngBase64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      return new Response(bytes, {
        status: 200,
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'no-cache',
          'X-Image-Status': 'placeholder',
        },
      });
    }

    console.log('✅ Media found:', key);
    console.log('  Type:', object.httpMetadata?.contentType);
    console.log('  Size:', object.size, 'bytes');

    // Stream the object back
    const headers = new Headers();
    if (object.httpMetadata?.contentType) {
      headers.set('Content-Type', object.httpMetadata.contentType);
    }
    headers.set('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year

    return new Response(object.body, {
      status: 200,
      headers,
    });

  } catch (error) {
    console.error('❌ Media serving error:', error);
    return new Response('Failed to serve media', { status: 500 });
  }
};
