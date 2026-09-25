// validaciones.js — funciones reutilizables de validación para todos los formularios

// ---- Dominios de correo permitidos por el anexo ----
const DOMINIOS_PERMITIDOS = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com'];

function validarCorreo(correo) {
    const regexBasico = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexBasico.test(correo)) return false;

    const dominio = correo.split('@')[1].toLowerCase();
    return DOMINIOS_PERMITIDOS.includes(dominio);
}

// ---- Validación de RUN chileno (sin puntos ni guión, ej: 190110221) ----
// Verifica formato + dígito verificador real, no solo el largo.
function validarRun(run) {
    run = run.trim().toUpperCase();

    // Formato: 7 a 9 caracteres, solo dígitos + un dígito verificador final (0-9 o K)
    if (!/^[0-9]{6,8}[0-9K]$/.test(run)) return false;

    const cuerpo = run.slice(0, -1);
    const dv = run.slice(-1);

    let suma = 0;
    let multiplo = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo[i], 10) * multiplo;
        multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }

    const resto = 11 - (suma % 11);
    let dvEsperado;
    if (resto === 11) dvEsperado = '0';
    else if (resto === 10) dvEsperado = 'K';
    else dvEsperado = String(resto);

    return dv === dvEsperado;
}

// ---- Mostrar / ocultar mensajes de error bajo un input ----
// Requiere que cada input tenga un <span class="error-mensaje" id="error-NOMBRE"></span> justo después.
function mostrarError(input, mensaje) {
    input.classList.add('input-invalido');
    const errorSpan = document.getElementById('error-' + input.id);
    if (errorSpan) errorSpan.textContent = mensaje;
}

function ocultarError(input) {
    input.classList.remove('input-invalido');
    const errorSpan = document.getElementById('error-' + input.id);
    if (errorSpan) errorSpan.textContent = '';
}
