import {aliases} from './group-names.js';
import {groupPath,hasGroupRecord} from './groups.js';
import {displayNotes} from './notes.js';
import {GlobeView} from './globe-view.js';
import {icon,mountIcons} from './icons.js';
import {forceSimulation,forceLink,forceManyBody,forceCenter,forceCollide} from 'd3-force';
import DATA from '../data/girl-group-graph.json';
import {normalize,scopedData,analyze,shortestPath,searchNodes} from './core.js';
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
function setComponentUI(){const chosen=componentOptions.find(o=>o.value===activeComponent);$('#component').value=activeComponent;$('#component-label').textContent=chosen?.label||'모든 연결 묶음';$('#component-menu').querySelectorAll('[role=option]').forEach(o=>o.setAttribute('aria-selected',String(o.dataset.value===activeComponent)));}
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
 componentOptions=[{value:'all',label:'모든 연결 묶음'}];
 analysis.components.forEach((c,i)=>{if(c.length<2)return;const hub=[...c].sort((a,b)=>analysis.adjacency.get(b).length-analysis.adjacency.get(a).length)[0];componentOptions.push({value:String(i),label:`${hub} · ${c.length}개 그룹`});});
 renderComponentMenu();
 activeComponent='all';setComponentUI();selected=null;hovered=null;path=[];pathEdges.clear();$('#path-result').replaceChildren();$('#isolate-count').textContent=analysis.components.filter(c=>c.length===1).length;
 $('#scope-count').textContent=scope.nodes.length+'개 그룹';
 $('#group-names').replaceChildren(...scope.nodes.map(n=>new Option(n.name,n.name)));buildGraph();renderOverview();search();
}
function buildGraph(){
 const visible=scope.nodes.filter(n=>(activeComponent==='all'||analysis.componentOf.get(n.id)===Number(activeComponent))&&($('#isolates').checked||analysis.adjacency.get(n.id).length)).map(n=>({...n,degree:analysis.adjacency.get(n.id).length,color:analysis.adjacency.get(n.id).length?colorFor(n.id):'#a2bfc9'}));
 const ids=new Set(visible.map(n=>n.id)),edges=scope.edges.filter(e=>ids.has(e.a)&&ids.has(e.b));
 if(!renderer){try{renderer=new GlobeView($('#graph'),{onSelect:id=>selectNode(id),onClear:clearSelection,onHover:id=>{hovered=id;refresh();}});}catch(error){$('#error').hidden=false;$('#error').textContent='3D 지도를 표시하지 못했습니다. WebGL을 지원하는 브라우저에서 다시 열어주세요. '+error.message;return;}}
 renderer.setData(visible,edges,positions);refresh();
 if(activeComponent!=='all')renderer.focus(visible.map(n=>n.id));
 $('#map-title').textContent='여자 아이돌 연결 지도';
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
 const panel=$('#details');panel.innerHTML=`<h2>그룹 둘러보기</h2><p class="muted">같은 멤버가 활동한 그룹끼리 묶었어요.</p><div class="overview-count"><span>연결 묶음</span><strong>${analysis.components.filter(c=>c.length>1).length}개</strong></div><div class="cluster-list"></div>`;
 analysis.components.filter(c=>c.length>1).forEach((c,i)=>{const hub=[...c].sort((a,b)=>analysis.adjacency.get(b).length-analysis.adjacency.get(a).length)[0];const b=button('',()=>{activeComponent=String(i);setComponentUI();selected=null;hovered=null;path=[];pathEdges.clear();document.body.classList.remove('has-focus');buildGraph();renderOverview();},'cluster');b.innerHTML=`<i class="cluster-dot" style="background:${colorFor(hub)}"></i><span>${safe(hub)}</span><small>${c.length}</small>${icon('chevron')}`;panel.querySelector('.cluster-list').append(b);});
}
function sourcesMarkup(e){return e.sources.filter(u=>/^https?:\/\//.test(u)).map((u,i)=>{let label;try{label=new URL(u).hostname.replace(/^www\./,'');}catch{label='자료 '+(i+1);}return `<a href="${safe(u)}" target="_blank" rel="noopener noreferrer">${safe(label)}${icon('up')}</a>`;}).join('');}
function renderDetails(){const n=byId.get(selected),links=analysis.adjacency.get(selected),categories={project:'프로젝트',external:'해외·혼성',unit:'유닛',band:'여성 밴드',kids:'키즈 그룹',virtual:'버추얼 그룹'};
 const panel=$('#details');panel.innerHTML=`<h2>${safe(n.name)}</h2><div class="group-meta"><span>${n.year||'연도 미확인'}</span><span>·</span><span>${categories[n.category]||'여성 그룹'}</span></div><div class="group-actions"></div><p class="connection-count">공유 멤버로 이어진 그룹 <strong>${links.length}개</strong></p>`;
 panel.querySelector('.group-actions').append(button('여기서 경로 찾기',()=>{$('#path-from').value=selected;switchTab('path');$('#path-to').focus();}),button('주변 확대',()=>focusNodes([selected,...neighbors])));
 if(hasGroupRecord(DATA,selected))panel.querySelector('.group-actions').append(Object.assign(document.createElement('a'),{href:groupPath(selected),textContent:'활동 기록'}));
 if(!links.length){const p=document.createElement('p');p.className='muted';p.textContent='현재 자료에서 다른 그룹과의 연결을 찾지 못했어요.';panel.append(p);return;}
 [...links].sort((a,b)=>a.id.localeCompare(b.id,'ko')).forEach(({id,edge:e})=>{const section=document.createElement('div');section.className='connection';section.innerHTML=`<div class="connection-title"></div><p class="member-names">${safe(e.members.join(' · '))}</p><div class="evidence">${e.evidence==='profile'?'프로필·위키':'기사·공식 자료'}${e.derived?' · 활동 이력 확인':''}${e.types.includes('rebrand')?' · 개명/재편':''}</div><div class="sources">${sourcesMarkup(e)}</div>`;section.querySelector('.connection-title').append(button(id,()=>selectNode(id)),Object.assign(document.createElement('span'),{innerHTML:icon('up')}));if(displayNotes(e.notes).length){const d=document.createElement('details'),summary=document.createElement('summary');summary.textContent='활동 메모';d.append(summary);const p=document.createElement('p');p.className='edge-note';p.textContent=displayNotes(e.notes).join(' ');d.append(p);section.append(d)}panel.append(section);});
}
function hideResults(){$('#results').hidden=true;$('#search').setAttribute('aria-expanded','false');}
function search(){const q=$('#search').value.trim();if(!q){hideResults();return;}searchMatches=searchNodes(scope.nodes,scope.edges,q,aliases);const box=$('#results');box.replaceChildren();box.hidden=false;$('#search').setAttribute('aria-expanded','true');const count=document.createElement('div');count.className='result-count';count.textContent=searchMatches.length?`${searchMatches.length}개 결과${searchMatches.length>30?' · 상위 30개 표시':''}`:'검색 결과가 없어요. 이름이나 표시 범위를 확인해 주세요.';box.append(count);
 searchMatches.slice(0,30).forEach(({node:n,members})=>{const b=button('',()=>selectNode(n.id),'result');b.innerHTML=`<span>${safe(n.name)}<small class="${members.length?'match':''}">${members.length?safe(members.join(' · ')):`${n.year||'연도 미확인'} · 연결 ${analysis.adjacency.get(n.id).length}개`}</small></span>${icon('chevron')}`;box.append(b);});}
function findPath(event){event?.preventDefault();document.body.classList.remove('has-focus');const resolve=s=>scope.nodes.find(n=>normalize(n.name)===normalize(s)||aliases[n.id]?.some(a=>normalize(a)===normalize(s)))?.id;const a=resolve($('#path-from').value),b=resolve($('#path-to').value),result=$('#path-result');path=[];pathEdges.clear();selected=null;hovered=null;result.replaceChildren();
 if(!a||!b){result.textContent='그룹을 찾지 못했어요. 목록에서 이름을 골라 주세요.';refresh();return;}
 const found=shortestPath(analysis.adjacency,a,b);if(!found){result.innerHTML=`<p class="path-summary">아직 이어지는 경로를 찾지 못했어요.</p><p class="muted">현재 자료에서 ${safe(a)}와 ${safe(b)}는 서로 다른 묶음에 있어요.</p>`;refresh();return;}
 if(activeComponent!=='all'||found.some(id=>!renderer?.hasNode(id))){activeComponent='all';setComponentUI();if(found.length===1&&!analysis.adjacency.get(a).length)$('#isolates').checked=true;buildGraph();}
 path=found;document.body.classList.add('has-focus');for(let i=1;i<path.length;i++)pathEdges.add(key(path[i-1],path[i]));const summary=document.createElement('p');summary.className='path-summary';summary.textContent=`${path.length-1}개 연결 · ${path.length}개 그룹${path.length===1?' (같은 그룹)':''}`;result.append(summary);
 path.forEach((id,i)=>{const item=document.createElement('div');item.className='path-item';item.append(button(id,()=>selectNode(id)));if(i<path.length-1){const e=analysis.adjacency.get(id).find(n=>n.id===path[i+1]).edge,p=document.createElement('p');p.textContent=e.members.join(' · ');item.append(p);const links=document.createElement('div');links.className='sources';links.innerHTML=sourcesMarkup(e);item.append(links);}result.append(item);});refresh();focusNodes(path);
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
configureScope();
const requestedGroup=new URLSearchParams(location.search).get('group');
const requestedNode=DATA.nodes.find(node=>node.id===requestedGroup);
if(requestedNode){if(['unit','external'].includes(requestedNode.category)){$('#expanded').checked=true;configureScope();}selectNode(requestedNode.id);}
function showLinkedAbout(){if(location.hash==='#about'&&!aboutDialog.open)aboutDialog.showModal();}
window.addEventListener('hashchange',showLinkedAbout);
showLinkedAbout();
