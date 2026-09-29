import { aliases } from './group-names.js';
import { groupName, memberName } from './names-en.js';
import { normalize } from './core.js';

export function localizeData(data, language = 'ko') {
  return {
    ...data,
    nodes: data.nodes.map(node => ({ ...node, name: groupName(node.id, language) })),
  };
}

export function aliasesFor(data) {
  return Object.fromEntries(data.nodes.map(node => [node.id, [...new Set([node.id, groupName(node.id, 'en'), ...(aliases[node.id] || [])])]]));
}

export function memberSearchAliases(data) {
  return Object.fromEntries(data.edges.flatMap(edge => edge.members).map(name => [name, [name, memberName(name, 'en')]]));
}

export function resolveGroup(data, value) {
  const query = normalize(value);
  return data.nodes.find(node => [node.id, node.name, groupName(node.id, 'en'), ...(aliases[node.id] || [])]
    .some(name => normalize(name) === query))?.id;
}
