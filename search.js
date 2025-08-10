<script>
  const searchInput = document.getElementById('toolSearchInput');
  const resultsContainer = document.getElementById('toolSearchResults');
  const toolCards = Array.from(resultsContainer.querySelectorAll('.tool-card'));

  searchInput.addEventListener('input', function () {
    const query = this.value.trim().toLowerCase();
    let visibleCount = 0;

    toolCards.forEach(card => {
      if (card.textContent.toLowerCase().includes(query)) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (visibleCount === 0) {
      resultsContainer.innerHTML = '<div class="no-results">No tools found...</div>';
    } else {
      resultsContainer.innerHTML = '';
      toolCards.forEach(card => {
        if (card.style.display !== 'none') {
          resultsContainer.appendChild(card);
        }
      });
    }
  });
</script>
