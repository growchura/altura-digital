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