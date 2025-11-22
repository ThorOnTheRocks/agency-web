// Project model type based on Sanity schema
export interface Project {
  title: string;
  slug: string;
  description: string;
  link?: string;
  github?: string;
  tags?: string[];
  mainImage?: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  };
  _createdAt?: string;
  _updatedAt?: string;
}

// Simplified project type for lists/cards
export interface ProjectPreview {
  title: string;
  slug: string;
  description: string;
  tags?: string[];
}
