/* ========================================
   VALIDACIÓN ADMINISTRACIÓN DE USUARIOS
======================================== */

const formUsuario = document.getElementById("formUsuario");

if (formUsuario) {

    const runUsuario = document.getElementById("runUsuario");
    const nombreUsuario = document.getElementById("nombreUsuario");
    const apellidosUsuario = document.getElementById("apellidosUsuario");
    const correoUsuario = document.getElementById("correoUsuario");
    const tipoUsuario = document.getElementById("tipoUsuario");
    const direccionUsuario = document.getElementById("direccionUsuario");


    // ========================================
    // MOSTRAR MENSAJES
    // ========================================

    function mostrarMensajeUsuario(campo, mensaje, esError = true) {

        let mensajeCampo =
            campo.parentElement.querySelector(".mensaje-validacion");

        if (!mensajeCampo) {

            mensajeCampo = document.createElement("small");

            mensajeCampo.classList.add("mensaje-validacion");

            campo.parentElement.appendChild(mensajeCampo);
        }

        mensajeCampo.textContent = mensaje;

        mensajeCampo.className = "mensaje-validacion";

        if (esError) {

            mensajeCampo.classList.add("mensaje-error");

        } else {

            mensajeCampo.classList.add("mensaje-exito");

        }
    }


    // ========================================
    // VALIDAR RUN
    // ========================================

    function validarRUN() {

        const run = runUsuario.value.trim().toUpperCase();

        if (run === "") {

            mostrarMensajeUsuario(
                runUsuario,
                "El RUN es obligatorio."
            );

            return false;
        }

        if (run.includes(".") || run.includes("-")) {

            mostrarMensajeUsuario(
                runUsuario,
                "Ingresa el RUN sin puntos ni guion. Ejemplo: 19011022K"
            );

            return false;
        }

        if (!/^[0-9]{6,8}[0-9K]$/.test(run)) {

            mostrarMensajeUsuario(
                runUsuario,
                "El RUN debe tener entre 7 y 9 caracteres y terminar en un dígito o K."
            );

            return false;
        }


        // ========================================
        // DÍGITO VERIFICADOR
        // ========================================

        const cuerpo = run.slice(0, -1);

        const digitoVerificador = run.slice(-1);

        let suma = 0;

        let multiplicador = 2;


        for (let i = cuerpo.length - 1; i >= 0; i--) {

            suma += parseInt(cuerpo[i]) * multiplicador;

            multiplicador++;

            if (multiplicador > 7) {

                multiplicador = 2;

            }
        }


        const resto = suma % 11;

        const resultado = 11 - resto;

        let digitoEsperado;


        if (resultado === 11) {

            digitoEsperado = "0";

        } else if (resultado === 10) {

            digitoEsperado = "K";

        } else {

            digitoEsperado = resultado.toString();

        }


        if (digitoVerificador !== digitoEsperado) {

            mostrarMensajeUsuario(
                runUsuario,
                "El RUN ingresado no es válido. Revisa el dígito verificador."
            );

            return false;
        }


        mostrarMensajeUsuario(
            runUsuario,
            "✓ RUN válido.",
            false
        );

        return true;
    }


    // ========================================
    // VALIDAR NOMBRE
    // ========================================

    function validarNombre() {

        const nombre = nombreUsuario.value.trim();

        if (nombre === "") {

            mostrarMensajeUsuario(
                nombreUsuario,
                "El nombre es obligatorio."
            );

            return false;
        }

        if (nombre.length > 50) {

            mostrarMensajeUsuario(
                nombreUsuario,
                "El nombre no puede superar los 50 caracteres."
            );

            return false;
        }

        mostrarMensajeUsuario(
            nombreUsuario,
            "✓ Nombre válido.",
            false
        );

        return true;
    }


    // ========================================
    // VALIDAR APELLIDOS
    // ========================================

    function validarApellidos() {

        const apellidos = apellidosUsuario.value.trim();

        if (apellidos === "") {

            mostrarMensajeUsuario(
                apellidosUsuario,
                "Los apellidos son obligatorios."
            );

            return false;
        }

        if (apellidos.length > 100) {

            mostrarMensajeUsuario(
                apellidosUsuario,
                "Los apellidos no pueden superar los 100 caracteres."
            );

            return false;
        }

        mostrarMensajeUsuario(
            apellidosUsuario,
            "✓ Apellidos válidos.",
            false
        );

        return true;
    }


    // ========================================
    // VALIDAR CORREO
    // ========================================

    function validarCorreo() {

        const correo =
            correoUsuario.value.trim().toLowerCase();

        if (correo === "") {

            mostrarMensajeUsuario(
                correoUsuario,
                "El correo es obligatorio."
            );

            return false;
        }

        if (correo.length > 100) {

            mostrarMensajeUsuario(
                correoUsuario,
                "El correo no puede superar los 100 caracteres."
            );

            return false;
        }


        const formatoCorreo =
            /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;


        if (!formatoCorreo.test(correo)) {

            mostrarMensajeUsuario(
                correoUsuario,
                "Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com."
            );

            return false;
        }


        mostrarMensajeUsuario(
            correoUsuario,
            "✓ Correo válido.",
            false
        );

        return true;
    }


    // ========================================
    // VALIDAR TIPO DE USUARIO
    // ========================================

    function validarTipoUsuario() {

        if (tipoUsuario.value === "") {

            mostrarMensajeUsuario(
                tipoUsuario,
                "Debes seleccionar un tipo de usuario."
            );

            return false;
        }

        mostrarMensajeUsuario(
            tipoUsuario,
            "✓ Tipo de usuario seleccionado.",
            false
        );

        return true;
    }


    // ========================================
    // VALIDAR DIRECCIÓN
    // ========================================

    function validarDireccion() {

        const direccion =
            direccionUsuario.value.trim();

        if (direccion === "") {

            mostrarMensajeUsuario(
                direccionUsuario,
                "La dirección es obligatoria."
            );

            return false;
        }

        if (direccion.length > 300) {

            mostrarMensajeUsuario(
                direccionUsuario,
                "La dirección no puede superar los 300 caracteres."
            );

            return false;
        }

        mostrarMensajeUsuario(
            direccionUsuario,
            "✓ Dirección válida.",
            false
        );

        return true;
    }


    // ========================================
    // VALIDACIÓN EN TIEMPO REAL
    // ========================================

    runUsuario.addEventListener("input", validarRUN);

    nombreUsuario.addEventListener("input", validarNombre);

    apellidosUsuario.addEventListener("input", validarApellidos);

    correoUsuario.addEventListener("input", validarCorreo);

    tipoUsuario.addEventListener("change", validarTipoUsuario);

    direccionUsuario.addEventListener("input", validarDireccion);


    // ========================================
    // ENVIAR FORMULARIO
    // ========================================

    formUsuario.addEventListener("submit", function(event) {

        event.preventDefault();

        const runValido = validarRUN();

        const nombreValido = validarNombre();

        const apellidosValidos = validarApellidos();

        const correoValido = validarCorreo();

        const tipoValido = validarTipoUsuario();

        const direccionValida = validarDireccion();


        if (
            runValido &&
            nombreValido &&
            apellidosValidos &&
            correoValido &&
            tipoValido &&
            direccionValida
        ) {

            mostrarNotificacion(
                "Usuario validado correctamente."
            );

            formUsuario.reset();


            const mensajes =
                formUsuario.querySelectorAll(
                    ".mensaje-validacion"
                );


            mensajes.forEach(function(mensaje) {

                mensaje.remove();

            });


        } else {

            mostrarNotificacion(
                "Revisa los campos marcados antes de continuar.",
                true
            );

        }

    });


    // ========================================
    // LIMPIAR MENSAJES AL REINICIAR
    // ========================================

    formUsuario.addEventListener("reset", function() {

        setTimeout(function() {

            const mensajes =
                formUsuario.querySelectorAll(
                    ".mensaje-validacion"
                );


            mensajes.forEach(function(mensaje) {

                mensaje.remove();

            });

        }, 0);

    });

}