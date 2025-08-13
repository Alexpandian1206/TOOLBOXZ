document.addEventListener('DOMContentLoaded', function() {
    const openBtn = document.getElementById('searchOpenBtn');
    const overlay = document.getElementById('searchOverlay');
    const input = document.getElementById('searchInput');
    const results = document.getElementById('searchResults');

    // Example tool list - replace with your real data
    const tools = [
        { name: 'Tool 1', link: '#', img: 'https://via.placeholder.com/60' },
        { name: 'Tool 2', link: '#', img: 'https://via.placeholder.com/60' },
        { name: 'Premium Tool', link: '#', img: 'https://via.placeholder.com/60' }
    ];

    // Open overlay
    openBtn.addEventListener('click', () => {
        overlay.classList.add('active');
        input.focus();
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
                card.innerHTML = `<img src="${tool.img}" alt="${tool.name}"><span>${tool.name}</span>`;
                results.appendChild(card);
            });
        }
    }

    // Live search
    input.addEventListener('input', function() {
        populateResults(this.value);
    });
});
