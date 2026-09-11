/* ========================================
   VALIDACIÓN ADMINISTRACIÓN DE PRODUCTOS
======================================== */

const formProducto = document.getElementById("formProducto");

if (formProducto) {

    const codigo = document.getElementById("codigoProducto");
    const nombre = document.getElementById("nombreProducto");
    const descripcion = document.getElementById("descripcionProducto");
    const precio = document.getElementById("precioProducto");
    const stock = document.getElementById("stockProducto");
    const stockCritico = document.getElementById("stockCritico");
    const categoria = document.getElementById("categoriaProducto");


    // ========================================
    // MOSTRAR MENSAJES
    // ========================================

    function mostrarMensaje(campo, mensaje, esError = true) {

        let mensajeElemento =
            campo.parentElement.querySelector(".mensaje-validacion");

        if (!mensajeElemento) {

            mensajeElemento = document.createElement("small");

            mensajeElemento.classList.add("mensaje-validacion");

            campo.parentElement.appendChild(mensajeElemento);
        }

        mensajeElemento.textContent = mensaje;

        mensajeElemento.classList.remove(
            "mensaje-error",
            "mensaje-exito"
        );

        if (esError) {

            mensajeElemento.classList.add("mensaje-error");

        } else {

            mensajeElemento.classList.add("mensaje-exito");

        }
    }


    // ========================================
    // VALIDAR CÓDIGO
    // ========================================

    function validarCodigo() {

        const valor = codigo.value.trim();

        if (valor === "") {

            mostrarMensaje(
                codigo,
                "Ingresa el código del producto."
            );

            return false;
        }

        if (valor.length < 3) {

            mostrarMensaje(
                codigo,
                "El código debe tener al menos 3 caracteres."
            );

            return false;
        }

        mostrarMensaje(
            codigo,
            "✓ Código válido.",
            false
        );

        return true;
    }


    // ========================================
    // VALIDAR NOMBRE
    // ========================================

    function validarNombre() {

        const valor = nombre.value.trim();

        if (valor === "") {

            mostrarMensaje(
                nombre,
                "Ingresa el nombre del producto."
            );

            return false;
        }

        if (valor.length > 100) {

            mostrarMensaje(
                nombre,
                "El nombre no puede superar los 100 caracteres."
            );

            return false;
        }

        mostrarMensaje(
            nombre,
            "✓ Nombre válido.",
            false
        );

        return true;
    }


    // ========================================
    // VALIDAR DESCRIPCIÓN
    // ========================================

    function validarDescripcion() {

        const valor = descripcion.value.trim();

        if (valor.length > 500) {

            mostrarMensaje(
                descripcion,
                "La descripción no puede superar los 500 caracteres."
            );

            return false;
        }

        if (valor === "") {

            mostrarMensaje(
                descripcion,
                "Descripción opcional.",
                false
            );

        } else {

            mostrarMensaje(
                descripcion,
                "✓ Descripción válida.",
                false
            );

        }

        return true;
    }


    // ========================================
    // VALIDAR PRECIO
    // ========================================

    function validarPrecio() {

        const valor = precio.value;

        if (valor === "") {

            mostrarMensaje(
                precio,
                "Ingresa el precio del producto."
            );

            return false;
        }

        if (Number(valor) < 0) {

            mostrarMensaje(
                precio,
                "El precio no puede ser menor que 0."
            );

            return false;
        }

        mostrarMensaje(
            precio,
            "✓ Precio válido.",
            false
        );

        return true;
    }


    // ========================================
    // VALIDAR STOCK
    // ========================================

    function validarStock() {

        const valor = stock.value;

        if (valor === "") {

            mostrarMensaje(
                stock,
                "Ingresa el stock disponible."
            );

            return false;
        }

        if (Number(valor) < 0) {

            mostrarMensaje(
                stock,
                "El stock no puede ser menor que 0."
            );

            return false;
        }

        if (!Number.isInteger(Number(valor))) {

            mostrarMensaje(
                stock,
                "El stock debe ser un número entero."
            );

            return false;
        }

        mostrarMensaje(
            stock,
            "✓ Stock válido.",
            false
        );

        validarStockCritico();

        return true;
    }


    // ========================================
    // VALIDAR STOCK CRÍTICO
    // ========================================

    function validarStockCritico() {

        const valor = stockCritico.value;

        if (valor === "") {

            mostrarMensaje(
                stockCritico,
                "Stock crítico opcional.",
                false
            );

            return true;
        }

        if (Number(valor) < 0) {

            mostrarMensaje(
                stockCritico,
                "El stock crítico no puede ser menor que 0."
            );

            return false;
        }

        if (!Number.isInteger(Number(valor))) {

            mostrarMensaje(
                stockCritico,
                "El stock crítico debe ser un número entero."
            );

            return false;
        }

        if (
            stock.value !== "" &&
            Number(stock.value) <= Number(valor)
        ) {

            mostrarMensaje(
                stockCritico,
                "⚠️ Atención: el stock actual está en nivel crítico."
            );

            return true;
        }

        mostrarMensaje(
            stockCritico,
            "✓ Stock crítico válido.",
            false
        );

        return true;
    }


    // ========================================
    // VALIDAR CATEGORÍA
    // ========================================

    function validarCategoria() {

        if (categoria.value === "") {

            mostrarMensaje(
                categoria,
                "Selecciona una categoría."
            );

            return false;
        }

        mostrarMensaje(
            categoria,
            "✓ Categoría seleccionada.",
            false
        );

        return true;
    }


    // ========================================
    // VALIDACIÓN EN TIEMPO REAL
    // ========================================

    codigo.addEventListener("input", validarCodigo);

    nombre.addEventListener("input", validarNombre);

    descripcion.addEventListener("input", validarDescripcion);

    precio.addEventListener("input", validarPrecio);

    stock.addEventListener("input", validarStock);

    stockCritico.addEventListener("input", validarStockCritico);

    categoria.addEventListener("change", validarCategoria);


    // ========================================
    // ENVIAR FORMULARIO
    // ========================================

    formProducto.addEventListener("submit", function(event) {

        event.preventDefault();

        const codigoValido = validarCodigo();
        const nombreValido = validarNombre();
        const descripcionValida = validarDescripcion();
        const precioValido = validarPrecio();
        const stockValido = validarStock();
        const stockCriticoValido = validarStockCritico();
        const categoriaValida = validarCategoria();


        if (
            codigoValido &&
            nombreValido &&
            descripcionValida &&
            precioValido &&
            stockValido &&
            stockCriticoValido &&
            categoriaValida
        ) {

            mostrarNotificacion(
                "Producto validado correctamente."
            );

            formProducto.reset();

        } else {

            mostrarNotificacion(
                "Revisa los campos marcados antes de continuar.",
                true
            );

        }

    });

}