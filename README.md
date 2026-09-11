# Tienda Sonido Vivo

Proyecto frontend de una tienda de instrumentos y productos musicales,
desarrollado para la asignatura **FullStack 2 (DSY1104)**.

Actualmente el proyecto se encuentra enfocado en la construcción de la
interfaz web, navegación, catálogo dinámico, carrito de compras y
validaciones mediante JavaScript.

## Tecnologías utilizadas

-   HTML5
-   CSS3
-   JavaScript
-   Bootstrap 5.3.8
-   LocalStorage

## Estructura del proyecto

``` text
TiendaSonido/
├── index.html
├── productos.html
├── detalle-producto.html
├── carrito.html
├── blog.html
├── detalle-blog.html
├── contacto.html
├── login.html
├── registro.html
├── nosotros.html
├── admin-productos.html
├── admin-usuarios.html
│
├── css/
│   └── estilos.css
│
├── js/
│   ├── app.js
│   ├── productos.js
│   ├── validacion-admin-productos.js
│   ├── validacion-admin-usuarios.js
│   ├── validacion-contacto.js
│   ├── validacion-login.js
│   └── validacion-registro.js
│
└── img/
    ├── tienda.png
    ├── guitarra.jpg
    ├── bateria.jpg
    ├── microfono.jpg
    ├── logo_sonido_vivo_recortado.png
    └── ondaSonido.png
```

## Páginas desarrolladas

### Inicio

`index.html`

-   Presentación de la tienda.
-   Imagen principal.
-   Sección de productos destacados.
-   Productos destacados generados dinámicamente mediante JavaScript.
-   Navegación hacia las demás páginas.
-   Acceso a inicio de sesión y registro.
-   Acceso a administración.
-   Footer.

### Productos

`productos.html`

-   Catálogo de productos generado dinámicamente desde un array
    JavaScript.
-   Cada producto muestra:
    -   Imagen.
    -   Nombre.
    -   Descripción.
    -   Precio.
    -   Stock disponible.
    -   Botón para agregar al carrito.
-   Al seleccionar un producto se puede acceder a su detalle.

Actualmente el catálogo contiene **51 productos**.

### Detalle de producto

`detalle-producto.html`

-   Recibe el código del producto mediante la URL.
-   Busca el producto correspondiente dentro del array.
-   Muestra dinámicamente:
    -   Categoría.
    -   Nombre.
    -   Imagen.
    -   Descripción.
    -   Marca.
    -   Modelo.
    -   Stock.
    -   Precio.
-   Permite agregar el producto al carrito.
-   Permite volver al listado de productos.

### Carrito

`carrito.html`

El carrito funciona utilizando `localStorage`.

Actualmente permite:

-   Agregar productos.
-   Aumentar cantidades.
-   Disminuir cantidades.
-   Eliminar productos.
-   Calcular cantidad total.
-   Calcular precio total.
-   Mostrar subtotales.
-   Controlar el stock disponible.
-   Limitar el carrito a un máximo de **20 unidades**.
-   Mantener los productos guardados aunque se recargue la página.

La información guardada en `localStorage` utiliza la clave:

``` text
carritoSonidoVivo
```

### Blog

`blog.html`

Página destinada al contenido del blog de la tienda.

### Detalle de blog

`detalle-blog.html`

Página destinada a mostrar el detalle de una publicación del blog.

### Nosotros

`nosotros.html`

Página informativa sobre la tienda.

### Contacto

`contacto.html`

Formulario de contacto con validación mediante JavaScript.

### Registro

`registro.html`

Formulario de registro de usuario con validación mediante JavaScript.

### Inicio de sesión

`login.html`

Formulario de inicio de sesión con validación mediante JavaScript.

## Administración

### Administración de productos

`admin-productos.html`

Actualmente contiene un formulario para ingresar nuevos productos.

Campos:

-   Código.
-   Nombre.
-   Descripción.
-   Precio.
-   Stock.
-   Stock crítico.
-   Categoría.
-   Imagen.

La validación se encuentra separada en:

``` text
js/validacion-admin-productos.js
```

La validación contempla:

