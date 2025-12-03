import type { APIRoute } from 'astro';
import { getDb } from '../../../../db/getDb';
import { memories } from '../../../../db/schema';
import { eq, sql } from 'drizzle-orm';

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
    const [memory] = await db
      .update(memories)
      .set({ likes: sql`${memories.likes} + 1` })
      .where(eq(memories.id, parseInt(memoryId)))
      .returning();
    
    if (!memory) {
      return new Response(JSON.stringify({ error: 'Memory not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    return new Response(JSON.stringify(memory), {
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
