const formLogin = document.getElementById('form-login');

formLogin.addEventListener('submit', function (e) {
    e.preventDefault();

    const correo = document.getElementById('correo').value.trim();
    const clave = document.getElementById('clave').value.trim();

    if (correo === '' || clave === '') {
        alert('Por favor completa correo y contraseña.');
        return;
    }

    window.location.href = 'index.html';
});
