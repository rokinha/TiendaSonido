/*--------aqui se genera cada producto de manera dinamica con un array que se ve en el log ---------*/

const productosContainer = document.getElementById("productosContainer");

if (productosContainer) {

    productos.forEach(function(producto) {

        const tarjeta = document.createElement("div");

        tarjeta.className = "col-12 col-md-6 col-lg-4";

        tarjeta.innerHTML = `
            <article class="card producto-card h-100">

                <div class="producto-imagen">

                    <a href="detalle-producto.html?codigo=${producto.codigo}">
                        <img
                            src="${producto.imagen}"
                            class="card-img-top"
                            alt="${producto.nombre}">
                    </a>

                </div>

                <div class="card-body">

                    <h2 class="card-title">
                        <a
                            href="detalle-producto.html?codigo=${producto.codigo}"
                            class="text-decoration-none text-dark">
                            ${producto.nombre}
                        </a>
                    </h2>

                    <p class="card-text">
                        ${producto.descripcion}
                    </p>

                    <p class="precio">
                        $${producto.precio.toLocaleString("es-CL")}
                    </p>

                    <p>
                        Stock disponible: ${producto.stock}
                    </p>

                    <button
                        type="button"
                        class="btn btn-primary boton-carrito"
                        data-codigo="${producto.codigo}">

                        🛒 Agregar al carrito

                    </button>

                </div>

            </article>
        `;

        productosContainer.appendChild(tarjeta);

    });

}

console.log(productos);

/*--------aqui se genera cada detalle producto de manera dinamica ---------*/
const detalleProducto = document.getElementById("detalleProducto");

if (detalleProducto) {

    const parametros = new URLSearchParams(window.location.search);
    const codigo = parametros.get("codigo");

    const producto = productos.find(function(producto) {
        return producto.codigo === codigo;
    });

    if (producto) {

        detalleProducto.innerHTML = `
            <div class="row g-5 align-items-center">

                <div class="col-12 col-md-6 text-center">
                    <img
                        src="${producto.imagen}"
                        alt="${producto.nombre}"
                        class="img-fluid rounded">
                </div>

                <div class="col-12 col-md-6">

                    <p class="text-primary fw-bold">
                        ${producto.categoria}
                    </p>

                    <h1 class="fw-bold">
                        ${producto.nombre}
                    </h1>

                    <p class="text-muted">
                        ${producto.descripcion}
                    </p>

                    <hr>

                    <p>
                        <strong>Marca:</strong> ${producto.marca}
                    </p>

                    <p>
                        <strong>Modelo:</strong> ${producto.modelo}
                    </p>

                    <p>
                        <strong>Stock disponible:</strong> ${producto.stock}
                    </p>

                    <p class="precio">
                        $${producto.precio.toLocaleString("es-CL")}
                    </p>

                    <div class="mt-4 d-flex flex-column flex-sm-row gap-3">

                        <button
                            type="button"
                            class="btn btn-primary boton-carrito"
                            data-codigo="${producto.codigo}">
                            🛒 Agregar al carrito
                        </button>

                        <a
                            href="productos.html"
                            class="btn btn-outline-secondary">
                            ← Volver a productos
                        </a>

                    </div>

                </div>

            </div>
        `;

    } else {

        detalleProducto.innerHTML = `
            <div class="text-center py-5">
                <h1>Producto no encontrado</h1>
                <p>
                    El producto que buscas no existe en nuestro catálogo.
                </p>

                <a href="productos.html" class="btn btn-primary">
                    Volver a productos
                </a>
            </div>
        `;
    }
}

/*-------- productos destacados del index --------*/

const productosDestacados = document.getElementById("productosDestacados");

