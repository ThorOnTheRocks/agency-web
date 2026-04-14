export const prerender = false;

import type { APIRoute } from 'astro';
import { resendClient, EMAIL_CONFIG, contactFormTemplate } from '../../services/email';
import type { ContactFormData, ContactApiResponse } from '../../types/api/contact';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data: ContactFormData = await request.json();
    const {
      name,
      email,
      companyOrTeam,
      projectType,
      projectStage,
      budgetRange,
      timeline,
      websiteOrProductUrl,
      message,
    } = data;

    if (
      !name ||
      !email ||
      !companyOrTeam ||
      !projectType ||
      !projectStage ||
      !budgetRange ||
      !timeline ||
      !message
    ) {
      const errorResponse: ContactApiResponse = { message: 'Missing required fields' };
      return new Response(
        JSON.stringify(errorResponse),
        { status: 400 }
      );
    }

    const { error } = await resendClient.emails.send({
      from: EMAIL_CONFIG.from,
      to: [EMAIL_CONFIG.to],
      subject: `New Project Inquiry: ${projectType} / ${budgetRange}`,
      html: contactFormTemplate({
        name,
        email,
        companyOrTeam,
        projectType,
        projectStage,
        budgetRange,
        timeline,
        websiteOrProductUrl,
        message,
      }),
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
