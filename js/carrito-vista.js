function renderizarCarrito() {
    const contenedor = document.getElementById('carrito-contenedor');
    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <div class="carrito-vacio">
                <p>Tu carrito está vacío.</p>
                <a href="categoria.html" class="btn-seguir-comprando">Ver productos</a>
            </div>
        `;
        return;
    }

    let filasHTML = '';

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;

        filasHTML += `
            <div class="carrito-item" data-id="${item.id}">
                <img src="${item.imagen}" alt="${item.nombre}" class="carrito-item-img">

                <div class="carrito-item-info">
                    <p class="carrito-item-nombre">${item.nombre}</p>
                    <p class="carrito-item-precio-unitario">${formatearPrecio(item.precio)} c/u</p>
                </div>

                <div class="carrito-item-cantidad">
                    <button type="button" class="btn-restar" data-id="${item.id}" data-cantidad="${item.cantidad}">−</button>
                    <input type="number" value="${item.cantidad}" min="1" class="input-cantidad" data-id="${item.id}">
                    <button type="button" class="btn-sumar" data-id="${item.id}" data-cantidad="${item.cantidad}">+</button>
                </div>

                <p class="carrito-item-subtotal">${formatearPrecio(subtotal)}</p>

                <button type="button" class="btn-eliminar" data-id="${item.id}" title="Eliminar">✕</button>
            </div>
        `;
    });

    const total = calcularTotalCarrito();

    contenedor.innerHTML = `
        <div class="carrito-lista">
            ${filasHTML}
        </div>

        <div class="carrito-resumen">
            <div class="carrito-total-linea">
                <span>TOTAL:</span>
                <span class="carrito-total-monto">${formatearPrecio(total)}</span>
            </div>

            <div class="carrito-cupon">
                <input type="text" placeholder="Ingrese el cupón de descuento">
                <button type="button" class="btn-aplicar-cupon">APLICAR</button>
            </div>

            <button type="button" class="btn-pagar">PAGAR</button>
        </div>
    `;

    // Conectar los botones recién creados con sus acciones
    contenedor.querySelectorAll('.btn-sumar').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const cantidadActual = parseInt(btn.dataset.cantidad, 10);
            actualizarCantidad(id, cantidadActual + 1);
        });
    });

    contenedor.querySelectorAll('.btn-restar').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const cantidadActual = parseInt(btn.dataset.cantidad, 10);
            actualizarCantidad(id, cantidadActual - 1);
        });
    });

    contenedor.querySelectorAll('.input-cantidad').forEach(input => {
        input.addEventListener('change', () => {
            const id = input.dataset.id;
            const nuevaCantidad = parseInt(input.value, 10);
            actualizarCantidad(id, isNaN(nuevaCantidad) ? 1 : nuevaCantidad);
        });
    });

    contenedor.querySelectorAll('.btn-eliminar').forEach(btn => {
        btn.addEventListener('click', () => {
            eliminarDelCarrito(btn.dataset.id);
        });
    });

    const btnPagar = contenedor.querySelector('.btn-pagar');
    if (btnPagar) {
        btnPagar.addEventListener('click', () => {
            alert('Compra procesada con éxito. ¡Gracias por tu compra!');
            localStorage.removeItem(CARRITO_KEY);
            renderizarCarrito();
            actualizarContadorCarrito();
        });
    }
}

document.addEventListener('DOMContentLoaded', renderizarCarrito);
