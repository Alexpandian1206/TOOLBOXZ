document.addEventListener('DOMContentLoaded', function() {
    const openBtn = document.getElementById('searchOpenBtn');
    const overlay = document.getElementById('searchOverlay');
    const input = document.getElementById('searchInput');
    const results = document.getElementById('searchResults');

    // Demo tools data
    const tools = [
        { name: 'SEO Analyzer', link: '#' },
        { name: 'Image Compressor', link: '#' },
        { name: 'Content Writer', link: '#' },
        { name: 'Backlink Checker', link: '#' }
    ];

    // Open overlay
    openBtn.addEventListener('click', () => {
        overlay.classList.add('active');
        setTimeout(() => input.focus(), 300);
        populateResults('');
    });

    // Close overlay on outside click
    overlay.addEventListener('click', e => {
        if (e.target === overlay) overlay.classList.remove('active');
    });

    // Close overlay on Escape
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') overlay.classList.remove('active');
    });

    // Populate results
    function populateResults(query) {
        results.innerHTML = '';
        const filter = query.toLowerCase();
        const filtered = tools.filter(t => t.name.toLowerCase().includes(filter));

        if (filtered.length === 0) {
            results.innerHTML = `<p class="search-no-results">No tools found...</p>`;
        } else {
            filtered.forEach(tool => {
                const card = document.createElement('a');
                card.href = tool.link;
                card.className = 'search-tool-card';
                card.textContent = tool.name;
                results.appendChild(card);
            });
        }
    }

    // Search input listener
    input.addEventListener('input', function() {
        populateResults(this.value);
    });
});
