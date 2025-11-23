import type { CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

export interface PostPreview {
  title: string;
  slug: string;
  publishedAt: Date;
  excerpt?: string;
}
