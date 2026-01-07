import type { CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;
export interface ProjectPreview {
  title: string;
  slug: string;
  description: string;
  tags?: string[];
}
