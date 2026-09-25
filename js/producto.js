// producto.js — interacciones de la página de detalle de producto

// ---- Datos del producto actual (por ahora fijo, luego vendrá del backend) ----
const productoActual = {
    id: 'Mouse Gamer ATK Blazing Sky X1 V2 Air+',
    nombre: 'Mouse Gamer ATK Blazing Sky X1 V2 Air+',
    precio: 104.990,
    imagen: 'imagenes/mouse1.png'
};

// ---- Tabs (Descripción / Especificaciones / Opiniones) ----
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContenidos = document.querySelectorAll('.tab-contenido');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('activa'));
        tabContenidos.forEach(c => c.classList.remove('activa'));

        btn.classList.add('activa');
        document.getElementById(btn.dataset.tab).classList.add('activa');
    });
});

// ---- Galería de miniaturas ----
const miniaturas = document.querySelectorAll('.miniatura');
const imagenPrincipal = document.getElementById('imagen-principal');

miniaturas.forEach(mini => {
    mini.addEventListener('click', () => {
        miniaturas.forEach(m => m.classList.remove('activa'));
        mini.classList.add('activa');
        imagenPrincipal.src = mini.src;
    });
});

// ---- Selector de cantidad ----
const inputCantidad = document.getElementById('cantidad');
const btnRestar = document.getElementById('restar');
const btnSumar = document.getElementById('sumar');

btnSumar.addEventListener('click', () => {
    inputCantidad.value = parseInt(inputCantidad.value, 10) + 1;
});

btnRestar.addEventListener('click', () => {
    const actual = parseInt(inputCantidad.value, 10);
    if (actual > 1) inputCantidad.value = actual - 1;
});

// ---- Agregar al carrito ----
const btnAgregar = document.getElementById('btn-agregar');

btnAgregar.addEventListener('click', () => {
    const cantidad = parseInt(inputCantidad.value, 10) || 1;

    agregarAlCarrito({
        id: productoActual.id,
        nombre: productoActual.nombre,
        precio: productoActual.precio,
        imagen: productoActual.imagen,
        cantidad: cantidad
    });

    alert('Producto agregado al carrito.');
});
