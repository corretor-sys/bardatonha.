const $ = selector => document.querySelector(selector);
const base = document.body.dataset.base;
function element(tag, value) {
  const node = document.createElement(tag);
  if (value) node.textContent = value;
  return node;
}
function photo(file, alt) {
  const image = element("img");
  image.src = base + "assets/" + file;
  image.alt = alt;
  image.loading = "lazy";
  return image;
}
function filters(container, labels, update) {
  if (!container) return;
  const buttons = labels.map(label => {
    const button = element("button", label);
    container.append(button);
    button.addEventListener("click", () => choose(label));
    return button;
  });
  function choose(label) {
    buttons.forEach(button => button.setAttribute("aria-pressed", String(button.textContent === label)));
    update(label);
  }
  choose(labels[0]);
}
const search = $("#menu-search");
let category = "Todos";
const normalize = value => value.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLocaleLowerCase("pt-BR").trim();
function renderMenu(label) {
  category = label;
  const term = normalize(search?.value || "");
  const list = $("#products");
  list.replaceChildren();
  const items = produtos.filter(item => (label === "Todos" || item.categoria === label) && normalize(item.nome+" "+item.categoria).includes(term));
  const visible = !base && label === "Todos" ? items.slice(0,3) : items;
  visible.forEach(item => {
    const card = element("article");
    card.className = "product";
    const info = element("div");
    info.append(element("h3",item.nome),element("p",item.descricao),element("strong","R$ " + item.preco),element("small", item.disponibilidade));
    card.append(photo(item.foto + ".jpg",""),info);
    list.append(card);
  });
  if (!items.length) list.append(element("p",term ? "Nenhuma bebida encontrada. Tente outro nome ou categoria." : "Cardápio de comidas em atualização. Consulte as opções do dia com o bar."));
}
filters($("#filters"), ["Todos","Cervejas","Refrigerantes","Energéticos","Isotônicos","Hidratação","Comidas"],renderMenu);
search?.addEventListener("input", () => renderMenu(category));
const dialog = $("dialog");
const viewerImage = dialog.querySelector("img");
const viewerNav = dialog.querySelector(".viewer-nav");
let album = [];
let currentPhoto = 0;
function showPhoto(index) {
  currentPhoto = (index + album.length) % album.length;
  const entry = album[currentPhoto];
  viewerImage.src = entry.src;
  viewerImage.alt = entry.title;
  dialog.querySelector("p").textContent = entry.title;
  viewerNav.querySelector("output").textContent = (currentPhoto + 1) + " / " + album.length;
}
function openAlbum(entries, index = 0) {
  album = entries;
  viewerNav.hidden = entries.length < 2;
  showPhoto(index);
  dialog.showModal();
}
$(".enlarge").onclick = e => openAlbum([{src:e.currentTarget.dataset.img,title:e.currentTarget.dataset.title}]);
$(".close").onclick = () => dialog.close();
dialog.onclick = e => {if (e.target === dialog) dialog.close()};
viewerNav.querySelector(".previous").onclick = () => showPhoto(currentPhoto - 1);
viewerNav.querySelector(".next").onclick = () => showPhoto(currentPhoto + 1);
dialog.addEventListener("keydown", event => {
  if (album.length < 2 || !["ArrowLeft","ArrowRight"].includes(event.key)) return;
  event.preventDefault();
  showPhoto(currentPhoto + (event.key === "ArrowLeft" ? -1 : 1));
});
let touchStart;
viewerImage.addEventListener("pointerdown", event => {
  if (event.pointerType !== "touch" || album.length < 2) return;
  touchStart = {x:event.clientX,y:event.clientY};
  if (viewerImage.hasPointerCapture(event.pointerId) === false && event.isTrusted) viewerImage.setPointerCapture(event.pointerId);
});
viewerImage.addEventListener("pointerup", event => {
  if (!touchStart) return;
  const dx = event.clientX - touchStart.x;
  const dy = event.clientY - touchStart.y;
  touchStart = null;
  if (Math.abs(dx) > 40 && Math.abs(dx) > 1.5 * Math.abs(dy)) showPhoto(currentPhoto + (dx < 0 ? 1 : -1));
});
viewerImage.addEventListener("pointercancel", () => {touchStart = null});
dialog.addEventListener("close", () => {touchStart = null});
filters($("#galleryFilters"),["Todas","Ambiente","Churrasco","Momentos no bar"], label => {
  const grid = $("#photos");
  grid.replaceChildren();
  const visible = galeria.filter(p => label === "Todas" || p.categorias.includes(label));
  const entries = visible.map(p => ({src:base+"assets/"+p.foto+".jpg",title:p.nome}));
  visible.forEach((p,index) => {
    const button = element("button");
    const image = photo(p.foto + ".jpg","");
    button.append(image,element("b",p.nome));
    button.setAttribute("aria-label","Ampliar foto: " + p.nome);
    button.onclick = () => openAlbum(entries,index);
    grid.append(button);
  });
  if (!grid.children.length) grid.append(element("p","Ainda não há fotos nesta categoria."));
});
if ($("#agenda")) {
  if (!eventos.length) $("#agenda").append(element("p","A próxima atração ainda não foi anunciada."));
  eventos.forEach(evento => {
    const card = element("article");
    card.append(element("h3",evento.artista),element("p",evento.data + " · " + evento.horario));
    if (evento.cartaz) card.append(photo(evento.cartaz,"Cartaz de " + evento.artista));
    $("#agenda").append(card);
  });
}
const toggle = $(".toggle");
function mobile(open) {
  $("#nav").classList.toggle("open",open);
  toggle.setAttribute("aria-expanded",String(open));
}
toggle.onclick = () => mobile(toggle.getAttribute("aria-expanded") !== "true");
$("#nav").onclick = () => mobile(false);
document.addEventListener("keydown", e => {if(e.key === "Escape" && $("#nav").classList.contains("open")){mobile(false);toggle.focus()}});
const still = matchMedia("(prefers-reduced-motion: reduce)");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (!still.matches) entry.target.classList.add("reveal");
      observer.unobserve(entry.target);
    }
  }));
  document.querySelectorAll("h2").forEach(h => observer.observe(h));
}
const sections = [...document.querySelectorAll("main section[id]")];
function updatePosition() {
  const active = sections.filter(s => s.getBoundingClientRect().top < window.innerHeight * .47).pop() || sections[0];
  document.querySelectorAll("#nav a").forEach(a => a.classList.toggle("active", a.hash === "#" + active?.id));
  const picture = $(".polaroid");
  if (picture && !still.matches && window.innerWidth > 700) picture.style.setProperty("--shift",Math.min(scrollY*.035,12)+"px");
}
updatePosition();
window.addEventListener("scroll",updatePosition,{passive:true});

document.addEventListener("pointermove", event => {
  if (event.pointerType !== "mouse" || still.matches) return;
  const control = event.target.closest(".button,.contact,.float,.tabs button,.scenes button");
  if (!control) return;
  const box = control.getBoundingClientRect();
  control.style.setProperty("--highlight", ((event.clientX - box.left) / box.width * 100) + "%");
}, {passive:true});
