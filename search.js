document.addEventListener('DOMContentLoaded', function() {
  const searchIcon = document.querySelector('.search-icon');
  const searchOverlay = document.getElementById('searchOverlay');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  // Your tool list
  const tools = [
    { name: 'Tool 1', link: '#', img: 'https://via.placeholder.com/60' },
    { name: 'Tool 2', link: '#', img: 'https://via.placeholder.com/60' },
    { name: 'Premium Tool', link: '#', img: 'https://via.placeholder.com/60' }
  ];

  // Open overlay
  searchIcon.addEventListener('click', () => {
    searchOverlay.classList.add('active');
    searchInput.focus();
    populateResults('');
  });

  // Close overlay on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') searchOverlay.classList.remove('active');
  });

  // Close overlay if clicking outside content
  searchOverlay.addEventListener('click', e => {
    if (e.target === searchOverlay) searchOverlay.classList.remove('active');
  });

  // Populate search results
  function populateResults(query) {
    searchResults.innerHTML = '';
    const filter = query.toLowerCase();
    const filtered = tools.filter(t => t.name.toLowerCase().includes(filter));

    if (filtered.length === 0) {
      searchResults.innerHTML = `<p class="search-no-results">No tools found...</p>`;
    } else {
      filtered.forEach(tool => {
        const card = document.createElement('a');
        card.href = tool.link;
        card.className = 'search-tool-card';
        card.innerHTML = `
          <img src="${tool.img}" alt="${tool.name}">
          <span>${tool.name}</span>
        `;
        searchResults.appendChild(card);
      });
    }
  }

  // Live search
  searchInput.addEventListener('input', function() {
    populateResults(this.value);
  });
});
