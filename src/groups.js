import { aliases } from './group-names.js';
import groupSlugs from '../data/group-slugs.json' with { type: 'json' };

export function groupSlug(id) {
  return groupSlugs[id] || id.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '');
}
export function groupPath(id) {
  return `/groups/${encodeURIComponent(groupSlug(id))}/`;
}
export function groupMapPath(id) {
  return `/?${new URLSearchParams({ group: id })}`;
}
export function pathMapPath(from, to, expanded = false) {
  const params = new URLSearchParams({ from, to });
  if (expanded) params.set('expanded', '1');
  return `/?${params}`;
}
export function groupDisplayName(id) {
  const korean = (aliases[id] || []).find((name) => /[가-힣]/.test(name) && name !== id);
  return korean ? `${id} (${korean})` : id;
}
export function hasGroupRecord(data, id) {
  return data.edges.some((edge) => (edge.a === id || edge.b === id) && edge.members.length && edge.sources.length);
}
export function createGroupCatalog(data) {
  const nodes = new Map(data.nodes.map((node) => [node.id, node]));
  const adjacency = new Map(data.nodes.map((node) => [node.id, []]));
  for (const edge of data.edges) {
    if (!edge.members.length || !edge.sources.length) continue;
    if (!nodes.has(edge.a) || !nodes.has(edge.b)) throw new Error('Unknown group in relationship data');
    adjacency.get(edge.a).push({ node: nodes.get(edge.b), edge });
    adjacency.get(edge.b).push({ node: nodes.get(edge.a), edge });
  }
  const slugs = new Set();
  return data.nodes.filter((node) => adjacency.get(node.id).length).map((node) => {
    const slug = groupSlug(node.id);
    if (!slug || slugs.has(slug)) throw new Error(`Duplicate or empty group slug: ${node.id}`);
    slugs.add(slug);
    const links = adjacency.get(node.id).sort((a, b) => a.node.name.localeCompare(b.node.name, 'ko'));
    const core = links.filter(({ edge }) => edge.scope === 'core');
    const primary = core.length ? core : links;
    const additional = core.length ? links.filter(({ edge }) => edge.scope !== 'core') : [];
    return {
      ...node,
      slug,
      path: groupPath(node.id),
      displayName: groupDisplayName(node.id),
      aliases: aliases[node.id] || [],
      links,
      primary,
      additional,
      sharedMembers: [...new Set(primary.flatMap(({ edge }) => edge.members))].sort((a, b) => a.localeCompare(b, 'ko')),
    };
  }).sort((a, b) => a.name.localeCompare(b.name, 'ko'));
}
