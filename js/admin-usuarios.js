// admin-usuarios.js — listado de usuarios del panel (localStorage: cache_usuarios)

const USUARIOS_KEY = 'cache_usuarios';
const sesion = protegerPaginaAdmin();

function obtenerUsuarios() {
    return JSON.parse(localStorage.getItem(USUARIOS_KEY) || '[]');
}

function guardarUsuarios(usuarios) {
    localStorage.setItem(USUARIOS_KEY, JSON.stringify(usuarios));
}

function claseBadgeRol(rol) {
    if (rol === 'Administrador') return 'admin-badge-admin';
    if (rol === 'Vendedor') return 'admin-badge-vendedor';
    return 'admin-badge-cliente';
}

function renderizarTablaUsuarios() {
    const cuerpo = document.getElementById('tabla-usuarios-body');
    const usuarios = obtenerUsuarios();

    if (usuarios.length === 0) {
        cuerpo.innerHTML = `<tr><td colspan="5" class="admin-tabla-vacia">Todavía no hay usuarios.</td></tr>`;
        return;
    }

    cuerpo.innerHTML = usuarios.map(u => `
        <tr>
            <td>${u.run}</td>
            <td>${u.nombre} ${u.apellidos || ''}</td>
            <td>${u.correo}</td>
            <td><span class="admin-badge-rol ${claseBadgeRol(u.tipoUsuario)}">${u.tipoUsuario}</span></td>
            <td>
                <button type="button" class="admin-accion-btn btn-editar-usuario" data-run="${u.run}" title="Editar">✏️</button>
                <button type="button" class="admin-accion-btn btn-eliminar-usuario" data-run="${u.run}" title="Eliminar">🗑️</button>
            </td>
        </tr>
    `).join('');

    cuerpo.querySelectorAll('.btn-editar-usuario').forEach(btn => {
        btn.addEventListener('click', () => {
            window.location.href = 'usuario-form.html?run=' + encodeURIComponent(btn.dataset.run);
        });
    });

    cuerpo.querySelectorAll('.btn-eliminar-usuario').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!confirm('¿Eliminar este usuario?')) return;
            const usuarios = obtenerUsuarios().filter(u => u.run !== btn.dataset.run);
            guardarUsuarios(usuarios);
            renderizarTablaUsuarios();
        });
    });
}

document.getElementById('btn-nuevo-usuario').addEventListener('click', () => {
    window.location.href = 'usuario-form.html';
});

document.getElementById('btn-cerrar-sesion').addEventListener('click', (e) => {
    e.preventDefault();
    cerrarSesion();
});

if (sesion) renderizarTablaUsuarios();
