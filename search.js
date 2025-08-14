// =======================
// TOOL CARDS & BUBBLE MENU
// =======================
const toolCards = [...document.querySelectorAll('.tool-card')];
const allGrid = document.getElementById('allToolsGrid');

// Populate all tools (shuffled)
function populateAllTools() {
  allGrid.innerHTML = '';
  const shuffled = [...toolCards].sort(() => Math.random() - 0.5);
  shuffled.forEach(card => allGrid.appendChild(card.cloneNode(true)));
  lazyLoad();
}

// Show a section (container) and highlight bubble
function showSection(id, el) {
  document.querySelectorAll('.container').forEach(sec => sec.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  // Highlight active bubble
  document.querySelectorAll('.bubble-menu button').forEach(b => b.classList.remove('active'));
  if (el && el.tagName === 'BUTTON') el.classList.add('active');

  if (id === 'all') populateAllTools();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =======================
// SEARCH OVERLAY
// =======================
function openSearch() {
  document.getElementById('searchOverlay').classList.add('active');
  document.getElementById('overlaySearchInput').focus();
  populateSearchResults('');
}

function closeSearch() {
  document.getElementById('searchOverlay').classList.remove('active');
  document.getElementById('overlaySearchInput').value = '';
  document.getElementById('searchResults').innerHTML = '';
}

function outsideClick(e) {
  if (e.target.id === 'searchOverlay') closeSearch();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeSearch();
});

const overlaySearchInput = document.getElementById('overlaySearchInput');
const searchResults = document.getElementById('searchResults');

function populateSearchResults(query) {
  searchResults.innerHTML = '';
  const filter = query.toLowerCase();
  const filtered = toolCards.filter(card =>
    card.querySelector('.tool-name').innerText.toLowerCase().includes(filter)
  );

  if (filtered.length === 0) {
    searchResults.innerHTML = '<p style="grid-column:1/-1;color:#666;">No tools found...</p>';
  } else {
    filtered.forEach(card => searchResults.appendChild(card.cloneNode(true)));
  }

  lazyLoad();
}

overlaySearchInput.addEventListener('input', function () {
  populateSearchResults(this.value);
});

// =======================
// TOOL CARD ANIMATION
// =======================
function lazyLoad() {
  document.querySelectorAll('.tool-card').forEach((card, i) => {
    setTimeout(() => card.classList.add('visible'), i * 100);
  });
}

// =======================
// BACK TO TOP BUTTON
// =======================
const backToTop = document.getElementById("backToTop");
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
});
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =======================
// MODAL TAGS & COUNTER
// =======================

// Add tags (NEW / FREE)
document.querySelectorAll('.tool-card').forEach((card, index) => {
  const tag = document.createElement('div');
  tag.classList.add('tool-tag');
  tag.innerText = (index % 2 === 0) ? "NEW" : "FREE";
  card.appendChild(tag);
});

// Fake view counter
document.querySelectorAll('.tool-card').forEach(card => {
  const counter = document.createElement('div');
  const views = Math.floor(Math.random() * 50000) + 50000;
  const formattedViews = (views / 1000).toFixed(1) + 'K';
  counter.style.cssText = "position:absolute;bottom:8px;right:12px;font-size:12px;color:#999;";
  counter.innerHTML = `👁️ ${formattedViews}`;
  card.appendChild(counter);
});

// =======================
// INITIAL LOAD
// =======================
showSection('all', document.querySelector('.bubble-menu button'));
