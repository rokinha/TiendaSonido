const formularioUsuario = document.getElementById("formUsuario");
formularioUsuario.addEventListener("submit", function(event) {
    event.preventDefault();
    let todoEsValido = true;

    const runUsuario = document.getElementById("runUsuario").value.trim();
    const nombreUsuario = document.getElementById("nombreUsuario").value.trim();
    const apellidosUsuario = document.getElementById("apellidosUsuario").value.trim();
    const correoUsuario = document.getElementById("correoUsuario").value.trim();
    const fechaNacimiento = document.getElementById("fechaNacimiento").value;
    const tipoUsuario = document.getElementById("tipoUsuario").value;
    const direccionUsuario = document.getElementById("direccionUsuario").value.trim();
    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    document.getElementById("error-run").textContent = "";
    document.getElementById("error-nombres").textContent = "";
    document.getElementById("error-apellidos").textContent = "";
    document.getElementById("error-correo").textContent = "";
    document.getElementById("error-nacimiento").textContent = "";
    document.getElementById("error-tipo-usuario").textContent = "";
    document.getElementById("error-direccion").textContent = "";
    document.getElementById("usuario-guardado").textContent = "";

    if(runUsuario === "") {
        document.getElementById("error-run").textContent = "Debe ingresar un RUN";
        todoEsValido = false;
    }

    if(nombreUsuario === "") {
        document.getElementById("error-nombres").textContent = "Debe ingresar nombres";
        todoEsValido = false;
    }

    if(apellidosUsuario === "") {
        document.getElementById("error-apellidos").textContent = "Debe ingresar apellidos";
        todoEsValido = false;
    }

    if(correoUsuario === "") {
        document.getElementById("error-correo").textContent = "Debe ingresar un correo";
        todoEsValido = false;
    }else if(!formatoCorreo.test(correoUsuario)) {
        document.getElementById("error-correo").textContent = "Debe ingresar un correo válido";
        todoEsValido = false;
    }

    if(fechaNacimiento === "") {
        document.getElementById("error-nacimiento").textContent = "Debe ingresar la fecha de nacimiento";
        todoEsValido = false;
    }

    if(tipoUsuario === "") {
        document.getElementById("error-tipo-usuario").textContent = "Debe seleccionar un tipo de usuario";
        todoEsValido = false;
    }

    if(direccionUsuario === "") {
        document.getElementById("error-direccion").textContent = "Debe ingresar una direccion";
        todoEsValido = false;
    }

    if(todoEsValido) {
        document.getElementById("usuario-guardado").textContent = "Usuario agregado correctamente";
        formularioUsuario.reset();
    }

})