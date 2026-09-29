export const normalize = s => String(s).normalize('NFKC').toLowerCase().replace(/[\s.*:_!()·/\-]/g,'');
export function scopedData(data, expanded=false) {
  const nodes=data.nodes.filter(n=>expanded||!['external','unit'].includes(n.category));
  const ids=new Set(nodes.map(n=>n.id));
  return {nodes,edges:data.edges.filter(e=>ids.has(e.a)&&ids.has(e.b))};
}
export function analyze(nodes,edges){
  const adjacency=new Map(nodes.map(n=>[n.id,[]]));
  edges.forEach(e=>{adjacency.get(e.a).push({id:e.b,edge:e});adjacency.get(e.b).push({id:e.a,edge:e});});
  let seen=new Set(),components=[];
  for(const n of nodes){if(seen.has(n.id))continue;let queue=[n.id],c=[];seen.add(n.id);while(queue.length){const a=queue.pop();c.push(a);for(const b of adjacency.get(a)){if(!seen.has(b.id)){seen.add(b.id);queue.push(b.id)}}}components.push(c.sort());}
  components.sort((a,b)=>b.length-a.length||(a[0]<b[0]?-1:1));
  const componentOf=new Map();components.forEach((c,i)=>c.forEach(id=>componentOf.set(id,i)));
  return {adjacency,components,componentOf};
}
export function shortestPath(adjacency,start,end){
  if(!adjacency.has(start)||!adjacency.has(end))return null;
  const parent=new Map([[start,null]]),queue=[start];let index=0;
  while(index<queue.length){const a=queue[index++];if(a===end){let path=[];for(let k=end;k!==null;k=parent.get(k))path.unshift(k);return path;}
    for(const b of adjacency.get(a)){if(!parent.has(b.id)){parent.set(b.id,a);queue.push(b.id)}}}
  return null;
}
export function searchNodes(nodes,edges,query,aliases={}){
  const q=normalize(query);if(!q)return [];
  const matches=new Map();
  for(const n of nodes){const names=[n.name,...(aliases[n.id]||[])];if(names.some(s=>normalize(s).includes(q)))matches.set(n.id,{node:n,members:[],score:names.some(s=>normalize(s)===q)?0:1});}
  for(const e of edges){const ms=e.members.filter(m=>normalize(m).includes(q));if(ms.length)for(const id of [e.a,e.b]){if(!matches.has(id))matches.set(id,{node:nodes.find(n=>n.id===id),members:[],score:2});matches.get(id).members.push(...ms);}}
  return [...matches.values()].map(m=>({...m,members:[...new Set(m.members)]})).sort((a,b)=>a.score-b.score||a.node.name.localeCompare(b.node.name,'ko'));
}
