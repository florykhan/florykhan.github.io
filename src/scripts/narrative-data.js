/**
 * Narrative timeline steps. Single source of truth for slugs, order, and prev/next.
 * Update this list to change both the timeline order and page navigation.
 */
const NARRATIVE_ROUTES = [
  { slug: 'gallery', path: './narrative/gallery.html' },
  { slug: 'sfu', path: './narrative/sfu.html' },
  { slug: 'synkron', path: './narrative/synkron.html' },
  { slug: 'projects', path: './narrative/projects.html' },
  { slug: 'next', path: './narrative/next.html' }
];

const NARRATIVE_ROUTE_MAP = {};

const NARRATIVE_STEPS = NARRATIVE_ROUTES.map(function (route, index, list) {
  const prev = index > 0 ? list[index - 1].slug : null;
  const next = index < list.length - 1 ? list[index + 1].slug : null;
  const step = {
    slug: route.slug,
    path: route.path,
    prev: prev,
    next: next
  };
  NARRATIVE_ROUTE_MAP[route.slug] = step;
  return step;
});
