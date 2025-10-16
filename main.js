/* ============================================================
   PREMIUM TOOL PAGE SCRIPT ✨
   Optimized for smooth animations, clean logic, and better UX
============================================================ */

// ========== GLOBAL SELECTORS ==========
const toolCards = [...document.querySelectorAll('.tool-card')];
const allGrid = document.getElementById('allToolsGrid');
const overlaySearchInput = document.getElementById('overlaySearchInput');
const searchResults = document.getElementById('searchResults');
const backToTop = document.getElementById('backToTop');

/* ============================================================
   SECTION SWITCHING & MENU LOGIC
============================================================ */
function populateAllTools() {
  allGrid.innerHTML = '';
  const shuffled = [...toolCards].sort(() => Math.random() - 0.5);
  shuffled.forEach(card => allGrid.appendChild(card.cloneNode(true)));
  lazyLoad(allGrid);
}

function showSection(id, el) {
  // Hide all containers
  document.querySelectorAll('.container').forEach(sec => sec.classList.remove('active'));

  // Activate selected container
  const container = document.getElementById(id);
  container.classList.add('active');

  // Highlight active menu bubble
  document.querySelectorAll('.bubble-menu button').forEach(btn => btn.classList.remove('active'));
  if (el?.tagName === 'BUTTON') el.classList.add('active');

  // Populate accordingly
  id === 'all' ? populateAllTools() : lazyLoad(container);

  // Smooth scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ============================================================
   SEARCH OVERLAY HANDLER
============================================================ */
function openSearch() {
  const overlay = document.getElementById('searchOverlay');
  overlay.classList.add('active');
  overlaySearchInput.focus();
  populateSearchResults('');
}

function closeSearch() {
  const overlay = document.getElementById('searchOverlay');
  overlay.classList.remove('active');
  overlaySearchInput.value = '';
  searchResults.innerHTML = '';
}

function outsideClick(e) {
  if (e.target.id === 'searchOverlay') closeSearch();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeSearch();
});

function populateSearchResults(query = '') {
  const filter = query.toLowerCase().trim();
  searchResults.innerHTML = '';

  let filtered = filter
    ? toolCards.filter(card =>
        card.querySelector('.tool-name').innerText.toLowerCase().includes(filter)
      )
    : [...toolCards].sort(() => Math.random() - 0.5);

  if (!filtered.length) {
    searchResults.innerHTML = `<p style="grid-column:1/-1;color:#666;">No tools found...</p>`;
  } else {
    filtered.forEach(card => searchResults.appendChild(card.cloneNode(true)));
  }

  lazyLoad(searchResults);
}

overlaySearchInput.addEventListener('input', e => populateSearchResults(e.target.value));

/* ============================================================
   TOOL CARD ENTRY ANIMATIONS
============================================================ */
function lazyLoad(container = document) {
  const cards = container.querySelectorAll('.tool-card');
  const baseDelay = 100;

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(25px)';
    card.classList.remove('visible');
  });

  cards.forEach((card, i) => {
    setTimeout(() => {
      card.classList.add('visible');
      card.style.transition = 'opacity 0.6s cubic-bezier(0.25,1,0.5,1), transform 0.6s cubic-bezier(0.25,1,0.5,1)';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, i * baseDelay);
  });
}

/* ============================================================
   BACK TO TOP BUTTON
============================================================ */
window.addEventListener('scroll', () => {
  backToTop.style.opacity = window.scrollY > 120 ? '1' : '0';
  backToTop.style.pointerEvents = window.scrollY > 120 ? 'auto' : 'none';
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ============================================================
   AUTO TAGGING & VIEW COUNTER (Dynamic Badges)
============================================================ */
document.querySelectorAll('.tool-card').forEach((card, index) => {
  // Add tag (alternate NEW / FREE)
  const tag = document.createElement('div');
  tag.className = 'tool-tag';
  tag.textContent = index % 2 === 0 ? 'NEW' : 'FREE';
  card.appendChild(tag);

  // Add random views
  const views = Math.floor(Math.random() * 40000) + 60000;
  const formattedViews = `${(views / 1000).toFixed(1)}K`;

  const counter = document.createElement('div');
  counter.className = 'tool-views';
  counter.innerHTML = `👁️ ${formattedViews}`;
  card.appendChild(counter);
});

/* ============================================================
   INITIAL LOAD
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  showSection('all', document.querySelector('.bubble-menu button'));
});
