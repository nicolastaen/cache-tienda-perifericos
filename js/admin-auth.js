// admin-auth.js — controla quién puede entrar al panel y qué ve según su rol
// Se incluye en TODAS las páginas de /admin/

const SESION_KEY = 'cache_sesion';

function obtenerSesion() {
    const data = localStorage.getItem(SESION_KEY);
    return data ? JSON.parse(data) : null;
}

function guardarSesion(sesion) {
    localStorage.setItem(SESION_KEY, JSON.stringify(sesion));
}

function cerrarSesion() {
    localStorage.removeItem(SESION_KEY);
    window.location.href = '../login.html';
}

// Roles válidos: 'Administrador', 'Vendedor', 'Cliente'
// Un Cliente no puede entrar a NINGUNA vista del panel.
function protegerPaginaAdmin() {
    const sesion = obtenerSesion();

    if (!sesion || sesion.rol === 'Cliente') {
        alert('No tienes permiso para acceder al panel de administración.');
        window.location.href = '../login.html';
        return null;
    }

    aplicarRestriccionesDeMenu(sesion.rol);
    return sesion;
}

// El Vendedor solo debe ver "Productos"; todo lo demás del menú se oculta.
function aplicarRestriccionesDeMenu(rol) {
    if (rol === 'Vendedor') {
        document.querySelectorAll('[data-solo-admin]').forEach(el => {
            el.style.display = 'none';
        });
    }

    // Si un vendedor intenta entrar directo por URL a una página solo-admin
    const paginaActual = document.body.dataset.paginaAdmin;
    if (rol === 'Vendedor' && paginaActual === 'usuarios') {
        alert('No tienes permiso para gestionar usuarios.');
        window.location.href = 'productos.html';
    }
}
