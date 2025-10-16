// ========================================================
// 🌟 PREMIUM TOOL DASHBOARD JS (No Views)
// ========================================================

// Cached DOM references for performance
const toolCards = [...document.querySelectorAll('.tool-card')];
const allGrid = document.getElementById('allToolsGrid');
const overlaySearchInput = document.getElementById('overlaySearchInput');
const searchResults = document.getElementById('searchResults');
const backToTop = document.getElementById("backToTop");

// ========================================================
// 🧩 Populate All Tools (Shuffled)
// ========================================================
function populateAllTools() {
  allGrid.innerHTML = '';
  const shuffled = [...toolCards].sort(() => Math.random() - 0.5);
  const fragment = document.createDocumentFragment();
  shuffled.forEach(card => fragment.appendChild(card.cloneNode(true)));
  allGrid.appendChild(fragment);
  lazyLoad(allGrid);
}

// ========================================================
// 🔘 Show Section (with smooth scroll + bubble highlight)
// ========================================================
function showSection(id, el) {
  document.querySelectorAll('.container').forEach(sec => sec.classList.remove('active'));
  const container = document.getElementById(id);
  container.classList.add('active');

  // Highlight bubble
  document.querySelectorAll('.bubble-menu button').forEach(btn => btn.classList.remove('active'));
  if (el?.tagName === 'BUTTON') el.classList.add('active');

  // Populate tools
  id === 'all' ? populateAllTools() : lazyLoad(container);

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========================================================
// 🔍 Search Overlay System
// ========================================================
const searchOverlay = document.getElementById('searchOverlay');

function openSearch() {
  searchOverlay.classList.add('active');
  overlaySearchInput.focus();
  populateSearchResults('');
}

function closeSearch() {
  searchOverlay.classList.remove('active');
  overlaySearchInput.value = '';
  searchResults.innerHTML = '';
}

function outsideClick(e) {
  if (e.target.id === 'searchOverlay') closeSearch();
}

document.addEventListener('keydown', e => e.key === 'Escape' && closeSearch());

// ========================================================
// 🔎 Populate Search Results (with smoother animation)
// ========================================================
function populateSearchResults(query = '') {
  searchResults.innerHTML = '';
  const filter = query.trim().toLowerCase();
  let results = [];

  if (!filter) {
    results = [...toolCards].sort(() => Math.random() - 0.5);
  } else {
    results = toolCards.filter(card =>
      card.querySelector('.tool-name')?.innerText.toLowerCase().includes(filter)
    );
  }

  if (!results.length) {
    searchResults.innerHTML = `<p style="grid-column:1/-1;color:#666;">No tools found...</p>`;
    return;
  }

  const fragment = document.createDocumentFragment();
  results.forEach(card => fragment.appendChild(card.cloneNode(true)));
  searchResults.appendChild(fragment);
  lazyLoad(searchResults);
}

// Debounced search input (for smoother typing)
let searchTimeout;
overlaySearchInput.addEventListener('input', e => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => populateSearchResults(e.target.value), 200);
});

// ========================================================
// 🪄 Tool Card Animation (Optimized LazyLoad)
// ========================================================
function lazyLoad(container = document) {
  const cards = container.querySelectorAll('.tool-card');

  cards.forEach((card, i) => {
    card.classList.remove('visible');
    card.style.opacity = '0';
    card.style.transform = 'translateY(25px) scale(0.97)';
    card.style.transition = 'none';

    setTimeout(() => {
      card.style.transition =
        'opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1), transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0) scale(1)';
      card.classList.add('visible');
    }, i * 100); // stagger delay
  });
}

// ========================================================
// ⬆️ Back to Top Button (Smooth Visibility)
// ========================================================
window.addEventListener('scroll', () => {
  backToTop.style.opacity = window.scrollY > 150 ? '1' : '0';
  backToTop.style.pointerEvents = window.scrollY > 150 ? 'auto' : 'none';
});
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========================================================
// 🏷️ Dynamic Tags Only (No Views)
// ========================================================
document.querySelectorAll('.tool-card').forEach((card, index) => {
  const tag = document.createElement('div');
  tag.classList.add('tool-tag');
  tag.innerText = (index % 3 === 0) ? "⭐ Featured" : (index % 2 === 0 ? "NEW" : "FREE");
  card.appendChild(tag);
});

// ========================================================
// 🚀 Initial Load
// ========================================================
document.addEventListener("DOMContentLoaded", () => {
  showSection('all', document.querySelector('.bubble-menu button'));
});
