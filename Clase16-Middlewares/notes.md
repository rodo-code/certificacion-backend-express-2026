# Notas de la Clase 16 - Middlewares

## 1. ¿Qué es un middleware en Express.js?

De acuerdo con la documentación oficial de Express, una aplicación de Express es esencialmente una serie de llamadas a funciones middleware. Un **middleware** es una función que tiene acceso a tres elementos principales dentro del ciclo petición-respuesta:

```js
(req, res, next)
```

Donde:

- `req` representa la petición del cliente.
- `res` representa la respuesta que el servidor enviará.
- `next` es una función que permite pasar el control al siguiente middleware o ruta.

En términos simples, un middleware es una función que se ejecuta **entre la llegada de la petición y la respuesta final del servidor**.

```txt
Cliente → Middleware → Ruta → Respuesta
```

Un middleware puede:

- Ejecutar cualquier código.
- Leer o modificar `req` y `res`.
- Terminar el ciclo petición-respuesta.
- Llamar a `next()` para pasar al siguiente middleware.

Si un middleware no envía una respuesta ni llama a `next()`, la petición queda detenida y el cliente se queda esperando.

---

## 2. Estructura básica de un middleware

```js
function miMiddleware(req, res, next) {
  console.log("Pasó por el middleware");
  next();
}
```

Uso en Express:

```js
app.use(miMiddleware);
```

También se puede escribir directamente así:

```js
app.use((req, res, next) => {
  console.log("Middleware ejecutado");
  next();
});
```

La llamada a `next()` es importante porque le dice a Express:

> “Ya terminé mi trabajo, puedes continuar con el siguiente middleware o con la ruta correspondiente”.

---

## 3. Tipos comunes de middlewares en Express

Express permite trabajar con varios tipos de middlewares:

1. **Middleware de aplicación**: se registra con `app.use()` o `app.METHOD()`.
2. **Middleware de router**: se registra con `router.use()` o `router.METHOD()`.
3. **Middleware de manejo de errores**: recibe cuatro parámetros: `(err, req, res, next)`.
4. **Middleware incorporado**: por ejemplo `express.json()`, `express.urlencoded()` y `express.static()`.
5. **Middleware de terceros**: por ejemplo `cors`, `morgan`, `helmet`, etc.

---

# Ejemplo 1: Middleware para logging consistente

## Objetivo

Registrar información básica de cada petición HTTP que llega al servidor.

Esto ayuda a responder preguntas como:

- ¿Qué método HTTP se usó?
- ¿Qué ruta se solicitó?
- ¿Qué código de estado respondió el servidor?
- ¿Cuánto tiempo tardó la respuesta?

## Código

```js
function requestLogger(req, res, next) {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;

    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });

  next();
}
```

## Uso

```js
app.use(requestLogger);
```

## Explicación

La función `requestLogger` se ejecuta en cada petición. Primero guarda la hora de inicio usando `Date.now()`.

Luego usa:

```js
res.on("finish", () => { ... });
```

Esto permite ejecutar el log cuando la respuesta ya terminó. Así podemos saber el código de estado final (`res.statusCode`) y la duración total de la petición.

Ejemplo de salida en consola:

```txt
GET /students 200 - 4ms
POST /students 201 - 8ms
GET /students/99 404 - 2ms
```

---

# Ejemplo 2: Middleware para manejo de errores

## Objetivo

Centralizar el manejo de errores para no repetir `res.status(...).json(...)` en todas las rutas.

## Código del middleware

```js
function errorHandler(err, req, res, next) {
  console.error(err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  return res.status(statusCode).json({
    success: false,
    message,
    errors: err.errors || null
  });
}
```

## Uso

El middleware de errores debe colocarse **después de las rutas**:

```js
app.use(errorHandler);
```

## Ejemplo de ruta que envía un error al middleware

```js
app.get("/students/:id", (req, res, next) => {
  const students = [
    { id: 1, name: "Ana" },
    { id: 2, name: "Luis" }
  ];

  const id = Number(req.params.id);
  const student = students.find(student => student.id === id);

  if (!student) {
    const error = new Error("Student not found");
    error.statusCode = 404;
    return next(error);
  }

  return res.json({
    success: true,
    message: "Student retrieved successfully",
    data: student
  });
});
```

## Explicación

Un middleware normal tiene tres parámetros:

```js
(req, res, next)
```

Un middleware de errores tiene cuatro parámetros:

```js
(err, req, res, next)
```

Express reconoce que es un middleware de errores porque tiene esa firma de cuatro argumentos.

Cuando llamamos:

```js
next(error);
```

Express salta los middlewares normales restantes y busca el middleware de manejo de errores.

---

# Ejemplo 3: Middleware para respuestas consistentes

## Objetivo

Hacer que todas las respuestas exitosas de la API tengan una misma estructura.

En una API profesional no conviene responder de muchas formas distintas:

```json
{ "name": "Ana" }
```

```json
{ "student": { "name": "Ana" } }
```

```json
{ "ok": true, "result": { "name": "Ana" } }
```

Eso complica el trabajo del frontend y hace que la API sea menos predecible.

Una estructura más consistente sería:

```json
{
  "success": true,
  "message": "Student retrieved successfully",
  "data": {
    "id": 1,
    "name": "Ana"
  }
}
```

## Código del middleware

```js
function responseFormatter(req, res, next) {
  res.success = function (statusCode, message, data = null) {
    return res.status(statusCode).json({
      success: true,
      message,
      data
    });
  };

  next();
}
```

## Uso

```js
app.use(responseFormatter);
```

## Ejemplo de ruta usando `res.success`

```js
app.get("/students", (req, res) => {
  const students = [
    { id: 1, name: "Ana" },
    { id: 2, name: "Luis" }
  ];

  return res.success(200, "Students retrieved successfully", students);
});
```

## Explicación

Este middleware agrega una nueva función al objeto `res`:

```js
res.success(...)
```

Así, todas las rutas pueden responder con la misma estructura sin repetir código.

Esto mejora:

- La legibilidad del backend.
- La consistencia de la API.
- La experiencia del frontend al consumir los datos.

---

# Orden recomendado de middlewares en una API

Un orden razonable para una API básica sería:

```js
app.use(express.json());
app.use(requestLogger);
app.use(responseFormatter);

// Rutas de la API
app.get(...);
app.post(...);

// Middleware de errores al final
app.use(errorHandler);
```

## ¿Por qué este orden?

1. `express.json()` debe estar antes de las rutas para que `req.body` esté disponible.
2. `requestLogger` debe ejecutarse en todas las peticiones.
3. `responseFormatter` debe ejecutarse antes de las rutas para que `res.success()` exista.
4. `errorHandler` debe ir al final para capturar errores enviados con `next(error)`.

---

# Ideas clave para recordar

- Un middleware es una función que participa en el ciclo petición-respuesta.
- Puede ejecutar código, modificar `req` o `res`, terminar la respuesta o llamar a `next()`.
- Si no llama a `next()` ni responde, la petición queda colgada.
- Los middlewares ayudan a evitar código repetido.
- Son muy útiles para logging, autenticación, validación, manejo de errores y respuestas consistentes.
- El middleware de errores tiene cuatro parámetros: `(err, req, res, next)`.
- El orden de los middlewares importa.

---

# Fuentes recomendadas

- Express.js Official Documentation: Using middleware. https://expressjs.com/en/guide/using-middleware.html
- Express.js Official Documentation: Error handling. https://expressjs.com/en/guide/error-handling.html
