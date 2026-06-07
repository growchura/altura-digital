
    // FILTERS
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        cards.forEach(card => {
          const match = filter === 'all' || card.dataset.category === filter;
          card.classList.toggle('hidden', !match);
        });
      });
    });

    // MODAL
    const overlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');

    cards.forEach(card => {
      const btn = card.querySelector('.card-btn');
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(card.dataset);
      });
      card.addEventListener('click', () => openModal(card.dataset));
    });

    function openModal(data) {
      document.getElementById('modalImg').src = data.img;
      document.getElementById('modalTitle').textContent = data.title;
      document.getElementById('modalDesc').textContent = data.desc;
      document.getElementById('modalDemo').href = data.demo || '#';
      document.getElementById('modalCode').href = data.code || '#';

      const stats = document.getElementById('modalStats');
      stats.innerHTML = `
        <div class="stat"><div class="stat-value">${data.stat1}</div><div class="stat-label">${data['stat1-label']}</div></div>
        <div class="stat"><div class="stat-value">${data.stat2}</div><div class="stat-label">${data['stat2-label']}</div></div>
        <div class="stat"><div class="stat-value">${data.stat3}</div><div class="stat-label">${data['stat3-label']}</div></div>
      `;

      const tags = document.getElementById('modalTags');
      tags.innerHTML = data.tags.split(',').map(t => `<span class="tag">${t.trim()}</span>`).join('');

      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
