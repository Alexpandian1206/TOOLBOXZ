
  function toggleSidebar(){document.getElementById('sidebar').classList.toggle('active');}
  const toolCards=[...document.querySelectorAll('.tool-card')];
  const allGrid=document.getElementById('allToolsGrid');

  function populateAllTools(){
    allGrid.innerHTML='';
    const shuffled=[...toolCards].sort(()=>Math.random()-0.5);
    shuffled.forEach(card=>{
      const clone=card.cloneNode(true);
      allGrid.appendChild(clone);
    });
    lazyLoad();
  }

  function showSection(id,el){
    document.querySelectorAll('.container').forEach(sec=>sec.classList.remove('active'));
    document.getElementById(id).classList.add('active');

    // Highlight active bubble
    document.querySelectorAll('.bubble-menu button').forEach(b=>b.classList.remove('active'));
    if(el && el.tagName==='BUTTON') el.classList.add('active');

    // Highlight active sidebar
    document.querySelectorAll('.sidebar ul li').forEach(li=>li.classList.remove('active'));
    if(el && el.tagName==='LI') el.classList.add('active');

    if(id==='all') populateAllTools();
    window.scrollTo({top:0,behavior:'smooth'});
  }

  function openSearch(){
    document.getElementById('searchOverlay').classList.add('active');
    document.getElementById('overlaySearchInput').focus();
    populateSearchResults('');
  }
  function closeSearch(){document.getElementById('searchOverlay').classList.remove('active');}
  function outsideClick(e){if(e.target.id==='searchOverlay') closeSearch();}
  document.addEventListener('keydown',e=>{if(e.key==='Escape') closeSearch();});

  const overlaySearchInput=document.getElementById('overlaySearchInput');
  const searchResults=document.getElementById('searchResults');
  function populateSearchResults(query){
    searchResults.innerHTML='';
    const filter=query.toLowerCase();
    const filtered=toolCards.filter(card=>card.innerText.toLowerCase().includes(filter));
    if(filtered.length===0){searchResults.innerHTML='<p style="grid-column:1/-1;color:#666;">No tools found...</p>';}
    else{filtered.forEach(card=>searchResults.appendChild(card.cloneNode(true)));}
    lazyLoad();
  }
  overlaySearchInput.addEventListener('input',function(){populateSearchResults(this.value);});

  // Lazy load animation
  function lazyLoad(){
    document.querySelectorAll('.tool-card').forEach((card,i)=>{
      setTimeout(()=>card.classList.add('visible'),i*100);
    });
  }
  
  // Close sidebar when clicking outside (Desktop & Mobile)
document.addEventListener('click', function (e) {
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.querySelector('.menu-btn'); // Updated class name

  if (sidebar.classList.contains('active') &&
      !sidebar.contains(e.target) &&
      !toggleBtn.contains(e.target)) {
    sidebar.classList.remove('active');
  }
});


  // Initial
  showSection('all',document.querySelector('.bubble-menu button'));
  
  // Dark Mode Toggle with Memory
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
}

// Load saved mode on page load
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }
});


  // Back to top button
  const backToTop = document.getElementById("backToTop");
  window.onscroll = () => {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      backToTop.style.display = "block";
    } else {
      backToTop.style.display = "none";
    }
  };
  function scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  // Add tags (example logic)
  document.querySelectorAll('.tool-card').forEach((card, index) => {
    const tag = document.createElement('div');
    tag.classList.add('tool-tag');
    tag.innerText = (index % 2 === 0) ? "NEW" : "FREE";
    card.appendChild(tag);
  });
  

  // Fake visit counter (demo only)
  document.querySelectorAll('.tool-card').forEach(card => {
    const counter = document.createElement('div');

    // Generate number between 50,000 and 99,999
    const views = Math.floor(Math.random() * 50000) + 50000;

    // Format like 75.2K
    const formattedViews = (views / 1000).toFixed(1) + 'K';

    // View count style
    counter.style.cssText = "position:absolute;bottom:8px;right:12px;font-size:12px;color:#999;";

    // Add 👁️ icon and count
    counter.innerHTML = `👁️ ${formattedViews}`;

    card.appendChild(counter);
  });
  
