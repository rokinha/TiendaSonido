const formularioProducto = document.getElementById("formProducto");

formularioProducto.addEventListener("submit", function(event) {

    event.preventDefault();

    let todoEsValido = true;

    const codigoProducto = document.getElementById("codigoProducto").value.trim();
    const nombreProducto = document.getElementById("nombreProducto").value.trim();
    const descripcionProducto = document.getElementById("descripcionProducto").value.trim();
    const precioProducto = document.getElementById("precioProducto").value;
    const stockProducto = document.getElementById("stockProducto").value;
    const stockCritico = document.getElementById("stockCritico").value;
    const categoriaProducto = document.getElementById("categoriaProducto").value;
    const imagenProducto = document.getElementById("imagenProducto").value;

    document.getElementById("error-codigo").textContent = "";
    document.getElementById("error-nombre-producto").textContent = "";
    document.getElementById("error-descripcion").textContent = "";
    document.getElementById("error-precio").textContent = "";
    document.getElementById("error-stock").textContent = "";
    document.getElementById("error-stock-critico").textContent = "";
    document.getElementById("error-categoria").textContent = "";
    document.getElementById("error-imagen").textContent = "";
    document.getElementById("producto-guardado").textContent = "";

    if (codigoProducto === "") {
        document.getElementById("error-codigo").textContent = "Debe ingresar un código";
        todoEsValido = false;
    }

    if (nombreProducto === "") {
        document.getElementById("error-nombre-producto").textContent = "Debe ingresar un nombre";
        todoEsValido = false;
    }

    if (descripcionProducto === "") {
        document.getElementById("error-descripcion").textContent = "Debe ingresar una descripción";
        todoEsValido = false;
    }

    if (precioProducto === "") {
        document.getElementById("error-precio").textContent = "Debe ingresar un precio";
        todoEsValido = false;
    } else if (precioProducto < 0) {
        document.getElementById("error-precio").textContent = "El precio no puede ser negativo";
        todoEsValido = false;
    }

    if (stockProducto === "") {
        document.getElementById("error-stock").textContent = "Debe ingresar el stock";
        todoEsValido = false;
    } else if (stockProducto < 0) {
        document.getElementById("error-stock").textContent = "El stock no puede ser negativo";
        todoEsValido = false;
    }

    if (stockCritico === "") {
        document.getElementById("error-stock-critico").textContent = "Debe ingresar el stock crítico";
        todoEsValido = false;
    } else if (stockCritico < 0) {
        document.getElementById("error-stock-critico").textContent = "El stock crítico no puede ser negativo";
        todoEsValido = false;
    }

    if (categoriaProducto === "") {
        document.getElementById("error-categoria").textContent = "Debe seleccionar una categoría";
        todoEsValido = false;
    }

    if (imagenProducto === "") {
        document.getElementById("error-imagen").textContent = "Debe seleccionar una imagen";
        todoEsValido = false;
    }

    if (todoEsValido) {
        document.getElementById("producto-guardado").textContent = "Producto agregado correctamente";
        formularioProducto.reset();
    }

});