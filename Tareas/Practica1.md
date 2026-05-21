# Práctica 1 para Viernes 15 de mayo

---

# Ejercicio 1: Calculadora de descuentos inteligentes

## Objetivo

Crear una función que calcule el precio final de un producto aplicando descuentos según distintas reglas.

## Enunciado

Diseña una función llamada:

```js
calcularPrecioFinal(precio, categoria, esClienteFrecuente)
```

La función debe recibir:

- `precio`: precio original del producto.
- `categoria`: categoría del producto.
- `esClienteFrecuente`: valor booleano que indica si el cliente es frecuente.

## Reglas

- Si la categoría es `"tecnologia"`, aplicar 10% de descuento.
- Si la categoría es `"ropa"`, aplicar 15% de descuento.
- Si la categoría es `"alimentos"`, aplicar 5% de descuento.
- Si el cliente es frecuente, aplicar un 5% adicional sobre el precio ya descontado.
- Si el precio final supera los 1000 Bs, aplicar otros 50 Bs de descuento.
- La función debe retornar el precio final.

## Ejemplo esperado

```js
console.log(calcularPrecioFinal(1200, "tecnologia", true));
```

Salida esperada aproximada:

```txt
976
```

---

# Ejercicio 2: Evaluador de contraseñas seguras

## Objetivo

Crear funciones que analicen si una contraseña es segura.

## Enunciado

Diseña una función principal llamada:

```js
evaluarPassword(password)
```

La función debe analizar una contraseña y devolver un mensaje según su nivel de seguridad.

## Criterios

La contraseña debe cumplir con lo siguiente:

- Tener al menos 8 caracteres.
- Tener al menos una letra mayúscula.
- Tener al menos una letra minúscula.
- Tener al menos un número.
- Tener al menos un símbolo, por ejemplo: `!`, `@`, `#`, `$`, `%`, `&`.

## Resultado esperado

Si cumple todos los criterios:

```txt
Contraseña segura
```

Si no cumple todos los criterios:

```txt
Contraseña débil: falta mayúscula, falta número...
```

## Ejemplo

```js
console.log(evaluarPassword("hola123"));
```

Salida esperada:

```txt
Contraseña débil: falta longitud mínima, falta mayúscula, falta símbolo
```

---

# Ejercicio 3: Sistema de calificaciones con funciones

## Objetivo

Crear varias funciones pequeñas que trabajen juntas para generar un reporte de estudiantes.

## Enunciado

Tienes el siguiente arreglo de estudiantes:

```js
const estudiantes = [
  { nombre: "Ana", notas: [80, 90, 75] },
  { nombre: "Luis", notas: [50, 60, 58] },
  { nombre: "Carla", notas: [95, 92, 98] },
  { nombre: "Pedro", notas: [40, 45, 50] }
];
```

Diseña las siguientes funciones:

```js
calcularPromedio(notas)
obtenerEstado(promedio)
generarReporte(estudiantes)
```

## Reglas

- `calcularPromedio(notas)` debe recibir un arreglo de notas y devolver el promedio.
- `obtenerEstado(promedio)` debe devolver:
  - `"Aprobado"` si el promedio es mayor o igual a 60.
  - `"Reprobado"` si el promedio es menor a 60.
- `generarReporte(estudiantes)` debe devolver un nuevo arreglo con esta estructura:

```js
[
  {
    nombre: "Ana",
    promedio: 81.67,
    estado: "Aprobado"
  }
]
```

## Ejemplo esperado

```js
console.log(generarReporte(estudiantes));
```

Salida esperada:

```js
[
  { nombre: "Ana", promedio: 81.67, estado: "Aprobado" },
  { nombre: "Luis", promedio: 56, estado: "Reprobado" },
  { nombre: "Carla", promedio: 95, estado: "Aprobado" },
  { nombre: "Pedro", promedio: 45, estado: "Reprobado" }
]
```

---

# Ejercicio 4: Generador de IDs para registros de usuarios

## Objetivo

Crear una función que use **closures** para generar IDs únicos, simulando un caso común en backend.

## Contexto backend

