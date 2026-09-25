const USUARIOS_KEY = 'cache_usuarios';
const SESION_KEY = 'cache_sesion';

const inputCorreo = document.getElementById('correo');
const inputClave = document.getElementById('clave');
const formLogin = document.getElementById('form-login');

function sembrarAdminDemo() {
    const usuarios = JSON.parse(localStorage.getItem(USUARIOS_KEY) || '[]');
    const yaExiste = usuarios.some(u => u.correo === 'admin@duoc.cl');

    if (!yaExiste) {
        usuarios.push({
            run: '111111111',
            nombre: 'Admin',
            apellidos: 'Sistema',
            correo: 'admin@duoc.cl',
            clave: 'admin1',
            fechaNacimiento: '',
            tipoUsuario: 'Administrador',
            region: '0',
            comuna: 'Santiago',
            direccion: 'Casa matriz'
        });
        localStorage.setItem(USUARIOS_KEY, JSON.stringify(usuarios));
    }
}
sembrarAdminDemo();

function validarCampoCorreo() {
    const valor = inputCorreo.value.trim();

    if (valor === '') {
        mostrarError(inputCorreo, 'El correo es obligatorio.');
        return false;
    }
    if (valor.length > 100) {
        mostrarError(inputCorreo, 'El correo no puede superar los 100 caracteres.');
        return false;
    }
    if (!validarCorreo(valor)) {
        mostrarError(inputCorreo, 'Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com');
        return false;
    }

    ocultarError(inputCorreo);
    return true;
}

function validarCampoClave() {
    const valor = inputClave.value;

    if (valor === '') {
        mostrarError(inputClave, 'La contraseña es obligatoria.');
        return false;
    }
    if (valor.length < 4 || valor.length > 10) {
        mostrarError(inputClave, 'La contraseña debe tener entre 4 y 10 caracteres.');
        return false;
    }

    ocultarError(inputClave);
    return true;
}

inputCorreo.addEventListener('input', validarCampoCorreo);
inputClave.addEventListener('input', validarCampoClave);

formLogin.addEventListener('submit', function (e) {
    e.preventDefault();

    const correoValido = validarCampoCorreo();
    const claveValida = validarCampoClave();
    if (!correoValido || !claveValida) return;

    const correo = inputCorreo.value.trim();
    const clave = inputClave.value;

    const usuarios = JSON.parse(localStorage.getItem(USUARIOS_KEY) || '[]');
    const encontrado = usuarios.find(u => u.correo === correo && u.clave === clave);

    if (!encontrado && correo !== 'admin@duoc.cl') {
        // No está en la lista de usuarios del panel -> es un cliente cualquiera de la tienda
        localStorage.setItem(SESION_KEY, JSON.stringify({ correo: correo, nombre: correo.split('@')[0], rol: 'Cliente' }));
        window.location.href = 'index.html';
        return;
    }

    if (!encontrado) {
        mostrarError(inputClave, 'Correo o contraseña incorrectos.');
        return;
    }

    localStorage.setItem(SESION_KEY, JSON.stringify({
        correo: encontrado.correo,
        nombre: encontrado.nombre,
        rol: encontrado.tipoUsuario
    }));

    if (encontrado.tipoUsuario === 'Cliente') {
        window.location.href = 'index.html';
    } else {
        window.location.href = 'admin/index.html';
    }
});