import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: false, // False for fresh content, True for caching
  apiVersion: '2024-03-01',
});

const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source: any) => builder.image(source);

export async function getPosts() {
  return await sanityClient.fetch(`*[_type == "post"] | order(publishedAt desc) {
    title,
    slug,
    publishedAt,
    "excerpt": array::join(string::split((pt::text(body)), "")[0..200], "") + "..."
  }`);
}

export async function getFeaturedProjects() {
  return await sanityClient.fetch(`
    *[_type == "project"] | order(_createdAt desc)[0..3] {
      title,
      "slug": slug.current,
      description,
      tags
    }
  `);
}
