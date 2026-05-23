# Práctica 3 para Viernes 22 de mayo
---

## Ejercicio 1: Entender async/await

Observa el código localizado en el directorio [Sandbox-Practica3](https://github.com/rodo-code/certificacion-backend-express-2026/blob/main/Sandbox-Practica3) replicalo en tu entorno local (puedes simplemente copiarlo en archivos en tu computadora). Analiza el comportamiento actual del script en `exercise1.js`.

No debes entregar nada de este ejercicio, solo analizar el comportamiento.

Este ejercicio sirve como guia para el resto de la práctica.

## Ejercicio 2: Consumir una Promise

En un nuevo archivo `exercise2.js`, debes invocar a la función `getUser` y consumir su resultado con `.then`, puedes simplemente imprimir el usuario obtenido.

## Ejercicio 3: Encadenar Promises

En un nuevo archivo `exercise3.js`, crea una función `printOrdersByUser` que reciba un `id` y que imprima tanto los datos del usuario, como los datos de las ordenes de ese usuario, para esto debes usar un `.then` encadenado.

Escribe un handler de erroes, y pruebalo enviando un `id` negativo a la función `printOrdersByUser`.

## Ejercicio 4: Async/Await

En un nuevo archivo `exercise4.js`, crea una función asincrona `printOrdersByUser` y replica el comportamiento del ejercicio 3, incluido el manejo de errores.

## Ejercicio 5: Usa Promise.all

En un nuevo archivo `exercise5.js`, crea una función `getData` y usando `Promise.all` obten un usuario y la lista de productos, despues de obtener ambos, imprime la información obtenida.

## Ejercicio 6: Menejo de errores

Analiza el código en `sandbox.js` y modifica la función `getOrders` para manejar el error cuando un `userId` negativo es enviado a la función.

Crea una funcioni `test1` donde captures el error usando `.catch` y luego otra funcion asincrona `test2` donde captures el error usando `try/catch`.

## Ejercicio 7: Consultar información completa de una orden

En un nuevo archivo `exercise7.js`, crea una función asincrona `printOrderSummary` que reciba un `userId` y un `orderId`.

La función debe:

1. Obtener el usuario usando `getUser(userId)`.
2. Obtener las ordenes del usuario usando `getOrders(userId)`.
3. Buscar dentro de las ordenes la orden que tenga el `id` recibido.
4. Si la orden no existe, lanzar un error con `throw`.
5. Si la orden existe, obtener al mismo tiempo:
   - el estado de pago usando `getPaymentStatus(orderId)`;
   - la información de envío usando `getShippingInfo(orderId)`.
6. Imprimir un resumen con:
   - datos del usuario;
   - datos de la orden;
   - estado del pago;
   - estado del envío.

Debes usar:

- `async/await`
- `Promise.all`
- `try/catch`
- `throw` para manejar el caso donde la orden no exista.

Ejemplo de uso:

```js
printOrderSummary(1, 1);
```

Salida esperada aproximada:

```txt
User: Rodolfo
Order: Laptop - 5000
Payment status: paid
Shipping status: shipped
Shipping company: DHL
```

También debes probar el manejo de errores con:

```js
printOrderSummary(1, 99);
printOrderSummary(-1, 1);
```

---

## Ejercicio 8: Obtener detalles de productos de forma paralela

En un nuevo archivo `exercise8.js`, crea una función asincrona `printAvailableProductDetails`.

La función debe:

1. Obtener la lista de productos usando `getProductList()`.
2. Usar esa lista para obtener el detalle de cada producto con `getProductDetail(productName)`.
3. Ejecutar todas las consultas de detalle en paralelo usando `Promise.all`.
4. Filtrar los productos cuyo `stock` sea mayor a `0`.
5. Imprimir solo los productos disponibles.

Debes usar:

- `async/await`
- `Promise.all`
- `map`
- `filter`
- `try/catch`

Ejemplo de uso:

```js
printAvailableProductDetails();
```

Salida esperada aproximada:

```txt
Available products:
Laptop - Technology - stock: 4
Mouse - Accessories - stock: 15
```

No debe imprimirse `Keyboard`, porque tiene stock `0`.
