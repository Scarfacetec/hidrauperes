'use strict';
// Número informado pelo responsável, incluindo DDI e DDD.
const WHATSAPP = '559691415725';
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { navigation.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Abrir menu'); }
menuButton.addEventListener('click', () => { const open = navigation.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu'); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if(event.key === 'Escape') closeMenu(); });
document.querySelectorAll('[data-whatsapp]').forEach(link => { link.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Olá! Gostaria de informações sobre os serviços da Hidrau Peres.')}`; });
document.querySelector('#quote-form').addEventListener('submit', event => { event.preventDefault(); const data = new FormData(event.currentTarget); const message = `Olá, Hidrau Peres! Meu nome é ${data.get('name').trim()}.\nEquipamento: ${data.get('equipment')}.\n${data.get('message').trim()}`; window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer'); });
document.querySelector('#year').textContent = new Date().getFullYear();

// Busca e filtros locais: nenhum servidor necessário.
const equipmentSearch = document.querySelector('#equipment-search');
const equipmentCategory = document.querySelector('#equipment-category');
const equipmentRows = [...document.querySelectorAll('.equipment-row')];
const normalizeText = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
function filterEquipment() {
 const query = normalizeText(equipmentSearch.value);
 const category = equipmentCategory.value;
 let count = 0;
 equipmentRows.forEach(row => {
  const matches = normalizeText(row.querySelector('h3').textContent).includes(query) && (!category || row.dataset.category === category);
  row.hidden = !matches;
  if (matches) count++;
 });
 document.querySelector('#equipment-count').textContent = `${count} ${count === 1 ? 'equipamento encontrado' : 'equipamentos encontrados'}`;
 document.querySelector('#equipment-empty').hidden = count > 0;
}
equipmentSearch.addEventListener('input', filterEquipment);
equipmentCategory.addEventListener('change', filterEquipment);
document.querySelector('#equipment-reset').addEventListener('click', () => { equipmentSearch.value = ''; equipmentCategory.value = ''; filterEquipment(); equipmentSearch.focus(); });
document.querySelectorAll('[data-equipment]').forEach(link => link.addEventListener('click', () => { document.querySelector('#equipment').value = link.dataset.equipment; }));

// Ampliação das fotos com navegação por botões e teclado.
const photoLinks = [...document.querySelectorAll('[data-gallery]')];
const photoDialog = document.querySelector('#photo-dialog');
let photoIndex = 0;
function showPhoto(index) {
 photoIndex = (index + photoLinks.length) % photoLinks.length;
 const link = photoLinks[photoIndex];
 const image = document.querySelector('#photo-full');
 image.src = link.href;
 image.alt = link.querySelector('img').alt;
 document.querySelector('#photo-caption').textContent = image.alt;
 document.querySelector('#photo-position').textContent = `${photoIndex + 1} / ${photoLinks.length}`;
}
photoLinks.forEach((link, index) => link.addEventListener('click', event => {
 if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || typeof photoDialog.showModal !== 'function') return;
 event.preventDefault();
 showPhoto(index);
 photoDialog.showModal();
}));
document.querySelector('#photo-close').addEventListener('click', () => photoDialog.close());
document.querySelector('#photo-previous').addEventListener('click', () => showPhoto(photoIndex - 1));
document.querySelector('#photo-next').addEventListener('click', () => showPhoto(photoIndex + 1));
photoDialog.addEventListener('keydown', event => { if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); showPhoto(photoIndex + (event.key === 'ArrowLeft' ? -1 : 1)); } });
photoDialog.addEventListener('click', event => { if (event.target === photoDialog) { const rect = photoDialog.getBoundingClientRect(); if(event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) photoDialog.close(); } });

// Rotação do banner: pausa manual, por foco e com movimento reduzido.
const banner = document.querySelector('.hero-banner');
const bannerSlides = [...document.querySelectorAll('.banner-slide')];
const bannerPause = document.querySelector('#banner-pause');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let bannerIndex = 0;
let bannerStopped = reducedMotion.matches;
let bannerTimer;
function showBanner(index) {
 bannerIndex = (index + bannerSlides.length) % bannerSlides.length;
 bannerSlides.forEach((slide, i) => slide.classList.toggle('active', i === bannerIndex));
 document.querySelector('#banner-counter').textContent = `${String(bannerIndex + 1).padStart(2, '0')} / ${String(bannerSlides.length).padStart(2, '0')}`;
}
function scheduleBanner() {
 clearInterval(bannerTimer);
 if (!bannerStopped && !document.hidden && !banner.matches(':focus-within')) bannerTimer = setInterval(() => showBanner(bannerIndex + 1), 3000);
}
function updateBannerPause() {
 bannerPause.textContent = bannerStopped ? 'Reproduzir' : 'Pausar';
 bannerPause.setAttribute('aria-label', bannerStopped ? 'Reproduzir rotação de imagens' : 'Pausar rotação de imagens');
 bannerPause.setAttribute('aria-pressed', String(bannerStopped));
 scheduleBanner();
}
document.querySelector('#banner-prev').addEventListener('click', () => { showBanner(bannerIndex - 1); scheduleBanner(); });
document.querySelector('#banner-next').addEventListener('click', () => { showBanner(bannerIndex + 1); scheduleBanner(); });
bannerPause.addEventListener('click', () => { bannerStopped = !bannerStopped; updateBannerPause(); });
banner.addEventListener('focusin', () => clearInterval(bannerTimer));
banner.addEventListener('focusout', () => setTimeout(scheduleBanner, 0));
document.addEventListener('visibilitychange', scheduleBanner);
reducedMotion.addEventListener('change', event => { bannerStopped = event.matches; updateBannerPause(); });
updateBannerPause();