if (productosDestacados) {

    const destacados = [
        {
            codigo: "GA001",
            etiqueta: "★ Más vendido",
            claseEtiqueta: ""
        },
        {
            codigo: "BT001",
            etiqueta: "✓ Alta calidad",
            claseEtiqueta: "etiqueta-verde"
        },
        {
            codigo: "MI001",
            etiqueta: "🏷 Oferta",
            claseEtiqueta: "etiqueta-oferta",
            precioOferta: 129990
        }
    ];

    destacados.forEach(function(destacado) {

        const producto = productos.find(function(producto) {
            return producto.codigo === destacado.codigo;
        });

        if (producto) {

            const tarjeta = document.createElement("div");

            tarjeta.className = "col-12 col-md-4";

            tarjeta.innerHTML = `
                <article class="card producto-card h-100">

                    <div class="producto-imagen">

                        <span class="producto-etiqueta ${destacado.claseEtiqueta}">
                            ${destacado.etiqueta}
                        </span>

                        <a href="detalle-producto.html?codigo=${producto.codigo}">
                            <img
                                src="${producto.imagen}"
                                class="card-img-top"
                                alt="${producto.nombre}">
                        </a>

                    </div>

                    <div class="card-body">

                        <h3 class="card-title">
                            <a
                                href="detalle-producto.html?codigo=${producto.codigo}"
                                class="text-decoration-none text-dark">
                                ${producto.nombre}
                            </a>
                        </h3>

                        <p class="card-text">
                            ${producto.descripcion}
                        </p>

                        <p class="precio">
                            ${
                                destacado.precioOferta
                                    ? `
                                        <span class="precio-original">
                                            Antes: $${producto.precio.toLocaleString("es-CL")}
                                        </span>
                                        <span class="precio-oferta">
                                            $${destacado.precioOferta.toLocaleString("es-CL")}
                                        </span>
                                    `
                                    : `$${producto.precio.toLocaleString("es-CL")}`
                            }
                        </p>

                        <div class="producto-info">

                            <span>
                                🚚 Envío a todo Chile
                            </span>

                            <span>
                                🛡️ Garantía 1 año
                            </span>

                        </div>

                        <button
                            class="btn btn-primary boton-carrito"
                            type="button"
                            data-codigo="${producto.codigo}">

                            🛒 Agregar al carrito

                        </button>

                    </div>

                </article>
            `;

            productosDestacados.appendChild(tarjeta);
        }
    });
}

/* ========================================
   CARRITO DE COMPRAS
======================================== */

const CLAVE_CARRITO = "carritoSonidoVivo";

const MAXIMO_CARRITO = 20;

function mostrarNotificacion(mensaje, esError = false) {
    const notificacion = document.createElement("div");

    notificacion.className = "notificacion-carrito";

    if (esError) {
        notificacion.classList.add("error");
    }

    notificacion.textContent = mensaje;

    document.body.appendChild(notificacion);

    setTimeout(function() {
        notificacion.classList.add("mostrar");
    }, 10);

    setTimeout(function() {
        notificacion.classList.remove("mostrar");

        setTimeout(function() {
            notificacion.remove();
        }, 300);
    }, 3000);
}


function obtenerCarrito() {

    const carritoGuardado = localStorage.getItem(CLAVE_CARRITO);

    if (carritoGuardado) {
        return JSON.parse(carritoGuardado);
    }

    return [];
}


function guardarCarrito(carrito) {

    localStorage.setItem(
        CLAVE_CARRITO,
        JSON.stringify(carrito)
    );
}


function agregarAlCarrito(codigo) {

    const producto = productos.find(function(producto) {
        return producto.codigo === codigo;
    });

    if (!producto) {
        return;
    }

    const carrito = obtenerCarrito();

    const productoExistente = carrito.find(function(item) {
        return item.codigo === codigo;
    });

    if (productoExistente) {

        const cantidadActual = carrito.reduce(function(total, item) {
            return total + item.cantidad;
        }, 0);

        if (cantidadActual >= MAXIMO_CARRITO) {
            mostrarNotificacion(
                "Has alcanzado el máximo de 20 productos en el carrito.",
                true
            );
            return;
        }

        if (productoExistente.cantidad < producto.stock) {
            productoExistente.cantidad++;
        } else {
            mostrarNotificacion(
                "Has alcanzado el stock disponible de este producto.",
                true
            );
            return;
        }

    } else {

        const cantidadActual = carrito.reduce(function(total, item) {
            return total + item.cantidad;
        }, 0);

        if (cantidadActual >= MAXIMO_CARRITO) {
            mostrarNotificacion(
                "Has alcanzado el máximo de 20 productos en el carrito.",
                true
            );
            return;
        }

        carrito.push({
            codigo: codigo,
            cantidad: 1
        });
    }

    guardarCarrito(carrito);

    mostrarNotificacion("Producto agregado al carrito.");
}

document.addEventListener("click", function(event) {

    const boton = event.target.closest(".boton-carrito");

    if (!boton) {
        return;
    }

    const codigo = boton.dataset.codigo;

    agregarAlCarrito(codigo);
});

