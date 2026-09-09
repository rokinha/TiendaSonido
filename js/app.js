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