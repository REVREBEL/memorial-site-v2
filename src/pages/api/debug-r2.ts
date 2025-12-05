import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ locals }) => {
  try {
    const mediaBucket = locals.runtime.env.MEDIA_BUCKET;
    
    if (!mediaBucket) {
      return new Response(JSON.stringify({ error: 'Media storage not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // List all objects in the bucket
    const listed = await mediaBucket.list({ limit: 100 });
    
    const objects = listed.objects.map(obj => ({
      key: obj.key,
      size: obj.size,
      uploaded: obj.uploaded,
    }));

    return new Response(JSON.stringify({
      count: objects.length,
      objects,
      truncated: listed.truncated,
    }, null, 2), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('❌ R2 list error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to list R2 objects',
      details: error instanceof Error ? error.message : String(error)
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