function mostrarCarrito() {

    const listaCarrito = document.getElementById("listaCarrito");
    const cantidadCarrito = document.getElementById("cantidadCarrito");
    const totalCarrito = document.getElementById("totalCarrito");

    if (!listaCarrito) {
        return;
    }

    const carrito = obtenerCarrito();

    listaCarrito.innerHTML = "";

    let cantidadTotal = 0;
    let precioTotal = 0;

    if (carrito.length === 0) {

        listaCarrito.innerHTML = `
            <div class="text-center py-5">
                <h3>Tu carrito está vacío</h3>
                <p>
                    Agrega algunos productos para comenzar.
                </p>

                <a
                    href="productos.html"
                    class="btn btn-primary">
                    Ver productos
                </a>
            </div>
        `;

        cantidadCarrito.textContent = "0";
        totalCarrito.textContent = "$0";

        return;
    }

    carrito.forEach(function(item) {

        const producto = productos.find(function(producto) {
            return producto.codigo === item.codigo;
        });

        if (!producto) {
            return;
        }

        const subtotal = producto.precio * item.cantidad;

        cantidadTotal += item.cantidad;
        precioTotal += subtotal;

        const elemento = document.createElement("div");

        elemento.className = "card mb-3";

        elemento.innerHTML = `
            <div class="card-body">

                <div class="row align-items-center">

                    <div class="col-12 col-md-2 text-center">
                        <img
                            src="${producto.imagen}"
                            alt="${producto.nombre}"
                            class="img-fluid rounded">
                    </div>

                    <div class="col-12 col-md-4">

                        <h3 class="h5">
                            ${producto.nombre}
                        </h3>

                        <p class="mb-1">
                            ${producto.marca} ${producto.modelo}
                        </p>

                        <small class="text-muted">
                            Código: ${producto.codigo}
                        </small>

                    </div>

                    <div class="col-12 col-md-2">

                        <strong>
                            $${producto.precio.toLocaleString("es-CL")}
                        </strong>

                    </div>

                    <div class="col-12 col-md-2">

                        <div class="d-flex align-items-center gap-2">

                            <button
                                type="button"
                                class="btn btn-outline-secondary btn-cantidad"
                                data-codigo="${producto.codigo}"
                                data-accion="restar">
                                −
                            </button>

                            <span>
                                ${item.cantidad}
                            </span>

                            <button
                                type="button"
                                class="btn btn-outline-secondary btn-cantidad"
                                data-codigo="${producto.codigo}"
                                data-accion="sumar">
                                +
                            </button>

                        </div>

                    </div>

                    <div class="col-12 col-md-2 text-end">

                        <p class="fw-bold">
                            $${subtotal.toLocaleString("es-CL")}
                        </p>

                        <button
                            type="button"
                            class="btn btn-sm btn-outline-danger btn-eliminar"
                            data-codigo="${producto.codigo}">
                            Eliminar
                        </button>

                    </div>

                </div>

            </div>
        `;

        listaCarrito.appendChild(elemento);
    });

    cantidadCarrito.textContent = cantidadTotal;

    totalCarrito.textContent =
        "$" + precioTotal.toLocaleString("es-CL");
}


document.addEventListener("click", function(event) {

    const botonCantidad = event.target.closest(".btn-cantidad");

    if (!botonCantidad) {
        return;
    }

    const codigo = botonCantidad.dataset.codigo;
    const accion = botonCantidad.dataset.accion;

    const carrito = obtenerCarrito();

    const item = carrito.find(function(item) {
        return item.codigo === codigo;
    });

    const producto = productos.find(function(producto) {
        return producto.codigo === codigo;
    });

    if (!item || !producto) {
        return;
    }

    if (accion === "sumar") {

        const cantidadActual = carrito.reduce(function(total, item) {
            return total + item.cantidad;
        }, 0);

        if (cantidadActual >= MAXIMO_CARRITO) {
            mostrarNotificacion(
                "Has alcanzado el máximo de 20 productos en el carrito.",
                true
            );
            return;
        }

        if (item.cantidad < producto.stock) {
            item.cantidad++;
        } else {
            mostrarNotificacion(
                "No puedes superar el stock disponible.",
                true
            );
            return;
        }
    }

    if (accion === "restar") {

        item.cantidad--;

        if (item.cantidad <= 0) {

            const indice = carrito.findIndex(function(item) {
                return item.codigo === codigo;
            });

            carrito.splice(indice, 1);
        }
    }

    guardarCarrito(carrito);

    mostrarCarrito();
});


document.addEventListener("click", function(event) {

    const botonEliminar = event.target.closest(".btn-eliminar");

    if (!botonEliminar) {
        return;
    }

    const codigo = botonEliminar.dataset.codigo;

    const carrito = obtenerCarrito();

    const nuevoCarrito = carrito.filter(function(item) {
        return item.codigo !== codigo;
    });

    guardarCarrito(nuevoCarrito);

    mostrarCarrito();
});

