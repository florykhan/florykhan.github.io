/**
 * Narrative timeline steps. Single source of truth for slugs, order, and prev/next.
 */
const NARRATIVE_STEPS = [
  { slug: 'gallery', prev: null, next: 'sfu' },
  { slug: 'sfu', prev: 'gallery', next: 'projects' },
  { slug: 'projects', prev: 'sfu', next: 'next' },
  { slug: 'next', prev: 'projects', next: null }
];
