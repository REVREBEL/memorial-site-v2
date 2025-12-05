import type { APIRoute } from 'astro';
import { getDb } from '../../../../db/getDb';
import { likes, memories } from '../../../../db/schema';
import { eq, count } from 'drizzle-orm';

export const POST: APIRoute = async ({ params, locals }) => {
  try {
    const { memoryId } = params;
    
    if (!memoryId) {
      return new Response(JSON.stringify({ error: 'Memory ID is required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const db = getDb(locals);
    
    // Verify the memory exists
    const [memory] = await db
      .select()
      .from(memories)
      .where(eq(memories.id, memoryId))
      .limit(1);
    
    if (!memory) {
      return new Response(JSON.stringify({ error: 'Memory not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    // Add a like
    await db.insert(likes).values({
      memory_id: memoryId,
    });
    
    // Get the updated count
    const [result] = await db
      .select({ count: count() })
      .from(likes)
      .where(eq(likes.memory_id, memoryId));
    
    return new Response(JSON.stringify({ 
      memory_id: memoryId,
      likes: result.count 
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error liking memory:', error);
    return new Response(JSON.stringify({ error: 'Failed to like memory' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
