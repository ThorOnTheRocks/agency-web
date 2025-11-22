import type { APIRoute } from 'astro';
import { insertGuestbookEntry } from '../../services/database';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    
    // Basic validation
    if (!data.name || !data.email || !data.message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const entry = await insertGuestbookEntry({
      name: data.name,
      email: data.email,
      message: data.message,
      doodle: data.doodle,
      location: data.location ? JSON.stringify(data.location) : undefined,
    });

    return new Response(JSON.stringify(entry), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error creating guestbook entry:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
