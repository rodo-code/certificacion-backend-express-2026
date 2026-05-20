function analizarPedidos(pedidos) {
  const pedidosConTotales = pedidos.map(pedido => {
    const total = pedido.productos.reduce(
      (acc, prod) => acc + prod.precio * prod.cantidad,
      0
    );
   return {
      cliente: pedido.cliente,
      tieneDescuento: pedido.tieneDescuento,
      productos: pedido.productos,
      total: total
    };
  });

  const clientesConPedidosGrandes = pedidosConTotales
    .filter(p => p.total > 1000)
    .map(p => p.cliente);

  const totalVendido = pedidosConTotales.reduce(
    (acc, p) => acc + p.total,
    0
  );

  const productosVendidos = pedidos.reduce((acc, pedido) => {
    pedido.productos.forEach(prod => {
      acc[prod.nombre] = (acc[prod.nombre] || 0) + prod.cantidad;
    });
    return acc;
  }, {});

  const pedidosConDescuento = pedidos.filter(p => p.tieneDescuento);

  return {
    clientesConPedidosGrandes,
    totalVendido,
    productosVendidos,
    pedidosConDescuento
  };
}

const pedidos = [
  {
    cliente: "Ana",
    tieneDescuento: true,
    productos: [
      { nombre: "Laptop", precio: 5000, cantidad: 1 },
      { nombre: "Mouse", precio: 100, cantidad: 2 }
    ]
  },
  {
    cliente: "Luis",
    tieneDescuento: false,
    productos: [
      { nombre: "Teclado", precio: 200, cantidad: 1 }
    ]
  },
  {
    cliente: "Carla",
    tieneDescuento: true,
    productos: [
      { nombre: "Monitor", precio: 900, cantidad: 2 },
      { nombre: "Mouse", precio: 100, cantidad: 1 }
    ]
  }
];

console.log(analizarPedidos(pedidos));
