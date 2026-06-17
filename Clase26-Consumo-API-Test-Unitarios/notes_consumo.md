# Guía de Notas: Consumo de APIs Externas con Express.js

## 1. ¿Qué significa consumir una API externa?

Consumir una API externa significa que nuestra aplicación backend realiza una petición HTTP hacia otro servicio para obtener, enviar, actualizar o eliminar información.

Ejemplo:

```text
Cliente
   ↓
Nuestra API con Express
   ↓
API externa
```

Una API externa puede ser una API de clima, pagos, mapas, correos, inteligencia artificial o una API pública de práctica como **JSONPlaceholder**.

URL base de JSONPlaceholder:

```text
https://jsonplaceholder.typicode.com
```

---

## 2. ¿Por qué consumir APIs externas desde el backend?

Aunque un frontend también puede consumir APIs externas, muchas veces es mejor hacerlo desde el backend porque:

- Se pueden proteger API keys.
- Se puede controlar mejor la respuesta.
- Se pueden validar datos antes de enviarlos.
- Se pueden manejar errores de forma centralizada.
- Se puede transformar la información antes de enviarla al cliente.

Flujo común:

```text
Frontend
   ↓
GET /external/posts
   ↓
Backend Express
   ↓
JSONPlaceholder
```

---

## 3. Usando `fetch` en Node.js

En versiones modernas de Node.js, `fetch` está disponible de forma nativa.

Ejemplo básico:

```js
const response = await fetch("https://jsonplaceholder.typicode.com/posts");

const data = await response.json();

console.log(data);
```

`fetch()` devuelve una respuesta HTTP. Luego usamos:

```js
await response.json();
```

para convertir el cuerpo de la respuesta a un objeto o arreglo de JavaScript.

---

## 4. Consumir una API externa desde Express

```js
import express from "express";

const app = express();
const PORT = 3000;

app.get("/external/posts", async (req, res) => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );

    const posts = await response.json();

    return res.json({
      success: true,
      data: posts
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error consuming external API"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

Ruta local:

```http
GET http://localhost:3000/external/posts
```

La API de Express consume internamente:

```http
GET https://jsonplaceholder.typicode.com/posts
```

---

## 5. Revisar si la respuesta fue exitosa

No basta con llamar a `fetch`. También debemos revisar si la API externa respondió correctamente.

```js
const response = await fetch(
  "https://jsonplaceholder.typicode.com/posts"
);

if (!response.ok) {
  return res.status(502).json({
    success: false,
    message: "External API error"
  });
}

const posts = await response.json();
```

`response.ok` es `true` cuando el código HTTP está entre 200 y 299.

Ejemplos:

```text
200 OK         → response.ok = true
201 Created    → response.ok = true
404 Not Found  → response.ok = false
500 Error      → response.ok = false
```

---

## 6. Enviar headers en una petición HTTP

Los headers permiten enviar información adicional en la petición.

Ejemplo:

```js
const response = await fetch(
  "https://jsonplaceholder.typicode.com/posts",
  {
    method: "GET",
    headers: {
      "Accept": "application/json"
    }
  }
);
```

### Headers comunes

| Header | Uso |
|---|---|
| `Accept` | Indica qué tipo de respuesta esperamos |
| `Content-Type` | Indica qué tipo de información enviamos |
| `Authorization` | Envía credenciales o tokens |
| `x-api-key` | Envía una API key en algunas APIs |

---

## 7. Header `Accept`

El header `Accept` indica qué tipo de respuesta espera el cliente.

```js
headers: {
  "Accept": "application/json"
}
```

Significa:

```text
Espero que la respuesta venga en formato JSON.
```

---

## 8. Header `Content-Type`

El header `Content-Type` indica qué tipo de datos estamos enviando.

Cuando enviamos JSON, usamos:

```js
headers: {
  "Content-Type": "application/json"
}
```

Esto es necesario cuando hacemos peticiones como:

```text
POST
PUT
PATCH
```

y enviamos un body en formato JSON.

---

## 9. Enviar un POST a una API externa

Ejemplo con JSONPlaceholder:

```js
const response = await fetch(
  "https://jsonplaceholder.typicode.com/posts",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: "Learning Express",
      body: "Consuming external APIs from backend",
      userId: 1
    })
  }
);

const createdPost = await response.json();

