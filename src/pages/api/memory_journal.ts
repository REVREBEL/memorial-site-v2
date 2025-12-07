import type { APIRoute } from 'astro';
import { getDb } from '../../db';
import { memories } from '../../db/schema';

export const GET: APIRoute = async ({ locals }) => {
  try {
    const db = getDb(locals.runtime.env.DB);
    const allMemories = await db.select().from(memories).orderBy(memories.created_at).all();
    
    return new Response(JSON.stringify(allMemories), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching memories:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch memories' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string | null;
    const headline = formData.get('headline') as string;
    const memory = formData.get('memory') as string;
    const memory_date = formData.get('memory_date') as string | null;
    const location = formData.get('location') as string | null;
    const tags = formData.get('tags') as string | null;
    const file = formData.get('file') as File | null;

    // Validate required fields
    if (!name || !headline || !memory) {
      return new Response(JSON.stringify({ error: 'Missing required fields: name, headline, memory' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let media_key: string | null = null;
    let media_type: string | null = null;

    // Handle file upload to R2
    if (file && file.size > 0) {
      try {
        const timestamp = Date.now();
        const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        media_key = `memories/${timestamp}-${sanitizedName}`;
        media_type = file.type;

        const arrayBuffer = await file.arrayBuffer();
        await locals.runtime.env.MEDIA_BUCKET.put(media_key, arrayBuffer, {
          httpMetadata: {
            contentType: file.type,
          },
        });

        console.log('File uploaded to R2:', media_key);
      } catch (uploadError) {
        console.error('Error uploading file to R2:', uploadError);
        return new Response(JSON.stringify({ error: 'Failed to upload media file' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    // Insert into database
    const db = getDb(locals.runtime.env.DB);
    const result = await db.insert(memories).values({
      name,
      email: email || null,
      headline,
      memory,
      memory_date: memory_date || null,
      location: location || null,
      tags: tags || null,
      media_key,
      media_type,
      created_at: new Date(),
    }).returning();

    console.log('Memory created:', result);

    return new Response(JSON.stringify(result[0]), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating memory:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to create memory',
      details: error instanceof Error ? error.message : String(error)
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
