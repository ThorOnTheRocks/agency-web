import { sanityClient } from './client';
import type { PostPreview, ProjectPreview, Post, Project } from '../../types';

/**
 * Fetch all blog posts ordered by publish date
 */
export async function getPosts(): Promise<PostPreview[]> {
  return await sanityClient.fetch(`*[_type == "post"] | order(publishedAt desc) {
    title,
    slug,
    publishedAt,
    "excerpt": array::join(string::split((pt::text(body)), "")[0..200], "") + "..."
  }`);
}

/**
 * Fetch a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  return await sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      title,
      slug,
      publishedAt,
      content
    }`,
    { slug }
  );
}

/**
 * Fetch all projects ordered by creation date
 */
export async function getAllProjects(): Promise<Project[]> {
  return await sanityClient.fetch(`
    *[_type == "project"] | order(_createdAt desc) {
      title,
      "slug": slug.current,
      description,
      link,
      github,
      tags,
      mainImage
    }
  `);
}

/**
 * Fetch featured projects (first 3-4)
 */
export async function getFeaturedProjects(): Promise<ProjectPreview[]> {
  return await sanityClient.fetch(`
    *[_type == "project"] | order(_createdAt desc)[0..3] {
      title,
      "slug": slug.current,
      description,
      tags
    }
  `);
}
