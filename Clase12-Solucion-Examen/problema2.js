function generarReporteInventario(productos){
    let productosDisponibles = productos.filter( producto => producto.disponible)
                                        .map(producto => producto.nombre);
    let productosNoDisponibles = productos.filter( producto => !producto.disponible)
                                          .map(producto => producto.nombre);
    let productosConDescuento = productos.filter( producto => producto.disponible)
                                            .map(producto => {
                                                return {
                                                    "nombre": producto.nombre,
                                                    "precioFinal": producto.precio * 0.9
                                                };
                                            });
    let valorTotalInventario = productos.filter(producto => producto.disponible)
                                        .reduce( (acumulador, producto) =>{
                                            acumulador += (producto.stock * producto.precio);
                                            return acumulador;
                                        },0);
    return {
        productosDisponibles,
        productosNoDisponibles,
        productosConDescuento,
        valorTotalInventario
    }
}


const productos = [
{ nombre: "Laptop", precio: 5000, stock: 3, disponible: true },
{ nombre: "Mouse", precio: 100, stock: 10, disponible: true },
{ nombre: "Teclado", precio: 200, stock: 0, disponible: false },
{ nombre: "Monitor", precio: 900, stock: 2, disponible: true }
];

console.log(generarReporteInventario(productos));