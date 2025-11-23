---
title: 'Migrating from Sanity to Astro Content Collections'
description: 'Why I decided to move my portfolio content to local markdown files.'
publishedAt: 2024-03-20
tags: ['astro', 'migration', 'cms']
---

# Why the switch?

I realized that for a personal portfolio, a headless CMS like Sanity was overkill. Astro's built-in Content Collections offer:

1.  **Better Performance**: No API calls at build time.
2.  **Type Safety**: Zod schemas ensure my content is always correct.
3.  **Developer Experience**: I can write posts in my favorite editor (VS Code) alongside my code.

## The Process

It was surprisingly easy...