console.log(createdPost);
```

### Punto importante

El body debe enviarse como string JSON:

```js
body: JSON.stringify({
  title: "Learning Express",
  body: "Consuming external APIs from backend",
  userId: 1
})
```

No se debe enviar directamente el objeto:

```js
// Incorrecto
body: {
  title: "Learning Express"
}
```

HTTP envía texto, no objetos JavaScript directamente.

---

## 10. Crear una ruta Express que haga POST hacia una API externa

```js
app.post("/external/posts", async (req, res) => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          title: "Created from Express",
          body: "This post was created through our backend",
          userId: 1
        })
      }
    );

    if (!response.ok) {
      return res.status(502).json({
        success: false,
        message: "External API error"
      });
    }

    const createdPost = await response.json();

    return res.status(201).json({
      success: true,
      message: "Post created in external API",
      data: createdPost
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error consuming external API"
    });
  }
});
```

---

## 11. Enviar datos recibidos desde el cliente hacia una API externa

Primero debemos activar JSON en Express:

```js
app.use(express.json());
```

Luego:

```js
app.post("/external/posts", async (req, res) => {
  try {
    const { title, body, userId } = req.body;

    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          title,
          body,
          userId
        })
      }
    );

    if (!response.ok) {
      return res.status(502).json({
        success: false,
        message: "External API error"
      });
    }

    const createdPost = await response.json();

    return res.status(201).json({
      success: true,
      data: createdPost
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error consuming external API"
    });
  }
});
```

Petición hacia nuestra API:

```http
POST http://localhost:3000/external/posts
Content-Type: application/json
```

Body:

```json
{
  "title": "My first post",
  "body": "This body comes from the client",
  "userId": 1
}
```

---

## 12. Enviar Authorization Bearer Token

Muchas APIs externas requieren un token.

Formato:

```http
Authorization: Bearer TOKEN
```

Ejemplo:

```js
const response = await fetch(
  "https://api.example.com/protected-resource",
  {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${process.env.EXTERNAL_API_TOKEN}`,
      "Accept": "application/json"
    }
  }
);
```

El token no debe escribirse directamente en el código.

Correcto en `.env`:

```env
EXTERNAL_API_TOKEN=my-secret-token
```

Uso en JavaScript:

```js
process.env.EXTERNAL_API_TOKEN
```

---

## 13. Enviar API Key

Algunas APIs utilizan una API key.

Ejemplo usando header `x-api-key`:

```js
const response = await fetch(
  "https://api.example.com/data",
  {
    method: "GET",
    headers: {
      "x-api-key": process.env.EXTERNAL_API_KEY,
      "Accept": "application/json"
    }
  }
);
```

Archivo `.env`:

```env
EXTERNAL_API_KEY=my-api-key
```

---

## 14. Formatear correctamente un body JSON

Un body JSON debe cumplir estas reglas:

- Debe ser un objeto válido.
- Las claves deben ir entre comillas dobles cuando se escribe JSON puro.
- Los strings deben ir entre comillas dobles.
- No debe tener comas sobrantes.
- Debe convertirse con `JSON.stringify()` antes de enviarse con `fetch`.

JSON correcto:

```json
{
  "title": "Learning APIs",
  "body": "This is a valid JSON body",
  "userId": 1
}
```

JSON incorrecto:

```json
{
  "title": "Learning APIs",
  "body": "This is invalid",
  "userId": 1,
}
```

El error está en la coma final.

---

## 15. Transformar la respuesta de una API externa

No siempre conviene devolver al cliente exactamente lo que responde la API externa.

```js
app.get("/external/users", async (req, res) => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );

    if (!response.ok) {
      return res.status(502).json({
        success: false,
        message: "External API error"
      });
    }

    const users = await response.json();

    const formattedUsers = users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      city: user.address.city
    }));

    return res.json({
      success: true,
      data: formattedUsers
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error consuming external API"
    });
  }
});
```

Esto permite controlar qué información se entrega al cliente.

---

## 16. Manejo de errores al consumir APIs externas

Errores posibles:

- La API externa está caída.
- La URL está mal escrita.
- La API externa responde 404.
- La API externa responde 500.
- La conexión falla.
- El token o API key es incorrecto.

Ejemplo recomendado:

```js
try {
  const response = await fetch(url);

  if (!response.ok) {
    return res.status(502).json({
      success: false,
      message: "External API returned an error"
    });
  }

  const data = await response.json();

  return res.json({
    success: true,
    data
  });
} catch (error) {
  return res.status(500).json({
    success: false,
    message: "Could not connect to external API"
  });
}
```

### ¿Por qué usar 502?

El código `502 Bad Gateway` puede usarse cuando nuestra API actúa como intermediaria y recibe una respuesta fallida desde otro servidor.

---

## 17. Buenas prácticas

- No exponer API keys en el frontend.
- Guardar tokens y API keys en variables de entorno.
- Revisar siempre `response.ok`.
- Usar `try/catch`.
- Enviar `Content-Type: application/json` cuando se envía JSON.
- Convertir el body con `JSON.stringify()`.
- Transformar la respuesta externa antes de enviarla al cliente.
- No confiar completamente en la información de una API externa.
- Usar respuestas consistentes en nuestra API.
- Manejar errores de forma clara.

---