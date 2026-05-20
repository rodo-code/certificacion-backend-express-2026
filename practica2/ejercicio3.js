let aplicarDescuentoPorCategoria = function(productos, categoria, descuento) {
   return productos.map(producto => {
    if (producto.categoria === categoria) {
      return {
        nombre: producto.nombre,
        precio: producto.precio - (producto.precio * descuento / 100),
        categoria: producto.categoria
      };
    }
    return producto;
  });
};


const productos = [
  { nombre: "Laptop", precio: 5000, categoria: "tecnologia" },
  { nombre: "Camisa", precio: 200, categoria: "ropa" },
  { nombre: "Mouse", precio: 100, categoria: "tecnologia" }
];

console.log(aplicarDescuentoPorCategoria(productos, "tecnologia", 10));
