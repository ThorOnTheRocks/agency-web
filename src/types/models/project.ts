import type { CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

// Simplified project type for lists/cards
export interface ProjectPreview {
  title: string;
  slug: string;
  description: string;
  tags?: string[];
}
