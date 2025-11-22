/**
 * Homepage data structures
 * Separating content from presentation for better maintainability
 */

export const capabilities = [
  {
    icon: '⚡',
    title: 'Your App is Too Slow',
    description: 'Speed = Revenue. I\'ll optimize your product to load 2x faster, reducing bounce rates and increasing conversions.',
    deliverables: 'Performance audit, optimization roadmap, implementation, before/after metrics',
    timeline: '2-3 weeks'
  },
  {
    icon: '🚀',
    title: 'You Need to Ship Fast',
    description: 'Every week of delay costs money. I build production-ready features in weeks, not months.',
    deliverables: 'Full-stack development, testing, deployment, documentation',
    timeline: '4-12 weeks'
  },
  {
    icon: '🛍️',
    title: 'Your E-commerce Experience Doesn\'t Convert',
    description: 'Poor UX kills sales. I\'ll build seamless shopping experiences that turn visitors into customers.',
    deliverables: 'Modern frontend, payment integration, mobile optimization, analytics',
    timeline: '6-10 weeks'
  },
  {
    icon: '🐛',
    title: 'Bugs Keep Breaking Production',
    description: 'Unreliable code destroys trust. I implement comprehensive testing to ship with confidence.',
    deliverables: 'Test strategy, unit/integration/E2E tests, CI/CD setup, documentation',
    timeline: '3-4 weeks'
  },
  {
    icon: '♿',
    title: 'You\'re Excluding Customers',
    description: 'Inaccessible products lose customers and face legal risk. I ensure everyone can use your product.',
    deliverables: 'Accessibility audit, WCAG compliance, screen reader optimization, training',
    timeline: '2-3 weeks'
  },
  {
    icon: '🔧',
    title: 'You Need End-to-End Ownership',
    description: 'Tired of coordinating multiple developers? I handle frontend, backend, deployment—everything.',
    deliverables: 'Full-stack architecture, API design, database, frontend, deployment',
    timeline: '6-12 weeks'
  }
];

export const caseStudies = [
  {
    company: 'Inditex',
    logo: '🏢',
    title: 'Global Logistics Platform',
    problem: 'Scale logistics for world\'s largest fashion retailer',
    solution: 'Micro-frontend architecture + scalable state management',
    result: 'Seamless scalability for global operations',
    tech: ['React', 'MFE', 'Zustand', 'Context API']
  },
  {
    company: 'OpenBank',
    logo: '🏦',
    title: 'Payment Module Optimization',
    problem: 'Slow, unreliable payment processing',
    solution: 'Performance optimization + micro-frontend refactor',
    result: '20% performance improvement + 80% test coverage',
    tech: ['React', 'TypeScript', 'Jest', 'MFE']
  },
  {
    company: 'Tod\'s Group',
    logo: '👜',
    title: 'Luxury E-commerce Suite',
    problem: 'Maintain 4 luxury brand stores efficiently',
    solution: 'Shared component library + Next.js migration',
    result: '50% performance boost, unified codebase',
    tech: ['Next.js 13', 'Redux Saga', 'PWA']
  }
];

export const companies = [
  { name: 'Inditex', icon: '🏢' },
  { name: 'OpenBank', icon: '🏦' },
  { name: 'BPI Bank', icon: '🏦' },
  { name: 'Tod\'s', icon: '👜' },
  { name: 'Roger Vivier', icon: '👠' },
  { name: 'Oakland', icon: '🏛️' }
];

export const stats = [
  { value: '4-12 weeks', label: 'From Brief to Launch' },
  { value: 'Full-Stack', label: 'Testing Coverage' },
  { value: '50%+', label: 'Performance Improvements' },
  { value: '48h', label: 'Proposal Turnaround' },
  { value: 'Production-Ready', label: 'Code Quality' }
];

export const techStack = {
  'Frontend Core': ['React', 'Next.js', 'TypeScript', 'Astro'],
  'State & Data': ['Redux', 'Zustand', 'React Query', 'GraphQL'],
  'Architecture': ['Micro Frontends', 'Design Systems', 'Performance'],
  'Testing & Quality': ['Jest', 'Vitest', 'RTL', '80% coverage'],
  'Backend': ['Node.js', 'Express', 'NestJS', 'PostgreSQL', 'MongoDB'],
  'DevOps': ['Docker', 'AWS', 'Git', 'CI/CD']
};

export const servicePackages = [
  {
    title: 'Product Rescue',
    subtitle: 'Fix What\'s Broken, Fast',
    perfectFor: 'Slow apps, technical debt, failing launches',
    features: [
      'Complete product audit (performance, security, architecture)',
      'Prioritized action plan with quick wins',
      '2 weeks of implementation',
      'Video walkthrough of all findings'
    ],
    timeline: '2 weeks'
  },
  {
    title: 'Launch Sprint',
    subtitle: 'Zero to Production in 4-12 Weeks',
    perfectFor: 'New product features, MVP launches, technical rescues',
    features: [
      'Full-stack development (frontend + backend + deployment)',
      'Comprehensive testing (unit, integration, E2E)',
      'Performance optimization built-in',
      'Documentation & handoff'
    ],
    timeline: '4-12 weeks'
  },
  {
    title: 'Fractional Engineering',
    subtitle: 'Senior Guidance, Month-to-Month',
    perfectFor: 'Growing startups needing strategic technical leadership',
    features: [
      '10-20 hours/month of senior engineering',
      'Architecture decisions & code reviews',
      'Team mentorship & best practices',
      'Strategic technical planning'
    ],
    timeline: 'Flexible monthly commitment'
  }
];

export const testimonials = [
  {
    quote: 'Gianluca delivered a critical payment module refactor that improved our performance by 20% and brought test coverage to 80%. His attention to quality and enterprise-grade standards was exceptional.',
    author: 'Engineering Manager',
    company: 'Major Banking Institution',
    context: 'Enterprise Client'
  },
  {
    quote: 'Working across four luxury brand e-commerce platforms, Gianluca maintained consistency while delivering a 50% performance improvement. His full-stack expertise was invaluable.',
    author: 'Technical Lead',
    company: 'Luxury Fashion Group',
    context: 'E-commerce Client'
  },
  {
    quote: 'Gianluca\'s product engineering mindset sets him apart. He doesn\'t just write code—he ships production-ready features that generate real business value.',
    author: 'CTO',
    company: 'Growing Startup',
    context: 'Startup Client'
  }
];

export const processSteps = [
  { number: '01', title: 'Quick Discovery (48 hours)', description: 'Share your goals, I\'ll send you a detailed proposal with timeline and pricing. No lengthy sales calls.' },
  { number: '02', title: 'Build & Ship (4-12 weeks)', description: 'Weekly demos, continuous deployment, regular communication. You\'ll see progress every single week.' },
  { number: '03', title: 'Launch & Handoff', description: 'Production deployment, complete documentation, training session. You own everything.' }
];
