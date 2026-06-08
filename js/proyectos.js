
    // ========== PARTICULAS (si tienes particles.js, lo respetamos) ==========
    if (typeof tsParticles !== 'undefined') {
      tsParticles.load("particles-js", {
        particles: {
          number: { value: 50 },
          color: { value: "#00c2ff" },
          opacity: { value: 0.2 },
          size: { value: 2 },
          move: { enable: true, speed: 1 }
        }
      });
    }

    // ========== LÓGICA DE FILTROS Y MODAL CON DEMO ==========
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.card');
    const overlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const modalCloseDemo = document.getElementById('modalCloseDemo');
    const detailsView = document.getElementById('detailsView');
    const demoView = document.getElementById('demoView');
    const backToDetailsBtn = document.getElementById('backToDetailsBtn');
    const modalDemoBtn = document.getElementById('modalDemoBtn');
    const demoIframe = document.getElementById('demoIframe');

    let currentDemoUrl = '';

    // Filtros
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

    // Función para abrir modal con los datos de una card
    function openModal(data) {
      // Guardar URL del demo
      currentDemoUrl = data.demo;
      // Llenar campos de detalles
      document.getElementById('modalImg').src = data.img;
      document.getElementById('modalTitle').textContent = data.title;
      document.getElementById('modalDesc').textContent = data.desc;
      document.getElementById('modalCode').href = data.code || '#';

      // Estadísticas
      const stats = document.getElementById('modalStats');
      stats.innerHTML = `
        <div class="stat"><div class="stat-value">${data.stat1}</div><div class="stat-label">${data['stat1-label']}</div></div>
        <div class="stat"><div class="stat-value">${data.stat2}</div><div class="stat-label">${data['stat2-label']}</div></div>
        <div class="stat"><div class="stat-value">${data.stat3}</div><div class="stat-label">${data['stat3-label']}</div></div>
      `;

      // Tags
      const tags = document.getElementById('modalTags');
      tags.innerHTML = data.tags.split(',').map(t => `<span class="tag">${t.trim()}</span>`).join('');

      // Asegurar que se vea la vista de detalles y se oculte la del demo
      detailsView.style.display = 'block';
      demoView.style.display = 'none';
      // Limpiar iframe para que no siga cargando en segundo plano
      demoIframe.src = 'about:blank';

      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    // Evento "Ver demo" -> mostrar el iframe con la página indicada en data-demo
    modalDemoBtn.addEventListener('click', () => {
      if (currentDemoUrl && currentDemoUrl !== '#') {
        demoIframe.src = currentDemoUrl;
        detailsView.style.display = 'none';
        demoView.style.display = 'block';
      } else {
        alert('No hay una demo disponible para este proyecto.');
      }
    });

    // Volver a detalles desde el demo
    backToDetailsBtn.addEventListener('click', () => {
      detailsView.style.display = 'block';
      demoView.style.display = 'none';
      demoIframe.src = 'about:blank'; // opcional: detener carga
    });

    // Cerrar modal (ambos botones de cierre)
    function closeModal() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
      // Restaurar vista a detalles por si se cierra estando en demo
      detailsView.style.display = 'block';
      demoView.style.display = 'none';
      demoIframe.src = 'about:blank';
    }
    modalClose.addEventListener('click', closeModal);
    modalCloseDemo.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

    // Asignar eventos a cada tarjeta
    cards.forEach(card => {
      const btn = card.querySelector('.card-btn');
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(card.dataset);
      });
      card.addEventListener('click', () => openModal(card.dataset));
    });