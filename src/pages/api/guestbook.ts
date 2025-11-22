import type { APIRoute } from 'astro';
import { getAllGuestbookEntries, insertGuestbookEntry } from '../../services/database';
import type { GuestbookEntry, GuestbookApiResponse, GuestbookLocation } from '../../types';

import { z } from 'zod';

const guestbookSchema = z.object({
  name: z.string().min(1),
  message: z.string().optional(),
  doodle: z.string().optional(),
}).refine(data => data.message || data.doodle, {
  message: "Either message or doodle is required",
  path: ["message"],
});

export const GET: APIRoute = async () => {
  try {
    const entries: GuestbookEntry[] = await getAllGuestbookEntries(20);
    return new Response(JSON.stringify(entries), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (e) {
    console.error('Guestbook fetch error:', e);
    const errorResponse: GuestbookApiResponse = { message: 'Server Error', error: 'Failed to fetch guestbook entries' };
    return new Response(JSON.stringify(errorResponse), {
      status: 500,
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const parsed = guestbookSchema.safeParse(body);

    if (!parsed.success) {
      const errorResponse: GuestbookApiResponse = { 
        message: 'Missing or invalid fields', 
        error: parsed.error.message 
      };
      return new Response(
        JSON.stringify(errorResponse),
        { status: 400 }
      );
    }

    const { name, message, doodle } = parsed.data;

    // Infer location from headers (Vercel)
    const city = request.headers.get('x-vercel-ip-city');
    const country = request.headers.get('x-vercel-ip-country');
    const lat = request.headers.get('x-vercel-ip-latitude');
    const lng = request.headers.get('x-vercel-ip-longitude');

    let location = null;
    if (city && country && lat && lng) {
      const locationData: GuestbookLocation = { 
        city, 
        country, 
        lat: parseFloat(lat), 
        lng: parseFloat(lng) 
      };
      location = JSON.stringify(locationData);
    }

    await insertGuestbookEntry({
      name,
      message: message || null,
      doodle: doodle || null,
      location,
      email: 'anonymous@example.com',
    });

    const successResponse: GuestbookApiResponse = { message: 'Entry added successfully' };
    return new Response(JSON.stringify(successResponse), {
      status: 200,
    });
  } catch (e) {
    console.error('Guestbook error:', e);
    const errorResponse: GuestbookApiResponse = { message: 'Server Error', error: 'Failed to add guestbook entry' };
    return new Response(JSON.stringify(errorResponse), {
      status: 500,
    });
  }
};
