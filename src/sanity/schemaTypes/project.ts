import { defineField, defineType } from 'sanity';

export const projectType = defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'description', type: 'text', title: 'Short Description' }),
    defineField({ name: 'link', type: 'url', title: 'Live URL' }),
    defineField({ name: 'github', type: 'url', title: 'GitHub URL' }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [{ type: 'string' }],
      title: 'Tech Stack',
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alternative Text' }),
      ],
    }),
  ],
});
