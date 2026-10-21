/* ===== EDITA AQUÍ TUS VIDEOS =====
   type:   "redes" o "eventos"
   format: "vertical" (reel 9:16) o "horizontal" (16:9)
   src:    ruta del video dentro de la carpeta del sitio (videos/01.mp4, ...)
   thumb:  (opcional) imagen de portada, por ejemplo "img/01.jpg" */
const VIDEOS = [
  {title:"Reel dinámico para redes", type:"redes", format:"vertical", src:"videos/01.mp4"},
  {title:"Resumen de evento", type:"eventos", format:"horizontal", src:"videos/02.mp4"},
  {title:"Video de marca", type:"redes", format:"vertical", src:"videos/03.mp4"},
  {title:"Cobertura de concierto", type:"eventos", format:"horizontal", src:"videos/04.mp4"},
  {title:"Contenido para tienda", type:"redes", format:"vertical", src:"videos/05.mp4"},
  {title:"Evento corporativo", type:"eventos", format:"horizontal", src:"videos/06.mp4"},
  {title:"Reel con música", type:"redes", format:"vertical", src:"videos/07.mp4"},
  {title:"Festival local", type:"eventos", format:"horizontal", src:"videos/08.mp4"},
  {title:"Historia de producto", type:"redes", format:"vertical", src:"videos/09.mp4"}
];

const grid = document.getElementById('grid');
const dlg = document.getElementById('player');
const vid = document.getElementById('vid');
const titleEl = document.getElementById('player-title');
const KIND = {redes: 'Contenido para redes', eventos: 'Eventos'};
let current = 'todos';

function render() {
  grid.innerHTML = '';
  VIDEOS.filter(v => current === 'todos' || v.type === current).forEach(v => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'card ' + v.format;
    card.setAttribute('aria-label', 'Reproducir ' + v.title);
    const media = v.thumb
      ? `<img src="${v.thumb}" alt="" loading="lazy">`
      : `<video src="${v.src}#t=0.1" preload="metadata" muted playsinline></video>`;
    card.innerHTML = `<span class="thumb">${media}<span class="play" aria-hidden="true"></span></span>
      <span class="title">${v.title}</span><span class="kind">${KIND[v.type]}</span>`;
    card.addEventListener('click', () => openPlayer(v));
    grid.appendChild(card);
  });
}

function openPlayer(v) {
  titleEl.textContent = v.title;
  vid.src = v.src;
  dlg.showModal();
  vid.play().catch(() => {}); // si el navegador bloquea el autoplay, quedan los controles
}

dlg.querySelector('.close').addEventListener('click', () => dlg.close());
dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
dlg.addEventListener('close', () => { vid.pause(); vid.removeAttribute('src'); vid.load(); });

document.querySelectorAll('.filters button').forEach(btn => {
  btn.addEventListener('click', () => {
    current = btn.dataset.filter;
    document.querySelectorAll('.filters button').forEach(b => b.setAttribute('aria-pressed', b === btn));
    render();
  });
});

render();
