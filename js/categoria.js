// categoria.js — colapsa/expande cada grupo de filtros al hacer clic en su título

const filtroHeaders = document.querySelectorAll('.filtro-header');

filtroHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const id = header.dataset.filtro;
        const contenido = document.getElementById(id);

        header.classList.toggle('colapsado');
        contenido.classList.toggle('oculto');
    });
});
