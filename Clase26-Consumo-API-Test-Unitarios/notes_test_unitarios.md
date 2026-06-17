# Guía de Notas: Introducción a Unit Testing en Backend con Express.js

## 1. ¿Qué es Unit Testing?

El **Unit Testing** o **prueba unitaria** consiste en probar una parte pequeña del código de manera aislada.

Por ejemplo, si tenemos una función que calcula si un estudiante aprobó o no, podemos probar esa función sin levantar todo el servidor.

```js
export function isApproved(grade) {
  return grade >= 51;
}
```

La idea es verificar automáticamente que una función se comporte como esperamos.

---

## 2. ¿Por qué hacer tests?

Los tests ayudan a:

- Detectar errores más rápido.
- Evitar romper código que ya funcionaba.
- Validar reglas de negocio.
- Mejorar la confianza al modificar el proyecto.
- Separar mejor la lógica de la aplicación.

En backend, no basta con probar todo manualmente en Postman. Los tests permiten comprobar el comportamiento del sistema de forma automática.

---

## 3. Herramientas recomendadas

Para este curso usaremos:

```text
Vitest     → para pruebas unitarias
Supertest  → para probar rutas HTTP de Express
```

Instalación:

```bash
npm install -D vitest supertest
```

En `package.json`:

```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run"
  }
}
```

Luego se puede ejecutar:

```bash
npm test
```

o:

```bash
npm run test:run
```

---

## 4. Primer ejemplo de test unitario

Archivo:

```text
grade.service.js
```

```js
export function isApproved(grade) {
  return grade >= 51;
}
```

Archivo de prueba:

```text
grade.service.test.js
```

```js
import { describe, it, expect } from "vitest";
import { isApproved } from "./grade.service.js";

describe("isApproved", () => {
  it("should return true when grade is 51 or higher", () => {
    const result = isApproved(51);

    expect(result).toBe(true);
  });

  it("should return false when grade is lower than 51", () => {
    const result = isApproved(40);

    expect(result).toBe(false);
  });
});
```

---

## 5. Estructura básica de un test

```js
describe("nombre del grupo de pruebas", () => {
  it("debería hacer algo específico", () => {
    expect(resultado).toBe(valorEsperado);
  });
});
```

### `describe`

Agrupa pruebas relacionadas.

```js
describe("isApproved", () => {
  // tests aquí
});
```

### `it`

Define un caso de prueba específico.

```js
it("should return true when grade is 51 or higher", () => {
  // prueba aquí
});
```

### `expect`

Verifica el resultado.

```js
expect(result).toBe(true);
```

---

## 6. Ejemplo con una función de promedio

Archivo:

```text
average.service.js
```

```js
export function calculateAverage(grades) {
  if (grades.length === 0) {
    return 0;
  }

  const sum = grades.reduce((total, grade) => {
    return total + grade;
  }, 0);

  return sum / grades.length;
}
```

Test:

```js
import { describe, it, expect } from "vitest";
import { calculateAverage } from "./average.service.js";

describe("calculateAverage", () => {
  it("should calculate the average of grades", () => {
    const result = calculateAverage([80, 90, 100]);

    expect(result).toBe(90);
  });

  it("should return 0 when there are no grades", () => {
    const result = calculateAverage([]);

    expect(result).toBe(0);
  });
});
```

---

## 7. Separar `app.js` y `server.js`

Para probar rutas de Express con Supertest, es recomendable separar la aplicación del servidor.

### `app.js`

```js
import express from "express";

const app = express();

app.use(express.json());

app.get("/students", (req, res) => {
  res.json({
    success: true,
    data: []
  });
});

export default app;
```

### `server.js`

```js
import app from "./app.js";

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

¿Por qué se separa?

```text
app.js      → contiene la configuración de Express
server.js   → levanta el servidor con listen()
```

Esto permite probar `app.js` sin iniciar manualmente el servidor.

---

## 8. Probar una ruta GET con Supertest

Archivo:

```text
students.routes.test.js
```

```js
import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "./app.js";

describe("GET /students", () => {
  it("should return a list of students", async () => {
    const response = await request(app).get("/students");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});
```

Aquí Supertest simula una petición HTTP:

```js
request(app).get("/students")
```

Sin necesidad de abrir Postman ni levantar manualmente el servidor.

---

## 9. Probar una ruta POST

Ejemplo de ruta:

```js
const students = [];

app.post("/students", (req, res) => {
  const student = req.body;

  students.push(student);

  res.status(201).json({
    success: true,
    message: "Student created",
    data: student
  });
});
```

Test:

```js
import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "./app.js";

describe("POST /students", () => {
  it("should create a student", async () => {
    const response = await request(app)
      .post("/students")
      .send({
        name: "Ana",
        grade: 95,
        site: "La Paz",
        active: true
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.name).toBe("Ana");
  });
});
```

---

## 10. Probar errores esperados

Ruta:

```js
app.post("/students", (req, res) => {
  const { name, grade } = req.body;

  if (!name || grade == null) {
    return res.status(400).json({
      success: false,
      message: "Name and grade are required"
    });
  }

  res.status(201).json({
    success: true,
    message: "Student created"
  });
});
```

Test:

```js
describe("POST /students", () => {
  it("should return 400 when required data is missing", async () => {
    const response = await request(app)
      .post("/students")
      .send({
        name: "Ana"
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Name and grade are required");
  });
});
```

---

## 11. Buenas prácticas básicas

- Probar primero funciones pequeñas.
- Separar lógica de negocio de las rutas.
- No depender solo de pruebas manuales con Postman.
- Usar nombres claros en los tests.
- Probar casos exitosos y casos de error.
- Mantener `app.js` separado de `server.js`.
- Usar Supertest para endpoints HTTP.
- Usar Vitest para funciones y servicios.

---