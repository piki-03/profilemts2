const $=(s,r=document)=>r.querySelector(s);
const awards=[
 {b:'Robotik',t:'Juara 2 dan Juara 3 Grand Final ISTEC 2026 (Bali)',w:'7-10 Mei 2026'},
 {b:'Futsal',t:'Juara 2 Mini Grand Champion Provinsi Jawa Tengah, Allievo Futsal Championship',w:'2025'},
 {b:'Futsal',t:'Juara 1 kompetisi futsal Solo Raya, GOR Bung Karno Sukoharjo',w:'Mei 2024'},
 {b:'Lingkungan',t:'Sekolah Adiwiyata tingkat Provinsi Jawa Tengah',w:'2023'}
];
const news=[
 {k:'Lomba',t:'Contoh: Tim robotik pulang dari ISTEC 2026',i:'assets/img/lomba/robotik.svg'},
 {k:'Mabit',t:'Contoh: Malam bina iman dan takwa siswa',i:'assets/img/kegiatan/mabit.svg'},
 {k:'Study tour',t:'Contoh: Kunjungan belajar ke luar kota',i:'assets/img/kegiatan/studytour.svg'}
];
const gal=[['kegiatan/mabit','Mabit siswa'],['kegiatan/tahfidz','Tahfidz pagi'],['kegiatan/studytour','Study tour'],['kegiatan/adiwiyata','Adiwiyata'],['lomba/robotik','Lomba robotik'],['lomba/futsal','Juara futsal'],['lomba/sains','Lomba sains']];

/* prestasi + filter */
const bidang=['Semua',...new Set(awards.map(a=>a.b))];
const fl=$('#filters'),al=$('#awards');
function drawAwards(f){al.innerHTML=awards.filter(a=>f==='Semua'||a.b===f).map(a=>`<li><b>${a.b}</b><span>${a.t}</span><em>${a.w}</em></li>`).join('');}
fl.innerHTML=bidang.map((b,i)=>`<button class="chip${i?'':' on'}" aria-pressed="${!i}">${b}</button>`).join('');
fl.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;fl.querySelectorAll('button').forEach(x=>{x.classList.toggle('on',x===b);x.setAttribute('aria-pressed',x===b)});drawAwards(b.textContent)});
drawAwards('Semua');

/* berita + galeri */
$('#news').innerHTML=news.map(n=>`<article class="card reveal"><img loading="lazy" src="${n.i}" alt=""><div><small>${n.k}</small><h3>${n.t}</h3></div></article>`).join('');
$('#gallery').innerHTML=gal.map(([p,a])=>`<button class="g" data-src="assets/img/${p}.svg" aria-label="Perbesar: ${a}"><img loading="lazy" src="assets/img/${p}.svg" alt="${a}"></button>`).join('');

/* lightbox */
const lb=$('#lb'),lbi=$('img',lb);
$('#gallery').addEventListener('click',e=>{const g=e.target.closest('.g');if(!g)return;lbi.src=g.dataset.src;lbi.alt=g.firstElementChild.alt;lb.hidden=false;$('button',lb).focus()});
lb.addEventListener('click',()=>lb.hidden=true);
addEventListener('keydown',e=>{if(e.key==='Escape')lb.hidden=true});

/* menu mobile */
const burger=$('#burger'),menu=$('#menu');
burger.onclick=()=>{const o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o)};
menu.addEventListener('click',e=>{if(e.target.tagName==='A'){menu.classList.remove('open');burger.setAttribute('aria-expanded',false)}});
addEventListener('scroll',()=>$('#nav').classList.toggle('stuck',scrollY>20),{passive:true});

/* animasi: reveal saat scroll + hitung angka */
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add('in');io.unobserve(e.target)}),{threshold:.2});
document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=(i%3)*80+'ms';io.observe(el)});
const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;co.unobserve(e.target);const n=+e.target.dataset.count;if(reduce){e.target.textContent=n;return}const t0=performance.now();(function f(t){const p=Math.min((t-t0)/1200,1);e.target.textContent=Math.round(n*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(t0)}),{threshold:.6});
document.querySelectorAll('[data-count]').forEach(el=>co.observe(el));