En un servidor backend, muchas veces necesitamos generar identificadores para usuarios, productos, pedidos o tickets. Aunque en sistemas reales se suelen usar bases de datos o UUIDs, este ejercicio ayuda a entender cómo una función puede “recordar” un valor interno.

## Enunciado

Diseña una función llamada:

```js
crearGeneradorDeIds(prefijo)
```

Esta función debe recibir un `prefijo` y devolver otra función que genere IDs consecutivos.

## Reglas

- La función externa debe recibir un prefijo, por ejemplo `"USR"`, `"PROD"` o `"ORD"`.
- Debe existir una variable interna `contador`.
- La función interna debe aumentar el contador cada vez que se ejecute.
- Debe devolver un ID con este formato:

```txt
USR-1
USR-2
USR-3
```

## Ejemplo esperado

```js
const generarIdUsuario = crearGeneradorDeIds("USR");

console.log(generarIdUsuario());
console.log(generarIdUsuario());
console.log(generarIdUsuario());
```

Salida esperada:

```txt
USR-1
USR-2
USR-3
```

Otro ejemplo:

```js
const generarIdProducto = crearGeneradorDeIds("PROD");

console.log(generarIdProducto());
console.log(generarIdProducto());
```

Salida esperada:

```txt
PROD-1
PROD-2
```


## Reto extra

Modificar la función para que el contador pueda iniciar desde un número personalizado:

```js
crearGeneradorDeIds("USR", 100)
```

Salida esperada:

```txt
USR-101
USR-102
USR-103
```

---

# Ejercicio 5: Middleware simple para contar peticiones por usuario

## Objetivo

Crear una función que use **closures** para contar cuántas veces un usuario realiza una acción, simulando un control básico de peticiones en backend.

## Contexto backend

En backend, a veces se necesita controlar cuántas veces un usuario intenta hacer algo. Por ejemplo:

- iniciar sesión;
- consultar una API;
- descargar un archivo;
- enviar un formulario;
- hacer demasiadas peticiones en poco tiempo.

Este concepto se relaciona con ideas como **rate limiting** o control de intentos.

## Enunciado

Diseña una función llamada:

```js
crearContadorDePeticiones(limite)
```

Esta función debe recibir un número `limite` y devolver otra función que registre peticiones.

## Reglas

- La función externa recibe el límite máximo de peticiones permitidas.
- Debe existir una variable interna `contador`.
- Cada vez que se ejecute la función interna, el contador debe aumentar.
- Si el contador es menor o igual al límite, debe devolver:

```txt
Petición permitida. Intento 1 de 3
```

- Si el contador supera el límite, debe devolver:

```txt
Límite excedido. Intenta más tarde.
```

## Ejemplo esperado

```js
const verificarPeticion = crearContadorDePeticiones(3);

console.log(verificarPeticion());
console.log(verificarPeticion());
console.log(verificarPeticion());
console.log(verificarPeticion());
```

Salida esperada:

```txt
Petición permitida. Intento 1 de 3
Petición permitida. Intento 2 de 3
Petición permitida. Intento 3 de 3
Límite excedido. Intenta más tarde.
```


## Reto extra

Modificar la función para que reciba el nombre del usuario:

```js
const peticionesAna = crearContadorDePeticiones("Ana", 3);
```

Salida esperada:

```txt
Ana: petición permitida. Intento 1 de 3
Ana: petición permitida. Intento 2 de 3
Ana: petición permitida. Intento 3 de 3
Ana: límite excedido. Intenta más tarde.
```

## Reto extra avanzado

Crear un objeto con varios usuarios, donde cada usuario tenga su propio contador independiente:

```js
const ana = crearContadorDePeticiones("Ana", 3);
const luis = crearContadorDePeticiones("Luis", 2);

console.log(ana());
console.log(ana());
console.log(luis());
console.log(ana());
console.log(luis());
console.log(luis());
```

Salida esperada:

```txt
Ana: petición permitida. Intento 1 de 3
Ana: petición permitida. Intento 2 de 3
Luis: petición permitida. Intento 1 de 2
Ana: petición permitida. Intento 3 de 3
Luis: petición permitida. Intento 2 de 2
Luis: límite excedido. Intenta más tarde.
```
