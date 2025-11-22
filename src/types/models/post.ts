// Blog post model type based on Sanity schema
export interface Post {
  title: string;
  slug: {
    current: string;
  };
  publishedAt?: string;
  content?: any[]; // Portable Text content
  excerpt?: string;
  _createdAt?: string;
  _updatedAt?: string;
}

// Simplified post type for blog listing
export interface PostPreview {
  title: string;
  slug: {
    current: string;
  };
  publishedAt?: string;
  excerpt?: string;
}
