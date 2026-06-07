  
    let selectedTipo = null;
    let selectedComplejidad = null;
    let selectedExtras = new Set();
    let basePrice = 0;
    let maxPrice = 0;
    let tiempoEstimado = '';

    // TIPO
    document.querySelectorAll('#tipoGrid .opt').forEach(opt => {
      opt.addEventListener('click', () => {
        document.querySelectorAll('#tipoGrid .opt').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        selectedTipo = opt.dataset.tipo;
        basePrice = parseInt(opt.dataset.base);
        maxPrice = parseInt(opt.dataset.max);
        tiempoEstimado = opt.dataset.tiempo;
        selectedComplejidad = null;
        selectedExtras.clear();
        document.querySelectorAll('#complejidadGrid .opt').forEach(o => o.classList.remove('selected'));
        document.querySelectorAll('.extra').forEach(o => o.classList.remove('selected'));
        document.getElementById('stepComplejidad').style.display = 'block';
        document.getElementById('stepExtras').style.display = 'none';
        updateResult();
      });
    });

    // COMPLEJIDAD
    document.querySelectorAll('#complejidadGrid .opt').forEach(opt => {
      opt.addEventListener('click', () => {
        document.querySelectorAll('#complejidadGrid .opt').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        selectedComplejidad = parseFloat(opt.dataset.mult);
        document.getElementById('stepExtras').style.display = 'block';
        updateResult();
      });
    });

    // EXTRAS
    document.querySelectorAll('.extra').forEach(extra => {
      extra.addEventListener('click', () => {
        extra.classList.toggle('selected');
        const key = extra.dataset.extra;
        if (selectedExtras.has(key)) selectedExtras.delete(key);
        else selectedExtras.add(key);
        updateResult();
      });
    });

    function calcExtras() {
      let total = 0;
      document.querySelectorAll('.extra.selected').forEach(e => {
        total += parseInt(e.dataset.price);
      });
      return total;
    }

    function formatBs(n) {
      return 'Bs. ' + n.toLocaleString('es-BO');
    }

    function updateResult() {
      if (!selectedTipo) return;

      const extras = calcExtras();
      let precio = basePrice;
      let precioMax = maxPrice;

      if (selectedComplejidad) {
        precio = Math.round(basePrice * selectedComplejidad);
        precioMax = Math.round(basePrice * selectedComplejidad * 1.3);
      }

      precio += extras;
      precioMax += extras;

      const breakdown = buildBreakdown(extras);

      document.getElementById('resultBox').innerHTML = `
        <div class="result-box">
          <div class="result-label">estimación de tu proyecto</div>
          <div class="result-price">
            <span class="result-currency">Bs.</span>
            <span class="price-animated">${precio.toLocaleString('es-BO')}</span>
            ${selectedComplejidad ? `<span style="font-size:0.9rem;opacity:0.5"> — ${precioMax.toLocaleString('es-BO')}</span>` : ''}
          </div>
          <div class="result-breakdown">${breakdown}</div>
          <div class="result-time">⏱️ Tiempo estimado: <span style="color:var(--primary)">${tiempoEstimado}</span></div>
          <div class="calc-cta">
            <a href="${buildWALink(precio, precioMax)}" target="_blank" class="btn-wa">
              💬 Cotizar por WhatsApp
            </a>
            <button class="btn-reset" onclick="resetCalc()">↺ Reset</button>
          </div>
        </div>
      `;
    }

    function buildBreakdown(extras) {
      const tipoLabel = document.querySelector('#tipoGrid .opt.selected .opt-name')?.textContent || '';
      const compLabel = document.querySelector('#complejidadGrid .opt.selected .opt-name')?.textContent || '';
      let html = '';
      if (tipoLabel) html += `<span>${tipoLabel}</span> seleccionado<br>`;
      if (compLabel) html += `Nivel <span>${compLabel}</span><br>`;
      if (extras > 0) html += `Extras: <span>+Bs. ${extras.toLocaleString('es-BO')}</span><br>`;
      html += `<span style="color:var(--gray);font-size:0.65rem">* Precio referencial. El costo final depende de los requerimientos.</span>`;
      return html;
    }

    function buildWALink(min, max) {
      const tipo = document.querySelector('#tipoGrid .opt.selected .opt-name')?.textContent || '';
      const comp = document.querySelector('#complejidadGrid .opt.selected .opt-name')?.textContent || '';
      const extras = Array.from(document.querySelectorAll('.extra.selected .extra-name')).map(e => e.textContent).join(', ');
      const msg = `Hola Altura Digital! 👋\n\nQuiero cotizar:\n📌 Servicio: ${tipo}\n⚡ Nivel: ${comp}\n✅ Extras: ${extras || 'Ninguno'}\n💰 Estimado: Bs. ${min.toLocaleString('es-BO')} - ${max.toLocaleString('es-BO')}\n\nMe pueden dar más información?`;
      return `https://wa.me/59177765616?text=${encodeURIComponent(msg)}`;
    }

    function resetCalc() {
      selectedTipo = null;
      selectedComplejidad = null;
      selectedExtras.clear();
      document.querySelectorAll('.opt').forEach(o => o.classList.remove('selected'));
      document.querySelectorAll('.extra').forEach(o => o.classList.remove('selected'));
      document.getElementById('stepComplejidad').style.display = 'none';
      document.getElementById('stepExtras').style.display = 'none';
      document.getElementById('resultBox').innerHTML = `
        <div class="result-placeholder">
          <span class="emoji">👆</span>
          Seleccioná un servicio para ver el precio estimado
        </div>`;
    }

    function enviarWA() {
      const nombre = document.getElementById('nombre').value.trim();
      const contacto = document.getElementById('contacto').value.trim();
      const mensaje = document.getElementById('mensaje').value.trim();
      if (!nombre || !contacto || !mensaje) {
        alert('Por favor completá todos los campos.');
        return;
      }
      const msg = `Hola Altura Digital! 👋\n\nSoy *${nombre}*\nContacto: ${contacto}\n\n${mensaje}`;
      window.open(`https://wa.me/59177765616?text=${encodeURIComponent(msg)}`, '_blank');
    }
  