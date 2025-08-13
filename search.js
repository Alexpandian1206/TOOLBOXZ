function openSearch() {
  document.getElementById('searchOverlay').classList.add('active');
  document.getElementById('toolSearchInput').focus();
}

function closeSearch() {
  document.getElementById('searchOverlay').classList.remove('active');
  document.getElementById('toolSearchResults').innerHTML = '';
}

function outsideClick(e) {
  if (e.target.id === 'searchOverlay') closeSearch();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeSearch();
});

const searchInput = document.getElementById('toolSearchInput');
const resultsContainer = document.getElementById('toolSearchResults');

// Example tools list (replace with yours)
const tools = [
  { name: "Word to PDF Converter", link: "word-to-pdf.html", icon: "images/word-to-pdf.png" },
  { name: "PDF to Word Converter", link: "pdf-to-word.html", icon: "images/pdf-to-word.png" },
  { name: "JPEG to PNG Converter", link: "jpeg-to-png.html", icon: "images/jpeg-to-png.png" },
  { name: "YouTube to MP3 Converter", link: "youtube-to-mp3.html", icon: "images/youtube-to-mp3.png" },
  { name: "Word Counter Tool", link: "word-counter.html", icon: "images/word-counter.png" },
  { name: "HTML Beautifier", link: "html-beautifier.html", icon: "images/html-beautifier.png" }
];

searchInput.addEventListener('input', function () {
  const query = this.value.trim().toLowerCase();
  resultsContainer.innerHTML = '';

  if (query === '') return;

  const filtered = tools.filter(tool => tool.name.toLowerCase().includes(query));

  if (filtered.length === 0) {
    resultsContainer.innerHTML = '<div class="no-results">No tools found...</div>';
    return;
  }

  filtered.forEach(tool => {
    const card = document.createElement('a');
    card.href = tool.link;
    card.className = 'tool-card';
    card.innerHTML = `<img src="${tool.icon}" alt="${tool.name}"><span>${tool.name}</span>`;
    resultsContainer.appendChild(card);
  });
});
