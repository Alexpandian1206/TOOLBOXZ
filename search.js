// =======================
// SEARCH OVERLAY FUNCTIONS
// =======================
const pageOverlaySearchInput = document.getElementById('page-overlaySearchInput');
const pageSearchResults = document.getElementById('page-searchResults');
const pageSearchOverlay = document.getElementById('page-searchOverlay');

// Open search overlay
function pageOpenSearch() {
  pageSearchOverlay.classList.add('active');
  pageOverlaySearchInput.focus();
  pagePopulateSearchResults('');
}

// Close search overlay
function pageCloseSearch() {
  pageSearchOverlay.classList.remove('active');
  pageOverlaySearchInput.value = '';
  pageSearchResults.innerHTML = '';
}

// Close overlay if clicked outside
pageSearchOverlay.addEventListener('click', e => {
  if (e.target.id === 'page-searchOverlay') pageCloseSearch();
});

// Close overlay on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') pageCloseSearch();
});

// Create a search card
function pageCreateSearchCard(tool) {
  const card = document.createElement('div');
  card.classList.add('page-tool-card');
  card.onclick = () => location.href = tool.link;

  const img = document.createElement('img');
  img.src = tool.img;
  img.alt = tool.name;
  card.appendChild(img);

  const span = document.createElement('span');
  span.classList.add('page-tool-name');
  span.textContent = tool.name;
  card.appendChild(span);

  // NEW/FREE tag
  const tag = document.createElement('div');
  tag.classList.add('page-tool-tag');
  tag.innerText = Math.random() > 0.5 ? "NEW" : "FREE";
  card.appendChild(tag);

  // View counter
  const counter = document.createElement('div');
  const views = Math.floor(Math.random() * 50000) + 50000;
  counter.style.cssText = "position:absolute;bottom:8px;right:12px;font-size:12px;color:#999;";
  counter.innerHTML = `👁️ ${(views / 1000).toFixed(1)}K`;
  card.appendChild(counter);

  return card;
}

// Populate search results
function pagePopulateSearchResults(query) {
  pageSearchResults.innerHTML = '';
  const filter = query.toLowerCase();
  const filtered = pageToolsList.filter(tool => tool.name.toLowerCase().includes(filter));

  if (filtered.length === 0) {
    pageSearchResults.innerHTML = '<p style="grid-column:1/-1;color:#666;">No tools found...</p>';
  } else {
    filtered.forEach(tool => pageSearchResults.appendChild(pageCreateSearchCard(tool)));
  }

  pageLazyLoad(pageSearchResults);
}

// Input event listener
pageOverlaySearchInput.addEventListener('input', function () {
  pagePopulateSearchResults(this.value);
});

// Lazy load animation
function pageLazyLoad(container = document) {
  const cards = container.querySelectorAll('.page-tool-card');
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(25px)';
    card.style.transition = 'none';
    card.classList.remove('visible');
  });
  cards.forEach((card, i) => {
    setTimeout(() => {
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
      card.classList.add('visible');
    }, i * 100);
  });
}
