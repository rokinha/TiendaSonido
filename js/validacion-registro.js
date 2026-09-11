const formulario = document.getElementById("formulario-registro");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();
    let todoEsValido = true;

    const nombres = document.getElementById("nombres").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const contrasena = document.getElementById("contrasena").value;
    const confirmarContrasena = document.getElementById("confirmar-contrasena").value;
    const fechaNacimiento = document.getElementById("fecha-nacimiento").value;
    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    document.getElementById("error-nombre").textContent = "";
    document.getElementById("error-apellidos").textContent = "";
    document.getElementById("error-correo").textContent = "";
    document.getElementById("error-contrasena").textContent = "";
    document.getElementById("error-confirmar-contrasena").textContent = "";
    document.getElementById("error-fecha-nacimiento").textContent = "";

    if(nombres === "") {
        document.getElementById("error-nombre").textContent = "Debe ingresar un nombre";
        todoEsValido = false;
    }

    if(apellidos === "") {
        document.getElementById("error-apellidos").textContent = "Debe ingresar apellidos";
        todoEsValido = false;
    }

    if(correo === "") {
        document.getElementById("error-correo").textContent = "Debe ingresar un correo";
        todoEsValido = false;
    }else if (!formatoCorreo.test(correo)) {
        document.getElementById("error-correo").textContent = "Formato inválido. Debe ingresar correo@ejemplo.cl"
        todoEsValido = false;
    }

    if(contrasena === "") {
        document.getElementById("error-contrasena").textContent = "Debe ingresar una contraseña";
        todoEsValido = false;
    }

    if (confirmarContrasena === "") {
        document.getElementById("error-confirmar-contrasena").textContent = "Debe reingresar contraseña";
        todoEsValido = false;
    } else if (confirmarContrasena !== contrasena) {
        document.getElementById("error-confirmar-contrasena").textContent = "Las contraseñas no coinciden";
        todoEsValido = false;
    }

    if (fechaNacimiento === "") {
        document.getElementById("error-fecha-nacimiento").textContent = "Debe indicar fecha nacimiento";
        todoEsValido = false;
    }

    if (todoEsValido) {
        window.location.href = "login.html"
    }
});