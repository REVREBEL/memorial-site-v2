import type { APIRoute } from 'astro';
import { getDb } from '../../../db/getDb';
import { memories } from '../../../db/schema';
import { desc } from 'drizzle-orm';
import { baseUrl } from '../../../lib/base-url';

export const GET: APIRoute = async ({ locals }) => {
  try {
    const db = getDb(locals);
    const allMemories = await db
      .select()
      .from(memories)
      .orderBy(desc(memories.created_at));
    
    return new Response(JSON.stringify(allMemories), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching memories:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch memories' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const formData = await request.formData();
    
    const headline = formData.get('headline') as string;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const memory = formData.get('memory') as string;
    const memoryDate = formData.get('memoryDate') as string | null;
    const location = formData.get('location') as string | null;
    const tags = formData.get('tags') as string;
    const media = formData.get('media') as File | null;
    
    // Validate required fields
    if (!headline || !name || !email || !memory) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    let mediaKey: string | null = null;
    let mediaType: 'photo' | 'video' | 'none' = 'none';
    
    // Handle media upload if present
    if (media && media.size > 0) {
      const uploadFormData = new FormData();
      uploadFormData.append('media', media);
      
      const uploadResponse = await fetch(`${baseUrl}/api/upload`, {
        method: 'POST',
        body: uploadFormData,
      });
      
      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        console.error('Upload failed:', errorText);
        return new Response(
          JSON.stringify({ error: 'Failed to upload media' }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
      
      const uploadResult = await uploadResponse.json();
      mediaKey = uploadResult.key;
      mediaType = media.type.startsWith('image/') ? 'photo' : 'video';
    }
    
    // Generate a unique ID
    const id = `mem_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    
    // Parse tags
    let parsedTags: string[] = [];
    try {
      parsedTags = tags ? JSON.parse(tags) : [];
    } catch (e) {
      console.error('Failed to parse tags:', e);
    }
    
    const db = getDb(locals);
    const [newMemory] = await db.insert(memories).values({
      id,
      headline,
      name,
      email,
      memory,
      memory_date: memoryDate || null,
      location: location || null,
      tags: parsedTags,
      media_key: mediaKey,
      media_type: mediaType,
    }).returning();
    
    return new Response(JSON.stringify(newMemory), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error creating memory:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to create memory',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
