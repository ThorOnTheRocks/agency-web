import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: false, // False for fresh content, True for caching
  apiVersion: '2024-03-01',
});
