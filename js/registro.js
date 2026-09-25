// registro.js — valida todos los campos de registro según las reglas del anexo, en tiempo real y al enviar

const inputRun = document.getElementById('run');
const inputNombre = document.getElementById('nombre');
const inputApellidos = document.getElementById('apellidos');
const inputCorreo = document.getElementById('correo');
const inputClave = document.getElementById('clave');
const inputClave2 = document.getElementById('clave2');
const selectRegion = document.getElementById('region');
const selectComuna = document.getElementById('comuna');
const inputDireccion = document.getElementById('direccion');
const formRegistro = document.getElementById('form-registro');

// ---- Poblar región/comuna al cargar la página ----
poblarRegiones(selectRegion);

selectRegion.addEventListener('change', () => {
    actualizarComunas(selectRegion, selectComuna);
    validarCampoRegion();
});

// ---- Validaciones individuales ----

function validarCampoRun() {
    const valor = inputRun.value.trim();

    if (valor === '') {
        mostrarError(inputRun, 'El RUN es obligatorio.');
        return false;
    }
    if (valor.length < 7 || valor.length > 9) {
        mostrarError(inputRun, 'El RUN debe tener entre 7 y 9 caracteres.');
        return false;
    }
    if (!validarRun(valor)) {
        mostrarError(inputRun, 'El RUN ingresado no es válido.');
        return false;
    }

    ocultarError(inputRun);
    return true;
}

function validarCampoNombre() {
    const valor = inputNombre.value.trim();

    if (valor === '') {
        mostrarError(inputNombre, 'El nombre es obligatorio.');
        return false;
    }
    if (valor.length > 50) {
        mostrarError(inputNombre, 'El nombre no puede superar los 50 caracteres.');
        return false;
    }

    ocultarError(inputNombre);
    return true;
}

function validarCampoApellidos() {
    const valor = inputApellidos.value.trim();

    if (valor === '') {
        mostrarError(inputApellidos, 'Los apellidos son obligatorios.');
        return false;
    }
    if (valor.length > 100) {
        mostrarError(inputApellidos, 'Los apellidos no pueden superar los 100 caracteres.');
        return false;
    }

    ocultarError(inputApellidos);
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

function validarCampoClave2() {
    if (inputClave2.value !== inputClave.value) {
        mostrarError(inputClave2, 'Las contraseñas no coinciden.');
        return false;
    }

    ocultarError(inputClave2);
    return true;
}

function validarCampoRegion() {
    if (selectRegion.value === '') {
        mostrarError(selectRegion, 'Selecciona una región.');
        return false;
    }
    ocultarError(selectRegion);
    return true;
}

function validarCampoComuna() {
    if (selectComuna.value === '') {
        mostrarError(selectComuna, 'Selecciona una comuna.');
        return false;
    }
    ocultarError(selectComuna);
    return true;
}

function validarCampoDireccion() {
    const valor = inputDireccion.value.trim();

    if (valor === '') {
        mostrarError(inputDireccion, 'La dirección es obligatoria.');
        return false;
    }
    if (valor.length > 300) {
        mostrarError(inputDireccion, 'La dirección no puede superar los 300 caracteres.');
        return false;
    }

    ocultarError(inputDireccion);
    return true;
}

// ---- Validación en tiempo real ----
inputRun.addEventListener('input', validarCampoRun);
inputNombre.addEventListener('input', validarCampoNombre);
inputApellidos.addEventListener('input', validarCampoApellidos);
inputCorreo.addEventListener('input', validarCampoCorreo);
inputClave.addEventListener('input', validarCampoClave);
inputClave2.addEventListener('input', validarCampoClave2);
selectComuna.addEventListener('change', validarCampoComuna);
inputDireccion.addEventListener('input', validarCampoDireccion);

// ---- Envío del formulario ----
formRegistro.addEventListener('submit', function (e) {
    e.preventDefault();

    const valido = [
        validarCampoRun(),
        validarCampoNombre(),
        validarCampoApellidos(),
        validarCampoCorreo(),
        validarCampoClave(),
        validarCampoClave2(),
        validarCampoRegion(),
        validarCampoComuna(),
        validarCampoDireccion()
    ].every(resultado => resultado === true);

    if (!valido) return;

    alert('Cuenta creada con éxito. Ahora puedes iniciar sesión.');
    window.location.href = 'login.html';
});