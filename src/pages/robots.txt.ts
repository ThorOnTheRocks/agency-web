import type { APIRoute } from 'astro';

const previewRobots = 'User-agent: *\nDisallow: /\n';
const productionRobots = 'User-agent: *\nAllow: /\n';

export const GET: APIRoute = () => {
  const body = process.env.VERCEL_ENV === 'preview'
    ? previewRobots
    : productionRobots;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
