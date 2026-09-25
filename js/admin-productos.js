// admin-productos.js — listado de productos del panel (localStorage: cache_admin_productos)

const PRODUCTOS_KEY = 'cache_admin_productos';
const sesion = protegerPaginaAdmin();

function obtenerProductos() {
    return JSON.parse(localStorage.getItem(PRODUCTOS_KEY) || '[]');
}

function guardarProductos(productos) {
    localStorage.setItem(PRODUCTOS_KEY, JSON.stringify(productos));
}

function formatearPrecioAdmin(valor) {
    return '$' + Number(valor).toLocaleString('es-CL');
}

function renderizarTablaProductos() {
    const cuerpo = document.getElementById('tabla-productos-body');
    const productos = obtenerProductos();

    if (productos.length === 0) {
        cuerpo.innerHTML = `<tr><td colspan="6" class="admin-tabla-vacia">Todavía no hay productos. Crea el primero con "+ Nuevo producto".</td></tr>`;
        return;
    }

    cuerpo.innerHTML = productos.map(p => {
        const stockBajo = p.stockCritico !== '' && p.stockCritico !== undefined && Number(p.stock) <= Number(p.stockCritico);
        return `
            <tr>
                <td>${p.codigo}</td>
                <td>${p.nombre}</td>
                <td>${formatearPrecioAdmin(p.precio)}</td>
                <td>${p.stock} ${stockBajo ? '<span class="admin-badge-stock-critico">Stock crítico</span>' : ''}</td>
                <td>${p.categoria}</td>
                <td>
                    <button type="button" class="admin-accion-btn btn-editar-producto" data-codigo="${p.codigo}" title="Editar">✏️</button>
                    <button type="button" class="admin-accion-btn btn-eliminar-producto" data-codigo="${p.codigo}" title="Eliminar">🗑️</button>
                </td>
            </tr>
        `;
    }).join('');

    cuerpo.querySelectorAll('.btn-editar-producto').forEach(btn => {
        btn.addEventListener('click', () => {
            window.location.href = 'producto-form.html?codigo=' + encodeURIComponent(btn.dataset.codigo);
        });
    });

    cuerpo.querySelectorAll('.btn-eliminar-producto').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!confirm('¿Eliminar este producto?')) return;
            const productos = obtenerProductos().filter(p => p.codigo !== btn.dataset.codigo);
            guardarProductos(productos);
            renderizarTablaProductos();
        });
    });
}

document.getElementById('btn-nuevo-producto').addEventListener('click', () => {
    window.location.href = 'producto-form.html';
});

document.getElementById('btn-cerrar-sesion').addEventListener('click', (e) => {
    e.preventDefault();
    cerrarSesion();
});

if (sesion) renderizarTablaProductos();
