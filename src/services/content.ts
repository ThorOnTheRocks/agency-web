import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;
export type Project = CollectionEntry<'projects'>;

export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog');
  return posts.sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getCollection('blog');
  return posts.find((post) => post.slug === slug);
}

export async function getAllProjects(): Promise<Project[]> {
  const projects = await getCollection('projects');
  return projects.sort((a, b) => {
    const dateA = a.data.publishedAt?.valueOf() ?? 0;
    const dateB = b.data.publishedAt?.valueOf() ?? 0;
    return dateB - dateA;
  });
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getAllProjects();
  return projects.slice(0, 4);
}
