import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params, locals }) => {
  try {
    const key = params.key;
    
    if (!key) {
      return new Response('Missing media key', { status: 400 });
    }

    const object = await locals.runtime.env.MEDIA_BUCKET.get(key);
    
    if (!object) {
      return new Response('Media not found', { status: 404 });
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set('Cache-Control', 'public, max-age=31536000');

    return new Response(object.body, { headers });
  } catch (error) {
    console.error('Error fetching media:', error);
    return new Response('Internal server error', { status: 500 });
  }
};
