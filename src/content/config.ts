import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    kind: z.enum(['client', 'independent']).default('independent'),
    visibility: z.enum(['supporting', 'hidden']).default('hidden'),
    client: z.string().optional(),
    sector: z.string().optional(),
    role: z.string().optional(),
    engagementType: z.string().optional(),
    timeframe: z.string().optional(),
    scope: z.string().optional(),
    challenge: z.string().optional(),
    intervention: z.string().optional(),
    outcome: z.string().optional(),
    constraints: z.array(z.string()).optional(),
    proofPoints: z.array(z.string()).optional(),
    featuredLabel: z.string().optional(),
    featuredMetric: z.string().optional(),
    featured: z.boolean().optional(),
    link: z.string().url().optional(),
    github: z.string().url().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
    publishedAt: z.coerce.date().optional(),
  }),
});

export const collections = { blog, projects };
