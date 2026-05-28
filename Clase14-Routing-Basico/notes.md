# Notas de la clase 14 - Ruteo Básico

## Recordamos la estructura de ruteo básico

Para manejar una ruta en Express, seguimos la siguiente notación:

```javascript
app.METHOD(PATH, HANDLER);
```

Donde:
- `METHOD` es un método http disponible en express, puedes ver todos los métodos disponibles en este [enlace](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods).
- `PATH` es la ruta, puedes aprender más de las rutas en el siguiente [enlace](https://expressjs.com/en/guide/routing/#route-paths).
- `HANDLER` es la función manejadora de la ruta, usualmente recibe `(req,res)`.

## Recibir Parámetros en la ruta

Para recibir parámetros en la ruta de la petición, podemos usar la siguiente notación:

```javascript
app.get("/api/users/:id",...)
```

Donde `:id` indica que se recibirá un parámetro por medio de la ruta.

Podemos acceder a este por medio de:

```javascript
const id = req.params.id;
```

## Recibir Parámetros Query 

En el diseño de APIs es recomendado no crear una ruta para cada acción o filtro. Si no estructurar las rutas por el recurso o acción específico que se esta intentando acceder o usar.

Es en este sentido que por ejemplo si tengo una API que devuelve información de estudiantes y quiero saber que estudiantes han reprobado en lugar de crear una nueva ruta, digamos `/api/students/failed` podemos capturar esta **filtro** a traves de un parámetro en el query usando la siguiente ruta `/api/students?pass=false` y podemos leerlo en el codigo haciendo lo siguiente:

```javascript
app.get("/api/students", (req, res) => {
  const pass = req.query.pass;
});
```

Nota que no se crea ninguna nueva expresión para manejar esta ruta, si no unicamente se lee el parametro `query` dentro de la función handler de la petición.

## Documentación de Referencia

- [Guia de Ruteo de Express](https://expressjs.com/en/guide/routing/)