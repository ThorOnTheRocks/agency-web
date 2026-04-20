/**
 * Site-wide configuration
 */
export const siteConfig = {
  name: 'Gianluca Galota',
  description: 'Independent product engineering for launch, redesign, and rescue work.',
  url: 'https://gianlucagalota.com',
  navigation: [
    { label: 'Selected work', href: '/projects' },
    { label: 'Profile', href: '/about' },
  ],
  cta: {
    primary: {
      label: 'Start project brief',
      href: '/contact',
    },
    secondary: {
      label: 'See selected work',
      href: '/projects',
    },
  },
  positioning: {
    label: 'Independent product engineer',
    summary:
      'Direct senior product engineering for launches, redesigns, and rescue work that need credibility, clarity, and cleaner delivery.',
    soloModel:
      'I work as a solo specialist with a small number of clients at a time, handling the product-critical surface directly from diagnosis through delivery.',
    proofLine:
      "Recent direct work includes Tod's Group storefronts, OpenBank payment flows, and Inditex logistics tooling.",
  },
  links: {
    linkedin: 'https://linkedin.com/in/gianlucagalota',
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