-   Código obligatorio y mínimo de 3 caracteres.
-   Nombre obligatorio y máximo de 100 caracteres.
-   Descripción opcional y máximo de 500 caracteres.
-   Precio obligatorio y mayor o igual a 0.
-   Stock obligatorio, mayor o igual a 0 y entero.
-   Stock crítico opcional, mayor o igual a 0 y entero.
-   Aviso cuando el stock se encuentra en nivel crítico.
-   Categoría obligatoria.
-   Mensajes de validación en tiempo real.

Por el momento **no se implementa CRUD completo, edición ni eliminación
de productos**.

### Administración de usuarios

`admin-usuarios.html`

Formulario para ingresar usuarios.

Campos actuales:

-   RUN.
-   Nombre.
-   Apellidos.
-   Correo.
-   Fecha de nacimiento.
-   Tipo de usuario.
-   Dirección.

La validación se encuentra separada en:

``` text
js/validacion-admin-usuarios.js
```

La validación contempla:

-   RUN obligatorio.
-   RUN sin puntos ni guion.
-   Validación del dígito verificador.
-   Nombre obligatorio y máximo de 50 caracteres.
-   Apellidos obligatorios y máximo de 100 caracteres.
-   Correo obligatorio y máximo de 100 caracteres.
-   Correos permitidos:
    -   `@duoc.cl`
    -   `@profesor.duoc.cl`
    -   `@gmail.com`
-   Tipo de usuario obligatorio.
-   Dirección obligatoria y máximo de 300 caracteres.
-   Mensajes de validación en tiempo real.

Los tipos de usuario disponibles actualmente son:

-   Admin
-   Client
-   Seller

La fecha de nacimiento se mantiene como campo opcional.

## JavaScript

### `productos.js`

Contiene el catálogo de productos utilizado por la tienda.

Los productos se manejan mediante un array de objetos con información
como:

-   Código.
-   Categoría.
-   Nombre.
-   Marca.
-   Modelo.
-   Stock.
-   Precio.
-   Descripción.
-   Imagen.

### `app.js`

Actualmente se encarga de:

-   Generar dinámicamente el listado de productos.
-   Generar el detalle de cada producto.
-   Generar los productos destacados del inicio.
-   Gestionar el carrito de compras.
-   Guardar y recuperar el carrito mediante `localStorage`.
-   Controlar cantidades y stock.
-   Mostrar notificaciones del carrito.

Las validaciones administrativas fueron separadas de este archivo para
mantener una mejor organización.

## Diseño

El proyecto utiliza:

-   Bootstrap 5.3.8.
-   CSS personalizado mediante `css/estilos.css`.
-   Diseño responsive.
-   Navbar responsive.
-   Tarjetas de productos.
-   Botones personalizados.
-   Mensajes de validación.
-   Notificaciones del carrito.
-   Imágenes adaptables a diferentes tamaños de pantalla.

## Navegación

La barra de navegación permite acceder actualmente a:

-   Inicio.
-   Productos.
-   Blog.
-   Nosotros.
-   Contacto.
-   Carrito.
-   Administración.

Dentro de administración se puede acceder a:

-   Productos.
-   Usuarios.

## Estado actual del proyecto

### Implementado

-   [x] Estructura HTML.
-   [x] HTML semántico.
-   [x] Diseño responsive.
-   [x] Bootstrap.
-   [x] CSS personalizado.
-   [x] Navbar.
-   [x] Catálogo dinámico.
-   [x] Detalle dinámico de productos.
-   [x] Productos destacados.
-   [x] Carrito de compras.
-   [x] Persistencia del carrito con LocalStorage.
-   [x] Validación de contacto.
-   [x] Validación de registro.
-   [x] Validación de inicio de sesión.
-   [x] Validación de administración de productos.
-   [x] Validación de administración de usuarios.
-   [x] Navegación entre páginas.

### Actualmente fuera del alcance

-   Backend.
-   Base de datos.
-   Autenticación real.
-   Sistema real de roles y permisos.
-   CRUD completo de productos.
-   Edición y eliminación de productos.
-   CRUD completo de usuarios.
-   Procesamiento real de compras o pagos.

El proyecto se mantiene actualmente dentro del alcance frontend
solicitado para esta etapa.
