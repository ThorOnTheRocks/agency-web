import type { APIRoute } from 'astro';
import { db } from '../../services/database/client';
import { newsletterSubscribers } from '../../services/database/schema';
import { z } from 'zod'; // zod is in package.json

const subscribeSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const result = subscribeSchema.safeParse(data);

    if (!result.success) {
      return new Response(JSON.stringify({
        error: result.error.issues[0].message
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const { email } = result.data;

    // Check if email already exists
    // We can handle the unique constraint error or check manually.
    // Drizzle insert().onConflictDoNothing() or similar might be useful, 
    // or just catching the error.
    
    try {
        await db.insert(newsletterSubscribers).values({
            email,
        });
    } catch (e: any) {
        // P23505 is unique_violation code in Postgres
        if (e.code === '23505') {
             return new Response(JSON.stringify({
                message: "You are already subscribed!"
            }), {
                status: 200, // Treat as success to avoid leaking info? User asked for clean UX.
                 headers: { "Content-Type": "application/json" }
            });
        }
        throw e;
    }

    return new Response(JSON.stringify({
      message: "Successfully subscribed!"
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return new Response(JSON.stringify({
      error: "Internal server error"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
