document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        // Obtener los valores de los campos
        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const mensaje = document.querySelector("textarea[name='mensaje']").value.trim();

        // Verificar si los campos están vacíos
        if (!nombre || !correo || !mensaje) {
            console.error("Por favor, complete todos los campos antes de enviar el formulario.");
            event.preventDefault(); // Evita que el formulario se envíe
        } else {
            console.log("Todos los campos están completos. Formulario enviado correctamente.");
        }
    });
});

