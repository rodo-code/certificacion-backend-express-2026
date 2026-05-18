function saludarNombre(nombre) {
    let mensaje = "Hola " + nombre;
    return function() {
        console.log(mensaje);
    }
}

let saludarAna = saludarNombre("Ana");
let saludarPepe = saludarNombre("Pepe");
saludarAna(); // Imprime: Hola Ana
saludarPepe(); // Imprime: Hola Pepe