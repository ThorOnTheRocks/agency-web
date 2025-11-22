export const prerender = false; // This must be server-side rendered

import type { APIRoute } from 'astro';
import { resendClient, EMAIL_CONFIG, contactFormTemplate } from '../../services/email';
import type { ContactFormData, ContactApiResponse } from '../../types';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data: ContactFormData = await request.json();
    const { name, email, subject, message } = data;

    if (!name || !email || !message) {
      const errorResponse: ContactApiResponse = { message: 'Missing required fields' };
      return new Response(
        JSON.stringify(errorResponse),
        { status: 400 }
      );
    }

    // Send email
    const { error } = await resendClient.emails.send({
      from: EMAIL_CONFIG.from,
      to: [EMAIL_CONFIG.to],
      subject: `New Contact Form Submission: ${subject || 'No Subject'}`,
      html: contactFormTemplate({ name, email, subject, message }),
      replyTo: email,
    });

    if (error) {
      const errorResponse: ContactApiResponse = { message: error.message, error: error.message };
      return new Response(
        JSON.stringify(errorResponse),
        { status: 500 }
      );
    }

    const successResponse: ContactApiResponse = { message: 'Email sent successfully' };
    return new Response(
      JSON.stringify(successResponse),
      { status: 200 }
    );
  } catch (e) {
    const errorResponse: ContactApiResponse = { message: 'Internal server error' };
    return new Response(
      JSON.stringify(errorResponse),
      { status: 500 }
    );
  }
};
