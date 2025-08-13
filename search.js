function searchOpenOverlay() {
  document.getElementById('searchOverlay').classList.add('active');
  document.getElementById('searchInput').focus();
}

function searchCloseOverlay() {
  document.getElementById('searchOverlay').classList.remove('active');
  document.getElementById('searchResults').innerHTML = '';
}

function searchOutsideClick(e) {
  if (e.target.id === 'searchOverlay') searchCloseOverlay();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') searchCloseOverlay();
});

const searchInputEl = document.getElementById('searchInput');
const searchResultsEl = document.getElementById('searchResults');

// Example tools list (replace with yours)
const searchToolsList = [
  { name: "Word to PDF Converter", link: "word-to-pdf.html", icon: "images/word-to-pdf.png" },
  { name: "PDF to Word Converter", link: "pdf-to-word.html", icon: "images/pdf-to-word.png" },
  { name: "JPEG to PNG Converter", link: "jpeg-to-png.html", icon: "images/jpeg-to-png.png" },
  { name: "YouTube to MP3 Converter", link: "youtube-to-mp3.html", icon: "images/youtube-to-mp3.png" },
  { name: "Word Counter Tool", link: "word-counter.html", icon: "images/word-counter.png" },
  { name: "HTML Beautifier", link: "html-beautifier.html", icon: "images/html-beautifier.png" }
];

searchInputEl.addEventListener('input', function () {
  const query = this.value.trim().toLowerCase();
  searchResultsEl.innerHTML = '';

  if (query === '') return;

  const filtered = searchToolsList.filter(tool => tool.name.toLowerCase().includes(query));

  if (filtered.length === 0) {
    searchResultsEl.innerHTML = '<div class="search-no-results">No tools found...</div>';
    return;
  }

  filtered.forEach(tool => {
    const card = document.createElement('a');
    card.href = tool.link;
    card.className = 'search-tool-card';
    card.innerHTML = `<img src="${tool.icon}" alt="${tool.name}"><span>${tool.name}</span>`;
    searchResultsEl.appendChild(card);
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const searchIcon = document.querySelector('.search-icon');
  if (searchIcon) {
    searchIcon.addEventListener('click', function() {
      openSearch(); // Call your existing function
    });
  }
});
