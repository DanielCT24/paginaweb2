document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchBar');
    const productCards = document.querySelectorAll('.card__trust');
    let products = [];

    // Recolectar los datos de los productos
    productCards.forEach(card => {
        products.push({
            id: card.getAttribute('data-product-id'),
            name: card.querySelector('h2').textContent.trim(),
            price: card.querySelector('.precio').textContent.trim(),
            element: card // Guardamos la referencia al elemento del DOM
        });
    });

    // Configurar Fuse.js
    const fuse = new Fuse(products, {
        keys: ['name'], // Buscar solo en el nombre
        threshold: 0.4, // Ajusta la tolerancia. Menor es más estricto, mayor es más permisivo
        distance: 100 // Ajusta la importancia de la posición de coincidencia en el texto
    });

    // Manejar la búsqueda
    searchInput.addEventListener('input', function() {
        const query = searchInput.value.trim();

        // Si no hay nada escrito, mostrar todos los productos
        if (!query) {
            productCards.forEach(card => card.style.display = 'block');
            return;
        }

        // Obtener los resultados de la búsqueda con Fuse.js
        const results = fuse.search(query);

        // Mostrar solo los productos que coinciden
        productCards.forEach(card => card.style.display = 'none'); // Ocultar todos los productos
        results.forEach(result => result.item.element.style.display = 'block'); // Mostrar los productos coincidentes
    });
});
