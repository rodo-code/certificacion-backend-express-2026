# Práctica 2 para Martes 19 de Mayo
---

## Ejercicio 1: Filtrar productos disponibles

### Objetivo

Practicar el uso de arrays, objetos y el método `filter()`.

### Enunciado

Tienes un arreglo de productos. Cada producto tiene nombre, precio y disponibilidad.

Debes crear una función llamada:

```js
filtrarDisponibles(productos)
```

La función debe devolver un nuevo arreglo que contenga únicamente los productos disponibles.

### Reglas o Restricciones

- La función debe recibir un arreglo de objetos.
- Cada objeto tiene las propiedades:
  - `nombre`
  - `precio`
  - `disponible`
- Solo deben incluirse los productos cuyo valor de `disponible` sea `true`.
- Se debe usar `filter()`.
- No se debe modificar el arreglo original.

### Ejemplo esperado

```js
const productos = [
  { nombre: "Laptop", precio: 4500, disponible: true },
  { nombre: "Mouse", precio: 80, disponible: false },
  { nombre: "Teclado", precio: 150, disponible: true }
];

console.log(filtrarDisponibles(productos));
```

Salida esperada:

```js
[
  { nombre: "Laptop", precio: 4500, disponible: true },
  { nombre: "Teclado", precio: 150, disponible: true }
]
```

---

## Ejercicio 2: Obtener nombres de estudiantes aprobados

### Objetivo

Practicar el uso combinado de `filter()` y `map()`.

### Enunciado

Tienes un arreglo de estudiantes. Cada estudiante tiene un nombre y una nota final.

Debes crear una función llamada:

```js
obtenerAprobados(estudiantes)
```

La función debe devolver un arreglo con los nombres de los estudiantes que aprobaron.

### Reglas o Restricciones

- La función debe recibir un arreglo de objetos.
- Cada objeto tiene las propiedades:
  - `nombre`
  - `nota`
- Un estudiante aprueba si su nota es mayor o igual a `60`.
- Se debe usar `filter()` para seleccionar a los aprobados.
- Se debe usar `map()` para obtener solo los nombres.
- No se debe modificar el arreglo original.

### Ejemplo esperado

```js
const estudiantes = [
  { nombre: "Ana", nota: 85 },
  { nombre: "Luis", nota: 45 },
  { nombre: "Carla", nota: 70 },
  { nombre: "Pedro", nota: 55 }
];

console.log(obtenerAprobados(estudiantes));
```

Salida esperada:

```js
["Ana", "Carla"]
```

---

## Ejercicio 3: Aplicar descuento a productos de una categoría

### Objetivo

Practicar la transformación de arrays de objetos usando `map()`.

### Enunciado

Tienes un arreglo de productos. Cada producto tiene nombre, precio y categoría.

Debes crear una función llamada:

```js
aplicarDescuentoPorCategoria(productos, categoria, descuento)
```

La función debe devolver un nuevo arreglo donde los productos de la categoría indicada tengan aplicado el descuento.

### Reglas o Restricciones

- La función debe recibir:
  - un arreglo de productos;
  - una categoría;
  - un porcentaje de descuento.
- Cada producto tiene las propiedades:
  - `nombre`
  - `precio`
  - `categoria`
- Solo los productos de la categoría indicada reciben descuento.
- El descuento debe aplicarse sobre el precio original.
- Se debe usar `map()`.
- No se debe modificar el arreglo original.

### Ejemplo esperado

```js
const productos = [
  { nombre: "Laptop", precio: 5000, categoria: "tecnologia" },
  { nombre: "Camisa", precio: 200, categoria: "ropa" },
  { nombre: "Mouse", precio: 100, categoria: "tecnologia" }
];

console.log(aplicarDescuentoPorCategoria(productos, "tecnologia", 10));
```

Salida esperada:

```js
[
  { nombre: "Laptop", precio: 4500, categoria: "tecnologia" },
  { nombre: "Camisa", precio: 200, categoria: "ropa" },
  { nombre: "Mouse", precio: 90, categoria: "tecnologia" }
]
```

---

## Ejercicio 4: Resumen de ventas por vendedor

### Objetivo

Practicar el uso de `reduce()` para acumular información a partir de un arreglo de objetos.

### Enunciado

Tienes un arreglo de ventas. Cada venta tiene vendedor, producto y monto.

Debes crear una función llamada:

```js
calcularVentasPorVendedor(ventas)
```

La función debe devolver un objeto donde cada propiedad sea el nombre de un vendedor y su valor sea el total vendido.

### Reglas o Restricciones

- La función debe recibir un arreglo de objetos.
- Cada objeto tiene las propiedades:
  - `vendedor`
  - `producto`
  - `monto`
- Se debe sumar el monto total vendido por cada vendedor.
- Se debe usar `reduce()`.
- No se debe modificar el arreglo original.

### Ejemplo esperado

```js
const ventas = [
  { vendedor: "Ana", producto: "Laptop", monto: 5000 },
  { vendedor: "Luis", producto: "Mouse", monto: 100 },
  { vendedor: "Ana", producto: "Teclado", monto: 200 },
  { vendedor: "Luis", producto: "Monitor", monto: 900 }
];

console.log(calcularVentasPorVendedor(ventas));
```

Salida esperada:

```js
{
  Ana: 5200,
  Luis: 1000
}
```

---

## Ejercicio 5: Generar reporte de inventario crítico

### Objetivo

Practicar el encadenamiento de funciones de orden superior como `filter()`, `map()` y `sort()`.

### Enunciado

Tienes un arreglo de productos en inventario. Cada producto tiene nombre, stock, stock mínimo y precio.

Debes crear una función llamada:

```js
generarReporteInventarioCritico(productos)
```

