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

