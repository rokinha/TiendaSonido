const formularioLogin = document.getElementById("formulario-login");

formularioLogin.addEventListener("submit", function(event) {
    event.preventDefault();
    let todoEsValido = true;

const correo = document.getElementById("correo").value.trim();
const contrasena = document.getElementById("contrasena").value;

const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

document.getElementById("error-correo").textContent = "";
document.getElementById("error-contrasena").textContent = "";

if (correo === "") {
    document.getElementById("error-correo").textContent = "Debe ingresar un correo";
    todoEsValido = false;
}else if (!formatoCorreo.test(correo)){
    document.getElementById("error-correo").textContent = "Debe ingresar un correo válido";
    todoEsValido = false;
}

if (contrasena === "") {
    document.getElementById("error-contrasena").textContent = "Debe ingresar una contraseña";
    todoEsValido = false;
}

if(todoEsValido) {
    window.location.href = "index.html";
}

});

