const formRegistro = document.getElementById('form-registro');

formRegistro.addEventListener('submit', function (e) {
    e.preventDefault(); 

    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const clave = document.getElementById('clave').value;
    const clave2 = document.getElementById('clave2').value;

    if (nombre === '' || correo === '' || clave === '' || clave2 === '') {
        alert('Por favor completa todos los campos.');
        return;
    }

    if (clave !== clave2) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    if (clave.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres.');
        return;
    }

    alert('Cuenta creada con éxito. Ahora puedes iniciar sesión.');
    window.location.href = 'login.html';
});
