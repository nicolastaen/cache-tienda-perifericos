// login.js — valida correo y contraseña según las reglas del anexo, en tiempo real y al enviar

const inputCorreo = document.getElementById('correo');
const inputClave = document.getElementById('clave');
const formLogin = document.getElementById('form-login');

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

// Validación en tiempo real, mientras el usuario escribe
inputCorreo.addEventListener('input', validarCampoCorreo);
inputClave.addEventListener('input', validarCampoClave);

formLogin.addEventListener('submit', function (e) {
    e.preventDefault();

    const correoValido = validarCampoCorreo();
    const claveValida = validarCampoClave();

    if (correoValido && claveValida) {
        window.location.href = 'index.html';
    }
});