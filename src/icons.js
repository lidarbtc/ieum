const paths={
 search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/>',
 route:'<circle cx="5" cy="5" r="2.5"/><circle cx="19" cy="19" r="2.5"/><path d="M7.5 5H16a4 4 0 0 1 0 8H8a4 4 0 0 0 0 8h8.5"/>',
 map:'<path d="m9 18-6 3V6l6-3 6 3 6-3v15l-6 3-6-3Z"/><path d="M9 3v15M15 6v15"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',
 fit:'<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/><circle cx="12" cy="12" r="3"/>',
 full:'<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/>',
 arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',up:'<path d="M6 18 18 6M6 6h12v12"/>',
 close:'<path d="m6 6 12 12M6 18 18 6"/>',reset:'<path d="M3 11a9 9 0 1 1 2 6M3 4v7h7"/>',
 info:'<circle cx="12" cy="12" r="9"/><path d="M12 10v7M12 6.5v.5"/>',
 sliders:'<path d="M4 7h4m4 0h8M4 17h8m4 0h4"/><circle cx="10" cy="7" r="2"/><circle cx="14" cy="17" r="2"/>',
 download:'<path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4"/>',
 chevron:'<path d="m9 6 6 6-6 6"/>'
};
export const icon=(name)=>`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.chevron}</svg>`;
export function mountIcons(){document.querySelectorAll('[data-icon]').forEach(n=>{n.innerHTML=icon(n.dataset.icon);});}
