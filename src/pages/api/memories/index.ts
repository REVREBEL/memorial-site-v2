import type { APIRoute } from 'astro';
import { getDb } from '../../../db/getDb';
import { memories } from '../../../db/schema';
import { desc } from 'drizzle-orm';

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
    
    console.log('📥 [API] Received form data:', Array.from(formData.keys()));
    
    const headline = formData.get('headline') as string;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string | null;
    const memory = formData.get('memory') as string;
    const memoryDate = formData.get('memory_date') as string | null;
    const location = formData.get('location') as string | null;
    const tags = formData.get('tags') as string;
    const file = formData.get('file') as File | null; // Changed from 'media' to 'file'
    
    console.log('📋 [API] Form values:', {
      headline: headline ? `"${headline}"` : 'MISSING',
      name: name ? `"${name}"` : 'MISSING',
      email: email ? `"${email}"` : 'null',
      memory: memory ? `"${memory.substring(0, 30)}..."` : 'MISSING',
      memoryDate: memoryDate ? `"${memoryDate}"` : 'null',
      location: location ? `"${location}"` : 'null',
      tags: tags ? `"${tags}"` : '""',
      file: file ? `${file.name} (${file.size} bytes)` : 'null'
    });
    
    // Validate required fields
    if (!headline || !name || !memory) {
      console.error('❌ [API] Missing required fields:', { headline: !!headline, name: !!name, memory: !!memory });
      return new Response(
        JSON.stringify({ error: 'Missing required fields: headline, name, and memory are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    let mediaKey: string | null = null;
    let mediaType: 'photo' | 'video' | 'none' = 'none';
    
    // Handle media upload if present - directly upload to R2
    if (file && file.size > 0) {
      console.log('📤 [API] Uploading file:', file.name, file.type, `${(file.size / 1024 / 1024).toFixed(2)}MB`);
      
      const mediaBucket = locals.runtime.env.MEDIA_BUCKET;
      
      if (!mediaBucket) {
        console.error('❌ [API] Media storage not configured');
        return new Response(
          JSON.stringify({ error: 'Media storage not configured' }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
      
      try {
        // Validate file size (1.5MB for images, 10MB for videos)
        const maxSize = file.type.startsWith('video/') ? 10 * 1024 * 1024 : 1.5 * 1024 * 1024;
        if (file.size > maxSize) {
          const maxSizeMB = file.type.startsWith('video/') ? '10MB' : '1.5MB';
          console.error('❌ [API] File too large:', file.size, 'bytes. Max:', maxSize);
          return new Response(
            JSON.stringify({ 
              error: `File too large. Max size is ${maxSizeMB}. Please compress your ${file.type.startsWith('video/') ? 'video' : 'image'} first.` 
            }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
          );
        }
        
        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm', 'video/quicktime'];
        if (!allowedTypes.includes(file.type)) {
          console.error('❌ [API] Invalid file type:', file.type);
          return new Response(
            JSON.stringify({ error: 'Invalid file type. Only images and videos are allowed.' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
          );
        }
        
        // Generate unique filename with proper prefix
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 15);
        const extension = file.name.split('.').pop();
        const prefix = file.type.startsWith('video/') ? 'videos' : 'photos';
        const filename = `${prefix}/${timestamp}-${randomString}.${extension}`;
        
        console.log('📝 [API] Generated filename:', filename);
        
        // Upload to R2
        const arrayBuffer = await file.arrayBuffer();
        await mediaBucket.put(filename, arrayBuffer, {
          httpMetadata: {
            contentType: file.type,
          },
        });
        
        console.log('✅ [API] Media uploaded to R2:', filename);
        
        mediaKey = filename;
        mediaType = file.type.startsWith('image/') ? 'photo' : 'video';
      } catch (uploadError) {
        console.error('❌ [API] Upload error:', uploadError);
        return new Response(
          JSON.stringify({ error: 'Failed to upload media', details: uploadError instanceof Error ? uploadError.message : 'Unknown error' }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }
    
    // Generate a unique ID
    const id = `mem_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    
    // Parse tags
    let parsedTags: string[] = [];
    try {
      parsedTags = tags ? JSON.parse(tags) : [];
      console.log('🏷️  [API] Parsed tags:', parsedTags);
    } catch (e) {
      console.error('⚠️ [API] Failed to parse tags:', e);
      parsedTags = [];
    }
    
    // Prepare memory data - ensure proper handling of null/undefined values
    const memoryData = {
      id,
      headline: headline.trim(),
      name: name.trim(),
      email: email?.trim() || null,
      memory: memory.trim(),
      memory_date: memoryDate?.trim() || null,
      location: location?.trim() || null,
      tags: parsedTags,
      media_key: mediaKey,
      media_type: mediaType,
    };
    
    console.log('💾 [API] Attempting to insert memory with data:', {
      ...memoryData,
      memory: `${memoryData.memory.substring(0, 50)}...`,
      tags: JSON.stringify(memoryData.tags)
    });
    
    try {
      const db = getDb(locals);
      console.log('🔌 [API] Database connection established');
      
      const [newMemory] = await db.insert(memories).values(memoryData).returning();
      
      console.log('✅ [API] Memory created successfully:', newMemory.id);
      
      return new Response(JSON.stringify(newMemory), {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (dbError) {
      console.error('❌ [API] Database insert error:', dbError);
      console.error('❌ [API] Error type:', typeof dbError);
      console.error('❌ [API] Error keys:', dbError ? Object.keys(dbError) : 'null');
      console.error('❌ [API] Error message:', dbError instanceof Error ? dbError.message : JSON.stringify(dbError));
      console.error('❌ [API] Error stack:', dbError instanceof Error ? dbError.stack : 'no stack');
      
      throw dbError; // Re-throw to be caught by outer catch
    }
  } catch (error) {
    console.error('❌ [API] Error creating memory (outer catch):', error);
    console.error('❌ [API] Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to create memory',
        details: error instanceof Error ? error.message : 'Unknown error',
        type: typeof error,
        errorString: String(error)
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
