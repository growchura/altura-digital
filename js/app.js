/* ==========================================
   ALTURA DIGITAL
   MODO OSCURO / CLARO
========================================== */

const themeBtn = document.getElementById("themeToggle");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const icon = themeBtn.querySelector("i");

    if(document.body.classList.contains("light")){
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    }else{
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    }

});

/* ==========================================
   ANIMACIONES AL HACER SCROLL
========================================== */

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }

    });

},{
    threshold:0.15
});

document.querySelectorAll(".card").forEach(card => {
    observer.observe(card);
});

/* ==========================================
   EFECTO HERO
========================================== */

window.addEventListener("scroll", () => {

    const hero = document.querySelector(".hero-image img");

    if(hero){

        const y = window.scrollY * 0.05;

        hero.style.transform = `translateY(${y}px)`;

    }

});
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".navlinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// ==========================================
// CONTACTO - FUNCIONALIDADES INTERACTIVAS
// ==========================================

// WhatsApp - Abre chat directo
const whatsappBtn = document.getElementById("whatsappContactBtn");
if (whatsappBtn) {
    whatsappBtn.addEventListener("click", () => {
        window.open("https://wa.me/59177765616?text=Hola%20Altura%20Digital,%20me%20interesa%20sus%20servicios", "_blank");
    });
}

// Email - Abre cliente de correo
const emailBtn = document.getElementById("emailContactBtn");
if (emailBtn) {
    emailBtn.addEventListener("click", () => {
        window.location.href = "mailto:growerchura64@gmail.com?subject=Consulta%20sobre%20servicios%20Altura%20Digital&body=Hola,%20me%20gustaría%20recibir%20más%20información...";
    });
}

// Ubicación - Muestra alerta o mapa
const locationBtn = document.getElementById("locationContactBtn");
if (locationBtn) {
    locationBtn.addEventListener("click", () => {
        // Puedes cambiar esto por un modal con mapa de Google Maps
        alert("📍 La Paz, Bolivia - Zona Sopocachi\n\nEstamos ubicados en el corazón tecnológico de La Paz. ¡Contáctanos para visitarnos!");
    });
}

// Redes Sociales - Funcionalidad
const facebookBtn = document.getElementById("fbMock");
if (facebookBtn) {
    facebookBtn.addEventListener("click", (e) => {
        e.preventDefault();
        alert("👍 Síguenos en Facebook: @alturadigital. ¡Pronto más contenido!");
        // window.open("https://facebook.com/tupagina", "_blank"); // Descomenta cuando tengas el link
    });
}

const instagramBtn = document.getElementById("igMock");
if (instagramBtn) {
    instagramBtn.addEventListener("click", (e) => {
        e.preventDefault();
        alert("📸 Instagram: @alturadigital. Pronto subiremos nuestros proyectos!");
        // window.open("https://instagram.com/tucuenta", "_blank");
    });
}

const linkedinBtn = document.getElementById("linkedinMock");
if (linkedinBtn) {
    linkedinBtn.addEventListener("click", (e) => {
        e.preventDefault();
        alert("💼 LinkedIn: Conecta con Altura Digital para networking profesional.");
        // window.open("https://linkedin.com/company/tupagina", "_blank");
    });
}

const githubBtn = document.getElementById("githubMock");
if (githubBtn) {
    githubBtn.addEventListener("click", (e) => {
        e.preventDefault();
        alert("🐙 GitHub: Nuestros proyectos open source pronto estarán disponibles.");
        // window.open("https://github.com/tuusuario", "_blank");
    });
}

