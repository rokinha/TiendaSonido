const formularioContacto = document.getElementById("formularioContacto");

formularioContacto.addEventListener("submit", function(event) {
    event.preventDefault();
    let todoEsValido = true;

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const comentario = document.getElementById("comentario").value.trim();

    document.getElementById("error-nombre").textContent = "";
    document.getElementById("error-email").textContent = "";
    document.getElementById("error-comentario").textContent = "";
    document.getElementById("mensaje-enviado").textContent = "";

    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



    if(nombre === "") {
        document.getElementById("error-nombre").textContent = "Debe ingresar un nombre";
        todoEsValido = false;
    }

    if(email === "") {
        document.getElementById("error-email").textContent = "Debe ingresar un correo";
        todoEsValido = false;
    }else if (!formatoCorreo.test(email)){
        document.getElementById("error-email").textContent = "Debe ingresar un correo válido";
        todoEsValido = false;
    }

    if(comentario === "") {
        document.getElementById("error-comentario").textContent = "Debe ingresar un comentario";
        todoEsValido = false;
    }

    if (todoEsValido) {
        document.getElementById("mensaje-enviado").textContent = "Mensaje enviado correctamente";

        formularioContacto.reset();
    }


});