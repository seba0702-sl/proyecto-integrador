// Simulamos los productos de la API
const productos = [
    { id: 1, nombre: "Producto 1", imagen: "/imagenes/producto1.png", descripcion: "Este es el Producto 1." },
    { id: 2, nombre: "Producto 2", imagen: "/imagenes/producto2.png", descripcion: "Este es el Producto 2." },
    { id: 3, nombre: "Producto 3", imagen: "/imagenes/producto3.png", descripcion: "Este es el Producto 3." },
    { id: 4, nombre: "Producto 4", imagen: "/imagenes/producto4.png", descripcion: "Este es el Producto 4." }
];

// Cargar productos desde el "API" (en este caso, desde el array)
function mostrarProductos(productos) {
    const contenedor = document.getElementById("tarjetas-contenedor");
    contenedor.innerHTML = ""; // Limpiar contenido previo

    productos.forEach(producto => {
        const tarjetaHTML = `
            <div class="tarjeta" data-id="${producto.id}">
                <h2>${producto.nombre}</h2>
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <p>${producto.descripcion}</p>
                <button class="agregar-al-carrito" data-id="${producto.id}">Añadir al carrito</button>
            </div>
        `;
        contenedor.innerHTML += tarjetaHTML;
    });

    // Añadir evento de agregar al carrito
    const botonesAgregar = document.querySelectorAll(".agregar-al-carrito");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", (event) => {
            event.preventDefault();
            const idProducto = boton.getAttribute("data-id");
            agregarAlCarrito(idProducto);
        });
    });
}

// Carrito de compras (usaremos localStorage para persistir entre sesiones)
function obtenerCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    return carrito;
}

// Guardar carrito en localStorage
function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para agregar un producto al carrito
function agregarAlCarrito(idProducto) {
    let carrito = obtenerCarrito();

    // Verificar si el producto ya está en el carrito
    const productoEnCarrito = carrito.find(item => item.id === parseInt(idProducto));

    if (productoEnCarrito) {
        // Si ya está, incrementamos la cantidad
        productoEnCarrito.cantidad += 1;
    } else {
        // Si no está, lo agregamos al carrito con cantidad 1
        const producto = productos.find(p => p.id == idProducto);
        carrito.push({ ...producto, cantidad: 1 });
    }

    // Guardar el carrito actualizado
    guardarCarrito(carrito);
    mostrarCarrito();
}

// Mostrar los productos del carrito
function mostrarCarrito() {
    const carrito = obtenerCarrito();
    const contenedorCarrito = document.getElementById("carrito");
    contenedorCarrito.innerHTML = ""; // Limpiar el carrito

    carrito.forEach(producto => {
        const productoHTML = `
            <div class="producto-carrito" data-id="${producto.id}">
                <h3>${producto.nombre}</h3>
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <p>${producto.descripcion}</p>
                <label for="cantidad-${producto.id}">Cantidad:</label>
                <input type="number" id="cantidad-${producto.id}" value="${producto.cantidad}" min="1" class="cantidad">
                <button class="eliminar" data-id="${producto.id}">Eliminar</button>
            </div>
        `;
        contenedorCarrito.innerHTML += productoHTML;
    });

    // Agregar eventos para cambiar cantidad y eliminar productos
    const botonesEliminar = document.querySelectorAll(".eliminar");
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", (event) => {
            const idProducto = boton.getAttribute("data-id");
            eliminarDelCarrito(idProducto);
        });
    });

    // Evento para editar cantidad
    const inputsCantidad = document.querySelectorAll(".cantidad");
    inputsCantidad.forEach(input => {
        input.addEventListener("change", (event) => {
            const idProducto = input.getAttribute("id").split('-')[1];
            const nuevaCantidad = parseInt(input.value);
            editarCantidad(idProducto, nuevaCantidad);
        });
    });
}

// Función para editar la cantidad de un producto
function editarCantidad(idProducto, cantidad) {
    let carrito = obtenerCarrito();
    const producto = carrito.find(p => p.id == idProducto);
    if (producto) {
        producto.cantidad = cantidad;
        guardarCarrito(carrito);
        mostrarCarrito();
    }
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(idProducto) {
    let carrito = obtenerCarrito();
    carrito = carrito.filter(p => p.id != idProducto);
    guardarCarrito(carrito);
    mostrarCarrito();
}

// Vaciar carrito
document.getElementById("vaciar-carrito").addEventListener("click", () => {
    localStorage.removeItem("carrito");
    mostrarCarrito();
});

// Mostrar productos al cargar la página
mostrarProductos(productos);
mostrarCarrito();
