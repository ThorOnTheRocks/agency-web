/**
 * Site-wide configuration
 */
export const siteConfig = {
  name: 'Gianluca Galota',
  description: 'Premium product engineering for launch, redesign, and rescue work.',
  url: 'https://gianlucagalota.com',
  links: {
    github: 'https://github.com/gianlucagalota',
    linkedin: 'https://linkedin.com/in/gianlucagalota',
    twitter: 'https://twitter.com/gianlucagalota',
    resume: '/assets/documents/gianluca-galota-cv.pdf',
  },
  assets: {
    heroPortrait: '/assets/profile/portrait-working.jpg',
    profilePortrait: '/assets/profile/portrait-standing.jpg',
  },
  author: {
    name: 'Gianluca Galota',
    email: 'gianluca.galota@gmail.com',
  },
} as const;
