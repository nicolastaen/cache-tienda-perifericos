// admin-producto-form.js — crea o edita un producto, con las validaciones exactas del anexo

const PRODUCTOS_KEY = 'cache_admin_productos';
const sesion = protegerPaginaAdmin();

const inputCodigo = document.getElementById('codigo');
const inputNombre = document.getElementById('nombre');
const inputDescripcion = document.getElementById('descripcion');
const inputPrecio = document.getElementById('precio');
const inputStock = document.getElementById('stock');
const inputStockCritico = document.getElementById('stock-critico');
const selectCategoria = document.getElementById('categoria');
const inputImagen = document.getElementById('imagen');
const formProducto = document.getElementById('form-producto');

// ---- Si viene ?codigo=X en la URL, estamos editando ----
const params = new URLSearchParams(window.location.search);
const codigoEditar = params.get('codigo');
let editando = false;

function obtenerProductos() {
    return JSON.parse(localStorage.getItem(PRODUCTOS_KEY) || '[]');
}

function guardarProductos(productos) {
    localStorage.setItem(PRODUCTOS_KEY, JSON.stringify(productos));
}

if (codigoEditar) {
    const productos = obtenerProductos();
    const producto = productos.find(p => p.codigo === codigoEditar);

    if (producto) {
        editando = true;
        document.getElementById('titulo-form').textContent = 'Editar producto';
        inputCodigo.value = producto.codigo;
        inputCodigo.disabled = true; // el código no se cambia una vez creado
        inputNombre.value = producto.nombre;
        inputDescripcion.value = producto.descripcion || '';
        inputPrecio.value = producto.precio;
        inputStock.value = producto.stock;
        inputStockCritico.value = producto.stockCritico || '';
        selectCategoria.value = producto.categoria;
        inputImagen.value = producto.imagen || '';
    }
}

// ---- Validaciones (reglas exactas del anexo) ----

function validarCodigo() {
    const valor = inputCodigo.value.trim();
    if (valor === '') { mostrarError(inputCodigo, 'El código es obligatorio.'); return false; }
    if (valor.length < 3) { mostrarError(inputCodigo, 'El código debe tener al menos 3 caracteres.'); return false; }

    // Si es un producto nuevo, el código no puede repetirse
    if (!editando) {
        const existe = obtenerProductos().some(p => p.codigo === valor);
        if (existe) { mostrarError(inputCodigo, 'Ya existe un producto con ese código.'); return false; }
    }

    ocultarError(inputCodigo);
    return true;
}

function validarNombre() {
    const valor = inputNombre.value.trim();
    if (valor === '') { mostrarError(inputNombre, 'El nombre es obligatorio.'); return false; }
    if (valor.length > 100) { mostrarError(inputNombre, 'Máximo 100 caracteres.'); return false; }
    ocultarError(inputNombre);
    return true;
}

function validarDescripcion() {
    // Opcional: solo se valida el largo si escribieron algo
    const valor = inputDescripcion.value.trim();
    if (valor.length > 500) { mostrarError(inputDescripcion, 'Máximo 500 caracteres.'); return false; }
    ocultarError(inputDescripcion);
    return true;
}

function validarPrecio() {
    const valor = inputPrecio.value;
    if (valor === '') { mostrarError(inputPrecio, 'El precio es obligatorio.'); return false; }
    if (Number(valor) < 0) { mostrarError(inputPrecio, 'El precio no puede ser negativo (0 = producto FREE).'); return false; }
    ocultarError(inputPrecio);
    return true;
}

function validarStock() {
    const valor = inputStock.value;
    if (valor === '') { mostrarError(inputStock, 'El stock es obligatorio.'); return false; }
    if (!Number.isInteger(Number(valor))) { mostrarError(inputStock, 'El stock debe ser un número entero.'); return false; }
    if (Number(valor) < 0) { mostrarError(inputStock, 'El stock no puede ser negativo.'); return false; }
    ocultarError(inputStock);
    return true;
}

function validarStockCritico() {
    const valor = inputStockCritico.value;
    if (valor === '') { ocultarError(inputStockCritico); return true; } // opcional
    if (!Number.isInteger(Number(valor))) { mostrarError(inputStockCritico, 'Debe ser un número entero.'); return false; }
    if (Number(valor) < 0) { mostrarError(inputStockCritico, 'No puede ser negativo.'); return false; }
    ocultarError(inputStockCritico);
    return true;
}

function validarCategoria() {
    if (selectCategoria.value === '') { mostrarError(selectCategoria, 'Selecciona una categoría.'); return false; }
    ocultarError(selectCategoria);
    return true;
}

// ---- Validación en tiempo real ----
inputCodigo.addEventListener('input', validarCodigo);
inputNombre.addEventListener('input', validarNombre);
inputDescripcion.addEventListener('input', validarDescripcion);
inputPrecio.addEventListener('input', validarPrecio);
inputStock.addEventListener('input', validarStock);
inputStockCritico.addEventListener('input', validarStockCritico);
selectCategoria.addEventListener('change', validarCategoria);

// ---- Guardar ----
formProducto.addEventListener('submit', function (e) {
    e.preventDefault();

    const valido = [
        validarCodigo(),
        validarNombre(),
        validarDescripcion(),
        validarPrecio(),
        validarStock(),
        validarStockCritico(),
        validarCategoria()
    ].every(r => r === true);

    if (!valido) return;

    const productoData = {
        codigo: inputCodigo.value.trim(),
        nombre: inputNombre.value.trim(),
        descripcion: inputDescripcion.value.trim(),
        precio: Number(inputPrecio.value),
        stock: Number(inputStock.value),
        stockCritico: inputStockCritico.value === '' ? '' : Number(inputStockCritico.value),
        categoria: selectCategoria.value,
        imagen: inputImagen.value.trim() || 'imagenes/mouse.png'
    };

    let productos = obtenerProductos();

    if (editando) {
        productos = productos.map(p => p.codigo === productoData.codigo ? productoData : p);
    } else {
        productos.push(productoData);
    }

    guardarProductos(productos);
    window.location.href = 'productos.html';
});

document.getElementById('btn-cerrar-sesion').addEventListener('click', (e) => {
    e.preventDefault();
    cerrarSesion();
});
