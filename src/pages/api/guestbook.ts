import type { APIRoute } from 'astro';
import { db } from '../../db/client';
import { guestbook } from '../../db/schema';

import { z } from 'zod';

import { desc } from 'drizzle-orm';

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
    const entries = await db.select().from(guestbook).orderBy(desc(guestbook.createdAt)).limit(20);
    return new Response(JSON.stringify(entries), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (e) {
    console.error('Guestbook fetch error:', e);
    return new Response(JSON.stringify({ error: 'Server Error' }), {
      status: 500,
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const parsed = guestbookSchema.safeParse(body);

    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: 'Missing or invalid fields', details: parsed.error }),
        { status: 400 }
      );
    }

    const { name, message, doodle } = parsed.data as any; // TODO: Update zod schema

    // Infer location from headers (Vercel)
    const city = request.headers.get('x-vercel-ip-city');
    const country = request.headers.get('x-vercel-ip-country');
    const lat = request.headers.get('x-vercel-ip-latitude');
    const lng = request.headers.get('x-vercel-ip-longitude');

    let location = null;
    if (city && country && lat && lng) {
      location = JSON.stringify({ city, country, lat: parseFloat(lat), lng: parseFloat(lng) });
    }

    await db.insert(guestbook).values({
      name,
      message,
      doodle,
      location,
      email: 'anonymous@example.com',
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (e) {
    console.error('Guestbook error:', e);
    return new Response(JSON.stringify({ error: 'Server Error' }), {
      status: 500,
    });
  }
};
