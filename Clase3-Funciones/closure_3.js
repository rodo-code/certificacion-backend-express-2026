function multiplicar(b){
    return (a) => a*b;
}

const multiplicarPorDos = multiplicar(2);
console.log(multiplicarPorDos(5)); // Output: 10