mostrarCarrito();


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

    function mostrarMensaje(campo, mensaje, esError = true) {

        let mensajeElemento = campo.parentElement.querySelector(
            ".mensaje-validacion"
        );

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
            "Código válido.",
            false
        );

        return true;
    }


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
            "Nombre válido.",
            false
        );

        return true;
    }


    function validarDescripcion() {

        const valor = descripcion.value.trim();

        if (valor.length > 500) {
            mostrarMensaje(
                descripcion,
                "La descripción no puede superar los 500 caracteres."
            );
            return false;
        }

        if (valor !== "") {
            mostrarMensaje(
                descripcion,
                "Descripción válida.",
                false
            );
        } else {
            mostrarMensaje(
                descripcion,
                "Descripción opcional.",
                false
            );
        }

        return true;
    }


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
                "Atención: el stock actual está en nivel crítico."
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


    codigo.addEventListener("input", validarCodigo);
    nombre.addEventListener("input", validarNombre);
    descripcion.addEventListener("input", validarDescripcion);
    precio.addEventListener("input", validarPrecio);
    stock.addEventListener("input", validarStock);
    stockCritico.addEventListener("input", validarStockCritico);
    categoria.addEventListener("change", validarCategoria);


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

// ======================================================
// VALIDACIÓN DE ADMINISTRACIÓN DE USUARIOS
// ======================================================

const formUsuario = document.getElementById("formUsuario");

if (formUsuario) {

    const runUsuario = document.getElementById("runUsuario");
    const nombreUsuario = document.getElementById("nombreUsuario");
    const apellidosUsuario = document.getElementById("apellidosUsuario");
    const correoUsuario = document.getElementById("correoUsuario");
    const fechaNacimiento = document.getElementById("fechaNacimiento");
    const tipoUsuario = document.getElementById("tipoUsuario");
    const direccionUsuario = document.getElementById("direccionUsuario");


    // Mostrar mensajes debajo de cada campo
    function mostrarMensajeUsuario(campo, mensaje, esError = true) {

        let mensajeCampo = campo.parentElement.querySelector(".mensaje-validacion");

        if (!mensajeCampo) {
            mensajeCampo = document.createElement("small");
            mensajeCampo.className = "mensaje-validacion";
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


    // =========================
    // VALIDAR RUN
    // =========================

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

        if (!/^[0-9]{7,8}[0-9K]$/.test(run)) {
            mostrarMensajeUsuario(
                runUsuario,
                "El RUN debe tener entre 7 y 9 caracteres y terminar en un dígito o K."
            );
            return false;
        }

        // Validación del dígito verificador
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


    // =========================
    // VALIDAR NOMBRE
    // =========================

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


    // =========================
    // VALIDAR APELLIDOS
    // =========================

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


    // =========================
    // VALIDAR CORREO
    // =========================

    function validarCorreo() {

        const correo = correoUsuario.value.trim().toLowerCase();

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


    // =========================
    // VALIDAR TIPO DE USUARIO
    // =========================

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


    // =========================
    // VALIDAR DIRECCIÓN
    // =========================

    function validarDireccion() {

        const direccion = direccionUsuario.value.trim();

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


    // =========================
    // VALIDACIÓN EN TIEMPO REAL
    // =========================

    runUsuario.addEventListener("input", validarRUN);

    nombreUsuario.addEventListener("input", validarNombre);

    apellidosUsuario.addEventListener("input", validarApellidos);

    correoUsuario.addEventListener("input", validarCorreo);

    tipoUsuario.addEventListener("change", validarTipoUsuario);

    direccionUsuario.addEventListener("input", validarDireccion);


    // =========================
    // ENVIAR FORMULARIO
    // =========================

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
                "✅ Usuario validado correctamente."
            );

            formUsuario.reset();

            // Limpiar mensajes después de guardar
            const mensajes =
                formUsuario.querySelectorAll(".mensaje-validacion");

            mensajes.forEach(function(mensaje) {
                mensaje.remove();
            });

        } else {

            mostrarNotificacion(
                "⚠️ Revisa los campos marcados antes de continuar.",
                true
            );
        }
    });


    // =========================
    // LIMPIAR MENSAJES AL REINICIAR
    // =========================

    formUsuario.addEventListener("reset", function() {

        setTimeout(function() {

            const mensajes =
                formUsuario.querySelectorAll(".mensaje-validacion");

            mensajes.forEach(function(mensaje) {
                mensaje.remove();
            });

        }, 0);
    });
}