La función debe devolver un arreglo con los productos cuyo stock sea menor o igual al stock mínimo.

Cada producto del reporte debe incluir:

- `nombre`
- `stock`
- `stockMinimo`
- `valorFaltante`

El `valorFaltante` representa cuánto costaría comprar las unidades necesarias para llegar al stock mínimo.

### Reglas o Restricciones

- La función debe recibir un arreglo de objetos.
- Cada objeto tiene las propiedades:
  - `nombre`
  - `stock`
  - `stockMinimo`
  - `precio`
- Solo deben incluirse productos con `stock <= stockMinimo`.
- El `valorFaltante` debe calcularse así:

```js
(stockMinimo - stock) * precio
```

- Si el stock es igual al stock mínimo, el `valorFaltante` debe ser `0`.
- Se debe usar `filter()` y `map()`.
- El resultado debe ordenarse de mayor a menor según `valorFaltante`.
- No se debe modificar el arreglo original.

### Ejemplo esperado

```js
const productos = [
  { nombre: "Laptop", stock: 2, stockMinimo: 5, precio: 5000 },
  { nombre: "Mouse", stock: 10, stockMinimo: 5, precio: 100 },
  { nombre: "Teclado", stock: 3, stockMinimo: 3, precio: 200 },
  { nombre: "Monitor", stock: 1, stockMinimo: 4, precio: 900 }
];

console.log(generarReporteInventarioCritico(productos));
```

Salida esperada:

```js
[
  { nombre: "Laptop", stock: 2, stockMinimo: 5, valorFaltante: 15000 },
  { nombre: "Monitor", stock: 1, stockMinimo: 4, valorFaltante: 2700 },
  { nombre: "Teclado", stock: 3, stockMinimo: 3, valorFaltante: 0 }
]
```

---

## Ejercicio 6: Agrupar estudiantes por estado académico

### Objetivo

Practicar el uso de `map()` y `reduce()` para transformar y agrupar datos.

### Enunciado

Tienes un arreglo de estudiantes. Cada estudiante tiene nombre y un arreglo de notas.

Debes crear una función llamada:

```js
agruparPorEstadoAcademico(estudiantes)
```

La función debe calcular el promedio de cada estudiante y agruparlos en tres categorías:

- `excelente`
- `aprobado`
- `reprobado`

### Reglas o Restricciones

- La función debe recibir un arreglo de objetos.
- Cada objeto tiene las propiedades:
  - `nombre`
  - `notas`
- El promedio debe calcularse a partir del arreglo `notas`.
- Si el promedio es mayor o igual a `90`, el estudiante pertenece a `excelente`.
- Si el promedio es mayor o igual a `60` y menor a `90`, pertenece a `aprobado`.
- Si el promedio es menor a `60`, pertenece a `reprobado`.
- Cada estudiante agrupado debe tener:
  - `nombre`
  - `promedio`
- Se debe usar `map()` para calcular los promedios.
- Se debe usar `reduce()` para agrupar.
- No se debe modificar el arreglo original.

### Ejemplo esperado

```js
const estudiantes = [
  { nombre: "Ana", notas: [95, 90, 100] },
  { nombre: "Luis", notas: [50, 60, 55] },
  { nombre: "Carla", notas: [70, 80, 75] },
  { nombre: "Pedro", notas: [40, 45, 50] }
];

console.log(agruparPorEstadoAcademico(estudiantes));
```

Salida esperada:

```js
{
  excelente: [
    { nombre: "Ana", promedio: 95 }
  ],
  aprobado: [
    { nombre: "Carla", promedio: 75 }
  ],
  reprobado: [
    { nombre: "Luis", promedio: 55 },
    { nombre: "Pedro", promedio: 45 }
  ]
}
```

---

## Ejercicio 7: Analizador de pedidos de clientes

### Objetivo

Practicar el procesamiento avanzado de arrays y objetos usando `filter()`, `map()`, `reduce()` y `some()`.

### Enunciado

Tienes un arreglo de pedidos. Cada pedido pertenece a un cliente y contiene una lista de productos comprados.

Debes crear una función llamada:

```js
analizarPedidos(pedidos)
```

La función debe devolver un objeto con la siguiente información:

- `clientesConPedidosGrandes`
- `totalVendido`
- `productosVendidos`
- `pedidosConDescuento`

### Reglas o Restricciones

- La función debe recibir un arreglo de objetos.
- Cada pedido tiene las propiedades:
  - `cliente`
  - `productos`
  - `tieneDescuento`
- Cada producto dentro de `productos` tiene:
  - `nombre`
  - `precio`
  - `cantidad`
- `clientesConPedidosGrandes` debe contener los nombres de clientes cuyo pedido supere los `1000`.
- `totalVendido` debe ser la suma total de todos los pedidos.
- `productosVendidos` debe ser un objeto donde cada propiedad sea el nombre del producto y su valor sea la cantidad total vendida.
- `pedidosConDescuento` debe contener solo los pedidos que tienen descuento.
- Se debe usar al menos tres de las siguientes funciones:
  - `filter()`
  - `map()`
  - `reduce()`
  - `some()`
- No se debe modificar el arreglo original.

### Ejemplo esperado

```js
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
```

Salida esperada:

```js
{
  clientesConPedidosGrandes: ["Ana", "Carla"],
  totalVendido: 7300,
  productosVendidos: {
    Laptop: 1,
    Mouse: 3,
    Teclado: 1,
    Monitor: 2
  },
  pedidosConDescuento: [
    {
      cliente: "Ana",
      tieneDescuento: true,
      productos: [
        { nombre: "Laptop", precio: 5000, cantidad: 1 },
        { nombre: "Mouse", precio: 100, cantidad: 2 }
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
  ]
}
```
