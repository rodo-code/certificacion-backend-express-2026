function generarContador(x) {
    let contador = x;
    return () => {
        contador++;
        console.log(contador);
    }
}

let contador = generarContador(3);
contador(); // Imprime 4
contador(); // Imprime 5
contador(); // Imprime 6