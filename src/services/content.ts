import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;
export type Project = CollectionEntry<'projects'>;

/**
 * Fetch all blog posts ordered by publish date
 */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog');
  return posts.sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());
}

/**
 * Fetch a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getCollection('blog');
  return posts.find((post) => post.slug === slug);
}

/**
 * Fetch all projects ordered by creation date (using publishedAt or default)
 */
export async function getAllProjects(): Promise<Project[]> {
  const projects = await getCollection('projects');
  // Sort by publishedAt if available, otherwise by title or file creation?
  // For now, let's assume they might not have a date, so just return them.
  // Or sort by publishedAt descending.
  return projects.sort((a, b) => {
    const dateA = a.data.publishedAt?.valueOf() ?? 0;
    const dateB = b.data.publishedAt?.valueOf() ?? 0;
    return dateB - dateA;
  });
}

/**
 * Fetch featured projects (first 3-4)
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getAllProjects();
  return projects.slice(0, 4);
}
