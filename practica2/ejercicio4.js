let calcularVentasPorVendedor = function (ventas) {
  return ventas.reduce((acumulador, venta) => {
    acumulador[venta.vendedor] = (acumulador[venta.vendedor] || 0) + venta.monto;
    return acumulador;
  }, {}); 
};

const ventas = [
  { vendedor: "Ana", producto: "Laptop", monto: 5000 },
  { vendedor: "Luis", producto: "Mouse", monto: 100 },
  { vendedor: "Ana", producto: "Teclado", monto: 200 },
  { vendedor: "Luis", producto: "Monitor", monto: 900 }
];

console.log(calcularVentasPorVendedor(ventas));