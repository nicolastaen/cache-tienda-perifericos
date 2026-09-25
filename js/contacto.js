// contacto.js — valida nombre, correo y comentario del formulario de contacto

const inputNombre = document.getElementById('nombre');
const inputCorreo = document.getElementById('correo');
const inputComentario = document.getElementById('comentario');
const formContacto = document.getElementById('form-contacto');

function validarCampoNombre() {
    const valor = inputNombre.value.trim();

    if (valor === '') {
        mostrarError(inputNombre, 'El nombre es obligatorio.');
        return false;
    }
    if (valor.length > 100) {
        mostrarError(inputNombre, 'El nombre no puede superar los 100 caracteres.');
        return false;
    }

    ocultarError(inputNombre);
    return true;
}

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

function validarCampoComentario() {
    const valor = inputComentario.value.trim();

    if (valor === '') {
        mostrarError(inputComentario, 'El mensaje es obligatorio.');
        return false;
    }
    if (valor.length > 500) {
        mostrarError(inputComentario, 'El mensaje no puede superar los 500 caracteres.');
        return false;
    }

    ocultarError(inputComentario);
    return true;
}

// Validación en tiempo real
inputNombre.addEventListener('input', validarCampoNombre);
inputCorreo.addEventListener('input', validarCampoCorreo);
inputComentario.addEventListener('input', validarCampoComentario);

// Envío del formulario
formContacto.addEventListener('submit', function (e) {
    e.preventDefault();

    const valido = [
        validarCampoNombre(),
        validarCampoCorreo(),
        validarCampoComentario()
    ].every(resultado => resultado === true);

    if (!valido) return;

    alert('Mensaje enviado con éxito. Te contactaremos pronto.');
    formContacto.reset();
});
