import type { APIRoute} from 'astro';
import { getDb } from '../../../db/getDb';
import { guestbook } from '../../../db/schema';
import { desc } from 'drizzle-orm';

type GuestbookPayload = {
  name: string;
  email: string;
  location?: string | null;
  relationship: string;
  first_met?: string | null;
  message: string;
};

const isGuestbookPayload = (value: unknown): value is GuestbookPayload => {
  if (!value || typeof value !== 'object') return false;
  const data = value as Record<string, unknown>;
  return (
    typeof data.name === 'string' &&
    typeof data.email === 'string' &&
    typeof data.relationship === 'string' &&
    typeof data.message === 'string'
  );
};

export const GET: APIRoute = async ({ locals }) => {
  try {
    const db = getDb(locals);
    const allEntries = await db
      .select()
      .from(guestbook)
      .orderBy(desc(guestbook.created_at));
    
    return new Response(JSON.stringify(allEntries), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching guestbook entries:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch entries' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const data = await request.json();
    if (!isGuestbookPayload(data)) {
      return new Response(
        JSON.stringify({ error: 'Invalid request payload' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    const { name, email, location, relationship, first_met, message } = data;
    
    // Validate required fields
    if (!name || !message || !email || !relationship) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Generate a unique ID
    const id = `gb_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    
    const db = getDb(locals);
    const [entry] = await db.insert(guestbook).values({
      id,
      name,
      email,
      location: location || null,
      relationship,
      first_met: first_met || null,
      message,
    }).returning();
    
    return new Response(JSON.stringify(entry), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error creating guestbook entry:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to create entry',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
