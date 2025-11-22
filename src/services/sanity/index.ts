// Sanity CMS service - centralized access to Sanity client and queries
export { sanityClient } from './client';
export { getPosts, getPostBySlug, getAllProjects, getFeaturedProjects } from './queries';
export { urlFor } from './utils';