// Efecto de copiar email al hacer clic en el texto
const emailSpan = document.querySelector("#emailContactBtn .contact-card-content span");
if (emailSpan) {
    emailSpan.addEventListener("click", (e) => {
        e.stopPropagation();
        const email = "growerchura64@gmail.com";
        navigator.clipboard.writeText(email).then(() => {
            // Mostrar notificación flotante
            const toast = document.createElement("div");
            toast.textContent = "📧 Email copiado al portapapeles";
            toast.style.position = "fixed";
            toast.style.bottom = "80px";
            toast.style.right = "20px";
            toast.style.background = "var(--primary)";
            toast.style.color = "white";
            toast.style.padding = "10px 20px";
            toast.style.borderRadius = "30px";
            toast.style.zIndex = "9999";
            toast.style.fontSize = "0.9rem";
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 2000);
        });
    });
}

// ==========================================
// PROYECTOS - SISTEMA COMPLETO
// ==========================================

// 1. Sistema de expansión/contracción
const projectCards = document.querySelectorAll('.project-card');
const expandBtns = document.querySelectorAll('.project-expand-btn');

function closeAllProjects() {
    projectCards.forEach(card => {
        card.classList.remove('active');
    });
}

expandBtns.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = btn.closest('.project-card');
        
        // Si la tarjeta ya está activa, la cerramos
        if (card.classList.contains('active')) {
            card.classList.remove('active');
            btn.innerHTML = '<i class="fa-solid fa-chevron-down"></i> Ver más';
        } else {
            // Cerramos todas y abrimos la actual
            closeAllProjects();
            card.classList.add('active');
            btn.innerHTML = '<i class="fa-solid fa-chevron-up"></i> Ver menos';
        }
    });
});

// 2. Sistema de filtrado por categorías
const filterBtns = document.querySelectorAll('.filter-btn');
const allProjects = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Actualizar botón activo
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        // Filtrar proyectos con animación
        allProjects.forEach((project, index) => {
            // Añadir retraso para animación escalonada
            setTimeout(() => {
                if (filterValue === 'all' || project.getAttribute('data-category') === filterValue) {
                    project.style.display = 'block';
                    project.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    project.style.display = 'none';
                }
            }, index * 50);
        });
        
        // Cerrar todos los proyectos expandidos al filtrar
        closeAllProjects();
        expandBtns.forEach(btn => {
            btn.innerHTML = '<i class="fa-solid fa-chevron-down"></i> Ver más';
        });
    });
});

// 3. Botón "Ver detalles" en el overlay
const verMasBtns = document.querySelectorAll('.ver-mas');
verMasBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = btn.closest('.project-card');
        const expandBtn = card.querySelector('.project-expand-btn');
        
        if (!card.classList.contains('active')) {
            closeAllProjects();
            card.classList.add('active');
            expandBtn.innerHTML = '<i class="fa-solid fa-chevron-up"></i> Ver menos';
            
            // Scroll suave hasta el proyecto
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
});

// 4. Modal de detalles (opcional - para vista más amplia)
const modalDetalles = document.createElement('div');
modalDetalles.className = 'project-modal';
modalDetalles.innerHTML = `
    <div class="project-modal-content">
        <span class="close-modal">&times;</span>
        <div class="project-modal-body"></div>
    </div>
`;
document.body.appendChild(modalDetalles);

// Estilos para el modal (agregar al CSS)
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .project-modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 3000;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(5px);
    }
    
    .project-modal-content {
        background: var(--dark2);
        max-width: 600px;
        width: 90%;
        border-radius: 20px;
        position: relative;
        max-height: 80vh;
        overflow-y: auto;
        animation: fadeInUp 0.3s;
    }
    
    .project-modal-content .close-modal {
        position: sticky;
        top: 10px;
        right: 20px;
        float: right;
        font-size: 2rem;
        cursor: pointer;
        z-index: 1;
    }
    
    .project-modal-body {
        padding: 30px;
    }
