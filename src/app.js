import { languageOf, text } from './i18n.js';
import { groupName, memberName } from './names-en.js';
import { localizeData, aliasesFor, memberSearchAliases, resolveGroup } from './localized-data.js';
import { initializeNavigation } from './navigation.js';
import {groupPath,hasGroupRecord} from './groups.js';
import {displayNotes} from './notes.js';
import {GlobeView} from './globe-view.js';
import {icon,mountIcons} from './icons.js';
import {forceSimulation,forceLink,forceManyBody,forceCenter,forceCollide} from 'd3-force';
import RAW_DATA from '../data/girl-group-graph.json';
import {scopedData,analyze,shortestPath,searchNodes} from './core.js';
const language=languageOf(location.pathname),t=(key,values)=>text(key,language,values),g=id=>groupName(id,language),m=name=>memberName(name,language);
const DATA=localizeData(RAW_DATA,language),aliases=aliasesFor(RAW_DATA),memberAliases=memberSearchAliases(RAW_DATA);
const $=s=>document.querySelector(s),ink='#264757',accent='#079cc3',palette=['#2398bf','#65bcae','#8ba8d0','#74b2c5','#b3b887','#a6adbc'];

let scope,analysis,byId,positions,graph,renderer,selected=null,hovered=null,path=[],pathEdges=new Set(),neighbors=new Set(),activeComponent='all',searchMatches=[];
const safe=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function button(text,fn,cls=''){let b=document.createElement('button');b.textContent=text;b.type='button';b.className=cls;b.onclick=fn;return b;}
const key=(a,b)=>JSON.stringify([a,b].sort());
function computePositions(){
 const coords=new Map(),circles=[];
 for(const c of analysis.components.filter(c=>c.length>1)){
  const ids=new Set(c),ns=c.map((id,i)=>({id,x:Math.cos(i*6.28/c.length)*50,y:Math.sin(i*6.28/c.length)*50})),ls=scope.edges.filter(e=>ids.has(e.a)&&ids.has(e.b)).map(e=>({source:e.a,target:e.b}));
  const sim=forceSimulation(ns).force('link',forceLink(ls).id(n=>n.id).distance(38)).force('charge',forceManyBody().strength(-100)).force('collide',forceCollide(12)).force('center',forceCenter()).stop();sim.tick(260);
  const radius=c.length>15?40*Math.sqrt(c.length):26+21*Math.sqrt(c.length),max=Math.max(...ns.map(n=>Math.hypot(n.x,n.y)),1);let cx=0,cy=0;
  if(circles.length){for(let t=0;t<20000;t++){let angle=t*.27,dist=25+1.3*t;cx=Math.cos(angle)*dist;cy=Math.sin(angle)*dist;if(circles.every(o=>Math.hypot(cx-o.x,cy-o.y)>radius+o.r+28))break;}}
  circles.push({x:cx,y:cy,r:radius});ns.forEach(n=>coords.set(n.id,{x:cx+n.x/max*radius,y:cy+n.y/max*radius}));
 }
 const all=[...coords.values()],minX=Math.min(...all.map(p=>p.x),-300),maxX=Math.max(...all.map(p=>p.x),300),minY=Math.min(...all.map(p=>p.y),-300),cols=Math.max(10,Math.floor((maxX-minX)/23));
 analysis.components.filter(c=>c.length===1).forEach((c,i)=>coords.set(c[0],{x:minX+(i%cols)*23,y:minY-75-Math.floor(i/cols)*23}));return coords;
}
function colorFor(id){return palette[(byId.get(id)?.component??analysis.componentOf.get(id)??0)%palette.length];}
let componentOptions=[];
function setComponentUI(){const chosen=componentOptions.find(o=>o.value===activeComponent);$('#component').value=activeComponent;$('#component-label').textContent=chosen?.label||t('allClusters');$('#component-menu').querySelectorAll('[role=option]').forEach(o=>o.setAttribute('aria-selected',String(o.dataset.value===activeComponent)));}
function closeComponent(focus=false){$('#component-menu').hidden=true;$('#component-trigger').setAttribute('aria-expanded','false');if(focus)$('#component-trigger').focus();}
function chooseComponent(value){activeComponent=value;setComponentUI();closeComponent(true);clearSelection();buildGraph();}
function renderComponentMenu(){const menu=$('#component-menu');menu.replaceChildren(...componentOptions.map(o=>{const b=button(o.label,()=>chooseComponent(o.value));b.setAttribute('role','option');b.setAttribute('aria-selected',String(o.value===activeComponent));b.dataset.value=o.value;return b;}));}
$('#component-trigger').onclick=()=>{const menu=$('#component-menu'),open=menu.hidden;menu.hidden=!open;$('#component-trigger').setAttribute('aria-expanded',String(open));};
$('#component-trigger').onkeydown=e=>{if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();$('#component-menu').hidden=false;$('#component-trigger').setAttribute('aria-expanded','true');const list=[...$('#component-menu').querySelectorAll('button')];(e.key==='ArrowUp'?list.at(-1):list[0])?.focus();}};
$('#component-menu').onkeydown=e=>{const options=[...$('#component-menu').querySelectorAll('button')],i=options.indexOf(document.activeElement);if(['ArrowDown','ArrowUp','Home','End'].includes(e.key)){e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?options.length-1:(i+(e.key==='ArrowDown'?1:-1)+options.length)%options.length;options[next]?.focus();}if(e.key==='Escape'){e.preventDefault();closeComponent(true);}};
document.addEventListener('pointerdown',e=>{if(!e.target.closest('.component-picker'))closeComponent();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeComponent();});
function configureScope(){
 document.body.classList.remove('has-focus');
 scope=scopedData(DATA,$('#expanded').checked);analysis=analyze(scope.nodes,scope.edges);byId=new Map(scope.nodes.map(n=>[n.id,n]));positions=computePositions();
 componentOptions=[{value:'all',label:t('allClusters')}];
 analysis.components.forEach((c,i)=>{if(c.length<2)return;const hub=[...c].sort((a,b)=>analysis.adjacency.get(b).length-analysis.adjacency.get(a).length)[0];componentOptions.push({value:String(i),label:`${g(hub)} · ${t('groupCount',{count:c.length})}`});});
 renderComponentMenu();
 activeComponent='all';setComponentUI();selected=null;hovered=null;path=[];pathEdges.clear();$('#path-result').replaceChildren();$('#isolate-count').textContent=analysis.components.filter(c=>c.length===1).length;
 $('#scope-count').textContent=t('groupCount',{count:scope.nodes.length});
 $('#group-names').replaceChildren(...scope.nodes.map(n=>new Option(n.name,n.name)));buildGraph();renderOverview();search();
}
function buildGraph(){
 const visible=scope.nodes.filter(n=>(activeComponent==='all'||analysis.componentOf.get(n.id)===Number(activeComponent))&&($('#isolates').checked||analysis.adjacency.get(n.id).length)).map(n=>({...n,degree:analysis.adjacency.get(n.id).length,color:analysis.adjacency.get(n.id).length?colorFor(n.id):'#a2bfc9'}));
 const ids=new Set(visible.map(n=>n.id)),edges=scope.edges.filter(e=>ids.has(e.a)&&ids.has(e.b));
 if(!renderer){try{renderer=new GlobeView($('#graph'),{onSelect:id=>selectNode(id),onClear:clearSelection,onHover:id=>{hovered=id;refresh();}});}catch(error){$('#error').hidden=false;$('#error').textContent=t('webglError');return;}}
 renderer.setData(visible,edges,positions);refresh();
 if(activeComponent!=='all')renderer.focus(visible.map(n=>n.id));
 $('#map-title').textContent=t('mapTitle');
}
function refresh(){const focus=hovered||selected;renderer?.highlight({selected,hovered,path,neighbors:(analysis?.adjacency.get(focus)||[]).map(n=>n.id)});}
function focusNodes(ids){renderer?.focus(ids);}
function openInspector(){document.body.classList.add('inspector-open');$('#inspector-toggle').setAttribute('aria-expanded','true');}
function switchTab(tab){for(const t of ['group','path']){$(`#tab-${t}`).classList.toggle('active',t===tab);$(`#tab-${t}`).setAttribute('aria-selected',String(t===tab));$(`#${t}-panel`).hidden=t!==tab;}$('#nav-map').classList.toggle('active',tab==='group');$('#nav-path').classList.toggle('active',tab==='path');$('#nav-map').removeAttribute('aria-current');$('#nav-path').removeAttribute('aria-current');$(tab==='group'?'#nav-map':'#nav-path').setAttribute('aria-current','page');}
function selectNode(id,fly=true){
 if(!byId.has(id))return;path=[];pathEdges.clear();hovered=null;selected=id;neighbors=new Set(analysis.adjacency.get(id).map(n=>n.id));
 if(!renderer?.hasNode(id)){activeComponent='all';setComponentUI();if(!neighbors.size)$('#isolates').checked=true;buildGraph();}
 switchTab('group');renderDetails();$('.inspector-content').scrollTop=0;document.body.classList.add('has-focus');openInspector();refresh();if(fly)focusNodes([id,...neighbors]);$('#search').value='';hideResults();
}
function clearSelection(){document.body.classList.remove('has-focus');selected=null;hovered=null;path=[];pathEdges.clear();$('#path-result').replaceChildren();refresh();renderOverview();}
function renderOverview(){
 const panel=$('#details');panel.innerHTML=`<h2>${t('browseHeading')}</h2><p class="muted">${t('browseDescription')}</p><div class="overview-count"><span>${t('clusters')}</span><strong>${t('clusterCount',{count:analysis.components.filter(c=>c.length>1).length})}</strong></div><div class="cluster-list"></div>`;
 analysis.components.filter(c=>c.length>1).forEach((c,i)=>{const hub=[...c].sort((a,b)=>analysis.adjacency.get(b).length-analysis.adjacency.get(a).length)[0];const b=button('',()=>{activeComponent=String(i);setComponentUI();selected=null;hovered=null;path=[];pathEdges.clear();document.body.classList.remove('has-focus');buildGraph();renderOverview();},'cluster');b.innerHTML=`<i class="cluster-dot" style="background:${colorFor(hub)}"></i><span>${safe(g(hub))}</span><small>${c.length}</small>${icon('chevron')}`;panel.querySelector('.cluster-list').append(b);});
}
function sourcesMarkup(e){return e.sources.filter(u=>/^https?:\/\//.test(u)).map((u,i)=>{let label;try{label=new URL(u).hostname.replace(/^www\./,'');}catch{label=t('source')+' '+(i+1);}return `<a href="${safe(u)}" target="_blank" rel="noopener noreferrer">${safe(label)}${icon('up')}</a>`;}).join('');}
function renderDetails(){const n=byId.get(selected),links=analysis.adjacency.get(selected),categories={project:t('project'),external:t('external'),unit:t('unit'),band:t('band'),kids:t('kids'),virtual:t('virtual')};
 const panel=$('#details');panel.innerHTML=`<h2>${safe(n.name)}</h2><div class="group-meta"><span>${n.year||t('unknownYear')}</span><span>·</span><span>${categories[n.category]||t('core')}</span></div><div class="group-actions"></div><p class="connection-count">${t('connectedCount')} <strong>${t('connectionCount',{count:links.length})}</strong></p>`;
 panel.querySelector('.group-actions').append(button(t('pathFromHere'),()=>{$('#path-from').value=g(selected);switchTab('path');$('#path-to').focus();}),button(t('zoomNearby'),()=>focusNodes([selected,...neighbors])));
 if(hasGroupRecord(DATA,selected))panel.querySelector('.group-actions').append(Object.assign(document.createElement('a'),{href:groupPath(selected,language),textContent:t('record')}));
 if(!links.length){const p=document.createElement('p');p.className='muted';p.textContent=t('noConnection');panel.append(p);return;}
 [...links].sort((a,b)=>g(a.id).localeCompare(g(b.id),language)).forEach(({id,edge:e})=>{const section=document.createElement('div');section.className='connection';section.innerHTML=`<div class="connection-title"></div><p class="member-names">${safe(e.members.map(m).join(' · '))}</p><div class="evidence">${t(e.evidence==='profile'?'profileEvidence':'newsEvidence')}${e.derived?' · '+t('confirmedActivity'):''}${e.types.includes('rebrand')?' · '+t('rebrand'):''}</div><div class="sources">${sourcesMarkup(e)}</div>`;section.querySelector('.connection-title').append(button(g(id),()=>selectNode(id)),Object.assign(document.createElement('span'),{innerHTML:icon('up')}));if(displayNotes(e.notes,language).length){const d=document.createElement('details'),summary=document.createElement('summary');summary.textContent=t('activityNotes');d.append(summary);const p=document.createElement('p');p.className='edge-note';p.textContent=displayNotes(e.notes,language).join(' ');d.append(p);section.append(d)}panel.append(section);});
}
function hideResults(){$('#results').hidden=true;$('#search').setAttribute('aria-expanded','false');}
function search(){const q=$('#search').value.trim();if(!q){hideResults();return;}searchMatches=searchNodes(scope.nodes,scope.edges,q,aliases,memberAliases);const box=$('#results');box.replaceChildren();box.hidden=false;$('#search').setAttribute('aria-expanded','true');const count=document.createElement('div');count.className='result-count';count.textContent=searchMatches.length?t('searchCount',{count:searchMatches.length})+(searchMatches.length>30?t('topResults'):''):t('noResults');box.append(count);
 searchMatches.slice(0,30).forEach(({node:n,members})=>{const b=button('',()=>selectNode(n.id),'result');b.innerHTML=`<span>${safe(n.name)}<small class="${members.length?'match':''}">${members.length?safe(members.map(m).join(' · ')):`${n.year||t('unknownYear')} · ${t('searchConnections',{count:analysis.adjacency.get(n.id).length})}`}</small></span>${icon('chevron')}`;box.append(b);});}
function findPath(event){event?.preventDefault();document.body.classList.remove('has-focus');const resolve=value=>resolveGroup(scope,value);const a=resolve($('#path-from').value),b=resolve($('#path-to').value),result=$('#path-result');path=[];pathEdges.clear();selected=null;hovered=null;result.replaceChildren();
 if(!a||!b){result.textContent=t('pickGroup');refresh();return;}
 const found=shortestPath(analysis.adjacency,a,b);if(!found){result.innerHTML=`<p class="path-summary">${t('noPathHeading')}</p><p class="muted">${safe(t('separateClusters',{from:g(a),to:g(b)}))}</p>`;refresh();return;}
 if(activeComponent!=='all'||found.some(id=>!renderer?.hasNode(id))){activeComponent='all';setComponentUI();if(found.length===1&&!analysis.adjacency.get(a).length)$('#isolates').checked=true;buildGraph();}
 path=found;document.body.classList.add('has-focus');for(let i=1;i<path.length;i++)pathEdges.add(key(path[i-1],path[i]));const summary=document.createElement('p');summary.className='path-summary';summary.textContent=t('pathSummary',{edges:path.length-1,groups:path.length})+(path.length===1?t('sameGroup'):'');result.append(summary);
 path.forEach((id,i)=>{const item=document.createElement('div');item.className='path-item';item.append(button(g(id),()=>selectNode(id)));if(i<path.length-1){const e=analysis.adjacency.get(id).find(n=>n.id===path[i+1]).edge,p=document.createElement('p');p.textContent=e.members.map(m).join(' · ');item.append(p);const links=document.createElement('div');links.className='sources';links.innerHTML=sourcesMarkup(e);item.append(links);}result.append(item);});refresh();focusNodes(path);
}
$('#search').addEventListener('input',search);$('#search').addEventListener('keydown',e=>{if(e.key==='Escape')hideResults();if(e.key==='Enter'&&searchMatches.length&&$('#search').value.trim()){e.preventDefault();selectNode(searchMatches[0].node.id)}if(e.key==='ArrowDown'){e.preventDefault();$('#results button')?.focus();}});
$('#results').addEventListener('keydown',e=>{const bs=[...$('#results').querySelectorAll('button')],i=bs.indexOf(document.activeElement);if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();bs[(i+(e.key==='ArrowDown'?1:-1)+bs.length)%bs.length]?.focus();}if(e.key==='Escape'){$('#search').focus();hideResults();}});
document.addEventListener('click',e=>{if(!e.target.closest('.search-wrap'))hideResults();});document.addEventListener('keydown',e=>{if(e.key==='/'&&!e.target.matches('input,select,textarea')){e.preventDefault();$('#search').focus()}if(e.key==='Escape'){hideResults();document.body.classList.remove('inspector-open');$('#inspector-toggle').setAttribute('aria-expanded','false');}});
$('#isolates').onchange=()=>{clearSelection();buildGraph();};$('#expanded').onchange=configureScope;
for(const t of ['group','path'])$(`#tab-${t}`).onclick=()=>{switchTab(t);if(t==='group'){path=[];pathEdges.clear();document.body.classList.toggle('has-focus',!!selected);if(selected)renderDetails();else renderOverview();refresh();}};$('#path-form').onsubmit=findPath;
function reset(){closeComponent();activeComponent='all';setComponentUI();$('#search').value='';hideResults();clearSelection();buildGraph();switchTab('group');document.body.classList.remove('inspector-open');$('#inspector-toggle').setAttribute('aria-expanded','false');}
$('#reset').onclick=reset;$('#home').onclick=e=>{e.preventDefault();reset();};$('#zoom-in').onclick=()=>renderer?.zoom(.8);$('#zoom-out').onclick=()=>renderer?.zoom(1.25);
$('#inspector-toggle').onclick=()=>{document.body.classList.toggle('inspector-open');$('#inspector-toggle').setAttribute('aria-expanded',String(document.body.classList.contains('inspector-open')));};$('#close-inspector').onclick=()=>{document.body.classList.remove('inspector-open');$('#inspector-toggle').setAttribute('aria-expanded','false');};
mountIcons();
$('#nav-map').onclick=reset;
$('#nav-path').onclick=()=>{switchTab('path');openInspector();$('.inspector-content').scrollTop=0;};
const aboutDialog=$('#about-dialog');
$('#about').onclick=()=>aboutDialog.showModal();
$('#about-scope').onclick=()=>aboutDialog.showModal();
$('#close-about').onclick=()=>aboutDialog.close();
aboutDialog.addEventListener('click',event=>{if(event.target===aboutDialog){const r=aboutDialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)aboutDialog.close();}});
const initialParams=new URLSearchParams(location.search);
if(initialParams.get('expanded')==='1')$('#expanded').checked=true;
configureScope();
const requestedGroup=initialParams.get('group');
const requestedNode=DATA.nodes.find(node=>node.id===requestedGroup);
const requestedFrom=initialParams.get('from'),requestedTo=initialParams.get('to');
if(requestedFrom&&requestedTo){
 $('#path-from').value=g(requestedFrom);$('#path-to').value=g(requestedTo);
 switchTab('path');openInspector();findPath();
}else if(requestedNode){
 if(['unit','external'].includes(requestedNode.category)){$('#expanded').checked=true;configureScope();}
 selectNode(requestedNode.id);
}
function showLinkedAbout(){if(location.hash==='#about'&&!aboutDialog.open)aboutDialog.showModal();if(location.hash==='#path'){switchTab('path');openInspector();}}
window.addEventListener('hashchange',showLinkedAbout);
showLinkedAbout();

initializeNavigation(() => {
 const showingPath = !$('#path-panel').hidden;
 const endpoint = (id) => showingPath ? resolveGroup(scope, $(id).value) || $(id).value : null;
 return {
  group: selected || null,
  from: endpoint('#path-from'),
  to: endpoint('#path-to'),
  expanded: $('#expanded').checked ? '1' : null,
  hash: aboutDialog.open ? '#about' : showingPath ? '#path' : '',
 };
});
renderer?.renderNow();
