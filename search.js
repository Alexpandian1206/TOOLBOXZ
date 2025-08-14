// =======================
// TOOL CARDS
// =======================
const toolCards = [...document.querySelectorAll('.tool-card')];
const allGrid = document.getElementById('allToolsGrid');

// Populate all tools (shuffled)
function populateAllTools() {
  allGrid.innerHTML = '';
  const shuffled = [...toolCards].sort(() => Math.random() - 0.5);
  shuffled.forEach(card => {
    const clone = card.cloneNode(true);
    allGrid.appendChild(clone);
  });
  lazyLoad(allGrid);
}

// Show section
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
  const filtered = toolCards.filter(card => card.innerText.toLowerCase().includes(filter));
  if (filtered.length === 0) {
    searchResults.innerHTML = '<p style="grid-column:1/-1;color:#666;">No tools found...</p>';
  } else {
    filtered.forEach(card => searchResults.appendChild(card.cloneNode(true)));
  }
  lazyLoad(searchResults);
}

overlaySearchInput.addEventListener('input', function () {
  populateSearchResults(this.value);
});

// =======================
// LAZY LOAD ANIMATION
// =======================
function lazyLoad(container = document) {
  const cards = container.querySelectorAll('.tool-card');
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.classList.remove('visible');
  });

  cards.forEach((card, i) => {
    setTimeout(() => {
      card.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
      card.classList.add('visible');
    }, i * 100);
  });
}

// =======================
// BUBBLE MENU RANDOMIZER & LAYOUT
// =======================
const bubbleMenu = document.querySelector('.bubble-menu');
const bubbles = [...bubbleMenu.querySelectorAll('button')];

// Separate "All Tools" button and other bubbles
const allToolsButton = bubbles.find(b => b.dataset.id === 'all');
const otherBubbles = bubbles.filter(b => b !== allToolsButton);

// Shuffle array function
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Render bubble menu
function renderBubbleMenu() {
  bubbleMenu.innerHTML = '';
  bubbleMenu.appendChild(allToolsButton); // always first
  const shuffled = shuffleArray(otherBubbles);
  shuffled.forEach(b => bubbleMenu.appendChild(b));
  layoutBubbles();
  animateBubbles();
}

// Adjust bubble widths to fit container evenly
function layoutBubbles() {
  const containerWidth = bubbleMenu.clientWidth;
  const buttons = bubbleMenu.querySelectorAll('button');
  const totalGaps = (buttons.length - 1) * 12; // gap between buttons in px
  const availableWidth = containerWidth - totalGaps;
  const buttonWidth = Math.floor(availableWidth / buttons.length);

  buttons.forEach(btn => {
    btn.style.flex = `0 0 ${buttonWidth}px`;
  });
}

// Animate bubbles
function animateBubbles() {
  const currentBubbles = bubbleMenu.querySelectorAll('button');
  currentBubbles.forEach((b, i) => {
    b.style.opacity = '0';
    b.style.transform = 'translateY(20px)';
    setTimeout(() => {
      b.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
      b.style.opacity = '1';
      b.style.transform = 'translateY(0)';
    }, i * 100);
  });
}

// Recalculate on window resize
window.addEventListener('resize', () => {
  layoutBubbles();
});

// =======================
// BACK TO TOP
// =======================
const backToTop = document.getElementById("backToTop");
window.onscroll = () => {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =======================
// TOOL TAGS & VIEW COUNTER
// =======================
document.querySelectorAll('.tool-card').forEach((card, index) => {
  const tag = document.createElement('div');
  tag.classList.add('tool-tag');
  tag.innerText = (index % 2 === 0) ? "NEW" : "FREE";
  card.appendChild(tag);

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
renderBubbleMenu();
