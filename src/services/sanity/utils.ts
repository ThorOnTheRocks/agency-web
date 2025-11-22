import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from './client';

const builder = imageUrlBuilder(sanityClient);

/**
 * Generate image URL from Sanity image asset
 * @param source - Sanity image asset reference
 */
export const urlFor = (source: any) => builder.image(source);
