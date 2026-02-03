/**
 * Narrative timeline steps. Single source of truth for slugs, order, and prev/next.
 * Update this list to change both the timeline order and page navigation.
 */
const NARRATIVE_ROUTES = [
  { slug: 'gallery', page: 'gallery.html', home: './narrative/gallery.html' },
  { slug: 'sfu', page: 'sfu.html', home: './narrative/sfu.html' },
  { slug: 'synkron', page: 'synkron.html', home: './narrative/synkron.html' },
  { slug: 'projects', page: 'projects.html', home: './narrative/projects.html' },
  { slug: 'next', page: 'next.html', home: './narrative/next.html' }
];

const NARRATIVE_ROUTE_MAP = {};

const NARRATIVE_STEPS = NARRATIVE_ROUTES.map(function (route, index, list) {
  const prev = index > 0 ? list[index - 1].slug : null;
  const next = index < list.length - 1 ? list[index + 1].slug : null;
  const step = {
    slug: route.slug,
    page: route.page,
    home: route.home,
    prev: prev,
    next: next
  };
  NARRATIVE_ROUTE_MAP[route.slug] = step;
  return step;
});

if (typeof window !== 'undefined') {
  window.NARRATIVE_ROUTES = NARRATIVE_ROUTES;
  window.NARRATIVE_ROUTE_MAP = NARRATIVE_ROUTE_MAP;
  window.NARRATIVE_STEPS = NARRATIVE_STEPS;
}
