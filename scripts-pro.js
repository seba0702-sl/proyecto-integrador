// Array de productos
const productos = [
    { id: 1, nombre: "Producto 1", imagen: "/imagenes/producto1.png", descripcion: "Este es el Producto 1." },
    { id: 2, nombre: "Producto 2", imagen: "/imagenes/producto2.png", descripcion: "Este es el Producto 2." },
    { id: 3, nombre: "Producto 3", imagen: "/imagenes/producto3.png", descripcion: "Este es el Producto 3." },
    { id: 4, nombre: "Producto 4", imagen: "/imagenes/producto4.png", descripcion: "Este es el Producto 4." }
];

// Función para mostrar productos en la página
function mostrarProductos(productos) {
    const contenedor = document.getElementById("tarjetas-contenedor"); // Contenedor de las tarjetas
    contenedor.innerHTML = ""; // Limpiar contenido previo

    // Crear el HTML dinámico
    productos.forEach(producto => {
        const tarjetaHTML = `
            <div class="tarjeta" data-id="${producto.id}">
                <h2>${producto.nombre}</h2>
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <p>${producto.descripcion}</p>
                <a href="#" class="ver-mas" data-id="${producto.id}">Ver más</a>
            </div>
        `;

        // Agregar la tarjeta al contenedor
        contenedor.innerHTML += tarjetaHTML;
    });

    // Agregar evento a los botones "Ver más"
    const botonesVerMas = document.querySelectorAll(".ver-mas");
    botonesVerMas.forEach(boton => {
        boton.addEventListener("click", event => {
            event.preventDefault();
            const idProducto = boton.getAttribute("data-id");
            const productoSeleccionado = productos.find(p => p.id == idProducto);
            alert(`Descripción: ${productoSeleccionado.descripcion}`);
        });
    });
}

// Llamar a la función para generar las tarjetas
mostrarProductos(productos);

// Función para obtener los productos desde la API
async function obtenerProductos() {
    try {
        const response = await fetch('https://api.ejemplo.com/productos'); // Reemplaza con la URL de tu API
        const productos = await response.json(); // Convertir la respuesta en formato JSON

        // Llamar a la función para mostrar los productos
        mostrarProductos(productos);
    } catch (error) {
        console.error('Error al obtener los productos:', error);
    }
}

// Función para mostrar productos en la página
function mostrarProductos(productos) {
    const contenedor = document.getElementById("tarjetas-contenedor"); // Contenedor de las tarjetas
    contenedor.innerHTML = ""; // Limpiar contenido previo

    // Crear el HTML dinámico
    productos.forEach(producto => {
        const tarjetaHTML = `
            <div class="tarjeta" data-id="${producto.id}">
                <h2>${producto.nombre}</h2>
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <p>${producto.descripcion}</p>
                <a href="#" class="ver-mas" data-id="${producto.id}">Ver más</a>
            </div>
        `;

        // Agregar la tarjeta al contenedor
        contenedor.innerHTML += tarjetaHTML;
    });

    // Agregar evento a los botones "Ver más"
    const botonesVerMas = document.querySelectorAll(".ver-mas");
    botonesVerMas.forEach(boton => {
        boton.addEventListener("click", event => {
            event.preventDefault();
            const idProducto = boton.getAttribute("data-id");
            const productoSeleccionado = productos.find(p => p.id == idProducto);
            alert(`Descripción: ${productoSeleccionado.descripcion}`);
        });
    });
}

// Llamar a la función para obtener los productos desde la API
obtenerProductos();
