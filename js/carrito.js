const CARRITO_KEY = 'cache_carrito';

function obtenerCarrito() {
    const data = localStorage.getItem(CARRITO_KEY);
    return data ? JSON.parse(data) : [];
}

function guardarCarrito(carrito) {
    localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito));
    actualizarContadorCarrito();
}

function agregarAlCarrito(producto) {
    const carrito = obtenerCarrito();
    const existente = carrito.find(item => item.id === producto.id);

    if (existente) {
        existente.cantidad += producto.cantidad || 1;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: producto.cantidad || 1
        });
    }

    guardarCarrito(carrito);
}
function actualizarCantidad(id, nuevaCantidad) {
    let carrito = obtenerCarrito();

    if (nuevaCantidad <= 0) {
        carrito = carrito.filter(item => item.id !== id);
    } else {
        const item = carrito.find(item => item.id === id);
        if (item) item.cantidad = nuevaCantidad;
    }

    guardarCarrito(carrito);
    if (typeof renderizarCarrito === 'function') renderizarCarrito();
}

function eliminarDelCarrito(id) {
    const carrito = obtenerCarrito().filter(item => item.id !== id);
    guardarCarrito(carrito);
    if (typeof renderizarCarrito === 'function') renderizarCarrito();
}

function calcularTotalCarrito() {
    return obtenerCarrito().reduce((total, item) => total + (item.precio * item.cantidad), 0);
}
function contarUnidadesCarrito() {
    return obtenerCarrito().reduce((total, item) => total + item.cantidad, 0);
}

function actualizarContadorCarrito() {
    const contador = document.getElementById('contador-carrito');
    if (contador) {
        contador.textContent = contarUnidadesCarrito();
    }
}

function formatearPrecio(valor) {
    return '$' + valor.toLocaleString('es-CL');
}

document.addEventListener('DOMContentLoaded', actualizarContadorCarrito);