`;
document.head.appendChild(modalStyles);

// Función para abrir modal con detalles del proyecto
function openProjectModal(projectId) {
    const project = document.querySelector(`.project-card[data-project="${projectId}"]`);
    if (!project) return;
    
    const title = project.querySelector('.project-info h3').innerHTML;
    const description = project.querySelector('.project-info p').textContent;
    const techs = Array.from(project.querySelectorAll('.project-tech span')).map(span => span.textContent);
    const details = project.querySelector('.project-details p').textContent;
    const stats = project.querySelectorAll('.stat');
    const imageSrc = project.querySelector('.project-image img').src;
    
    const modalBody = modalDetalles.querySelector('.project-modal-body');
    modalBody.innerHTML = `
        <img src="${imageSrc}" alt="${title}" style="width: 100%; border-radius: 12px; margin-bottom: 20px;">
        <h2>${title}</h2>
        <p style="margin: 15px 0;">${description}</p>
        <div class="project-tech" style="margin: 15px 0;">
            ${techs.map(tech => `<span>${tech}</span>`).join('')}
        </div>
        <p><strong>Detalles completos:</strong> ${details}</p>
        <div class="project-stats" style="margin: 20px 0;">
            ${Array.from(stats).map(stat => `
                <div class="stat">
                    ${stat.innerHTML}
                </div>
            `).join('')}
        </div>
        <div class="project-links">
            <a href="#" class="project-link"><i class="fa-brands fa-github"></i> Ver repositorio</a>
            <a href="#" class="project-link"><i class="fa-solid fa-eye"></i> Ver demo</a>
        </div>
    `;
    
    modalDetalles.style.display = 'flex';
}

// Agregar evento a los botones "Ver detalles" para abrir modal
verMasBtns.forEach(btn => {
    const originalClick = btn.onclick;
    btn.onclick = (e) => {
        e.stopPropagation();
        const projectId = btn.getAttribute('data-project');
        openProjectModal(projectId);
    };
});

// Cerrar modal
const closeModalBtn = modalDetalles.querySelector('.close-modal');
closeModalBtn.addEventListener('click', () => {
    modalDetalles.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modalDetalles) {
        modalDetalles.style.display = 'none';
    }
});

// 5. Animación de entrada escalonada
const observerProjects = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            observerProjects.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

allProjects.forEach(project => {
    project.style.opacity = '0';
    project.style.transform = 'translateY(30px)';
    project.style.transition = 'all 0.5s ease';
    observerProjects.observe(project);
});

// 6. Efecto hover en tecnologías del proyecto
const projectTechs = document.querySelectorAll('.project-tech span');
projectTechs.forEach(tech => {
    tech.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.2s';
    });
    tech.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

console.log('🚀 Sistema de proyectos mejorado cargado correctamente');

// ==========================================
// LOGO Y NAVEGACIÓN PRINCIPAL
// ==========================================

// Función para scroll suave al inicio
function scrollToInicio() {
    const inicioSection = document.getElementById('inicio');
    if (inicioSection) {
        inicioSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Opcional: Cambiar la URL sin recargar
        history.pushState(null, null, '#inicio');
    }
}

// Evento para el logo completo (imagen + texto)
const logoHomeBtn = document.getElementById('logoHomeBtn');
if (logoHomeBtn) {
    logoHomeBtn.addEventListener('click', scrollToInicio);
}

// También asegurar que el span dentro del logo funcione
const logoSpan = document.querySelector('.logo span');
if (logoSpan) {
    logoSpan.addEventListener('click', scrollToInicio);
}

// Opcional: Si también quieres que la imagen sola funcione
const logoImg = document.querySelector('.logo img');
if (logoImg) {
    logoImg.addEventListener('click', scrollToInicio);
}

// Verificar en consola que funciona
console.log('✅ Logo configurado - Al hacer clic irá al inicio');

logoHomeBtn.addEventListener("click", () => {
    // Animación de rebote al logo
    logoHomeBtn.style.transform = "scale(0.95)";
    setTimeout(() => {
        logoHomeBtn.style.transform = "scale(1)";
    }, 200);
    
    // Scroll al inicio
    document.getElementById("inicio").scrollIntoView({ 
        behavior: "smooth",
        block: "start"
    });
});