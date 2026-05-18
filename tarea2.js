//Ej1 
function filtrarDisponibles(productos){
    return productos.filter(producto=>producto.disponible===true);
}
const productos = [
  { nombre: "Laptop", precio: 4500, disponible: true },
  { nombre: "Mouse", precio: 80, disponible: false },
  { nombre: "Teclado", precio: 150, disponible: true }
];

console.log(filtrarDisponibles(productos));

//Ej2
function obtenerAprobados(estudiantes){
    return estudiantes.filter(estudiante=>estudiante.nota>=60)
    .map(estudiante=>estudiante.nombre);
}
const estudiantes = [
  { nombre: "Ana", nota: 85 },
  { nombre: "Luis", nota: 45 },
  { nombre: "Carla", nota: 70 },
  { nombre: "Pedro", nota: 55 }
];

console.log(obtenerAprobados(estudiantes));

//Ej3
function aplicarDescuentoPorCategoria(productos, categoria, descuento){
   return productos.map(producto=>{
    if(producto.categoria===categoria){
      return{
        ...producto,
        precio:producto.precio-(producto.precio*descuento/100)
      };
    }
    return producto;
  });
}
const productos1 = [
  { nombre: "Laptop", precio: 5000, categoria: "tecnologia" },
  { nombre: "Camisa", precio: 200, categoria: "ropa" },
  { nombre: "Mouse", precio: 100, categoria: "tecnologia" }
];

console.log(aplicarDescuentoPorCategoria(productos1, "tecnologia", 10));

//Ej4
function calcularVentasPorVendedor(ventas){
    return ventas.reduce((acumulador,venta)=>{
    if(acumulador[venta.vendedor]!=null){
      acumulador[venta.vendedor]+=venta.monto;
    }else{
      acumulador[venta.vendedor]=venta.monto;
    }
    return acumulador;
  },{});
}
const ventas = [
  { vendedor: "Ana", producto: "Laptop", monto: 5000 },
  { vendedor: "Luis", producto: "Mouse", monto: 100 },
  { vendedor: "Ana", producto: "Teclado", monto: 200 },
  { vendedor: "Luis", producto: "Monitor", monto: 900 }
];

console.log(calcularVentasPorVendedor(ventas));

//Ej5
function generarReporteInventarioCritico(productos){
  return productos.filter(producto=>producto.stock<=producto.stockMinimo)
  .map(producto=> ({
    nombre:producto.nombre,
    stock:producto.stock,
    stockMinimo:producto.stockMinimo,
    valorFaltante:(producto.stockMinimo-producto.stock)*producto.precio
  }));
}
const productos2 = [
  { nombre: "Laptop", stock: 2, stockMinimo: 5, precio: 5000 },
  { nombre: "Mouse", stock: 10, stockMinimo: 5, precio: 100 },
  { nombre: "Teclado", stock: 3, stockMinimo: 3, precio: 200 },
  { nombre: "Monitor", stock: 1, stockMinimo: 4, precio: 900 }
];

console.log(generarReporteInventarioCritico(productos2));

//Ej6
function agruparPorEstadoAcademico(estudiantes){
  const estudiantesConPromedio=estudiantes.map(estudiante=>{
    const suma=estudiante.notas.reduce((acumulador,nota)=>acumulador+nota,0);
    const promedio=suma/estudiante.notas.length;
    return{
      nombre:estudiante.nombre,
      promedio:promedio
    };
  });
  return estudiantesConPromedio.reduce((acumulador,estudiante)=>{
    if(estudiante.promedio>=90){
      acumulador.excelente.push(estudiante);
    }else if(estudiante.promedio>=60){
      acumulador.aprobado.push(estudiante);
    }else{
      acumulador.reprobado.push(estudiante);
    }
    return acumulador;
  },{
    excelente:[],
    aprobado:[],
    reprobado:[]
  });
}
const estudiantes1 = [
  { nombre: "Ana", notas: [95, 90, 100] },
  { nombre: "Luis", notas: [50, 60, 55] },
  { nombre: "Carla", notas: [70, 80, 75] },
  { nombre: "Pedro", notas: [40, 45, 50] }
];

console.log(agruparPorEstadoAcademico(estudiantes1));

//Ej7
function analizarPedidos(pedidos){
  const pedidosConTotal=pedidos.map(pedido=>{
    const totalPedido=pedido.productos.reduce((acumulador,producto)=>{
      return acumulador+producto.precio*producto.cantidad;
    },0);
    return{
      ...pedido,
      totalPedido
    };
  });
  const clientesConPedidosGrandes=pedidosConTotal
    .filter(pedido=>pedido.totalPedido>1000)
    .map(pedido=>pedido.cliente);
  const totalVendido=pedidosConTotal.reduce((acumulador,pedido)=>{
    return acumulador+pedido.totalPedido;
  },0);
  const productosVendidos=pedidos.reduce((acumuladorPedidos,pedido)=>{
    pedido.productos.forEach(producto=>{
      if(acumuladorPedidos[producto.nombre]!=null){
        acumuladorPedidos[producto.nombre]+=producto.cantidad;
      }else{
        acumuladorPedidos[producto.nombre]=producto.cantidad;
      }
    });
    return acumuladorPedidos;
  },{});
  const pedidosConDescuento=pedidos.filter(pedido=>pedido.tieneDescuento);
  return {
    clientesConPedidosGrandes,
    totalVendido,
    productosVendidos,
    pedidosConDescuento
  };
}