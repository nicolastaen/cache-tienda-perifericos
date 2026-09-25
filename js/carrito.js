// carrito.js — módulo reutilizable del carrito de compras
// Se incluye en TODAS las páginas que necesiten leer, agregar o mostrar el carrito
// (categoria.html, producto.html, carrito.html, y el header con el contador)

const CARRITO_KEY = 'cache_carrito';

// ---- Funciones base de lectura/escritura en localStorage ----

function obtenerCarrito() {
    const data = localStorage.getItem(CARRITO_KEY);
    return data ? JSON.parse(data) : [];
}

function guardarCarrito(carrito) {
    localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito));
    actualizarContadorCarrito();
}

// ---- Agregar un producto al carrito ----
// Si el producto ya existe (mismo id), solo suma la cantidad.
function agregarAlCarrito(producto) {
    // producto = { id, nombre, precio, imagen, cantidad }
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

// ---- Cambiar la cantidad de un producto ya en el carrito ----
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

// ---- Eliminar un producto del carrito ----
function eliminarDelCarrito(id) {
    const carrito = obtenerCarrito().filter(item => item.id !== id);
    guardarCarrito(carrito);
    if (typeof renderizarCarrito === 'function') renderizarCarrito();
}

// ---- Calcular el total ----
function calcularTotalCarrito() {
    return obtenerCarrito().reduce((total, item) => total + (item.precio * item.cantidad), 0);
}

// ---- Contar unidades totales (para el ícono del carrito en el header) ----
function contarUnidadesCarrito() {
    return obtenerCarrito().reduce((total, item) => total + item.cantidad, 0);
}

// ---- Actualiza cualquier elemento con id="contador-carrito" en la página actual ----
function actualizarContadorCarrito() {
    const contador = document.getElementById('contador-carrito');
    if (contador) {
        contador.textContent = contarUnidadesCarrito();
    }
}

function formatearPrecio(valor) {
    return '$' + valor.toLocaleString('es-CL');
}

// Al cargar cualquier página que incluya este script, actualiza el contador del header
document.addEventListener('DOMContentLoaded', actualizarContadorCarrito);
