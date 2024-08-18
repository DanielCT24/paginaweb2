document.addEventListener("DOMContentLoaded", () => {
    const fadeElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Deja de observar el elemento una vez que ha aparecido
            }
        });
    }, { threshold: 0.2 }); // Aplica la animación cuando el 20% del elemento es visible

    fadeElements.forEach(element => observer.observe(element));
});