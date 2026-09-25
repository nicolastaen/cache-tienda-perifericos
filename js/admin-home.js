// admin-home.js — protege la página y muestra los totales en las tarjetas

const sesion = protegerPaginaAdmin();

if (sesion) {
    document.getElementById('nombre-usuario').textContent = sesion.nombre || sesion.rol;

    const productos = JSON.parse(localStorage.getItem('cache_admin_productos') || '[]');
    const usuarios = JSON.parse(localStorage.getItem('cache_usuarios') || '[]');

    document.getElementById('total-productos').textContent = productos.length;
    document.getElementById('total-usuarios').textContent = usuarios.length;

    const conStockCritico = productos.filter(p =>
        p.stockCritico !== '' && p.stockCritico !== undefined && Number(p.stock) <= Number(p.stockCritico)
    ).length;
    document.getElementById('total-stock-critico').textContent = conStockCritico;
}

document.getElementById('btn-cerrar-sesion').addEventListener('click', (e) => {
    e.preventDefault();
    cerrarSesion();
});
