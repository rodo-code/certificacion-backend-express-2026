# Integración de OpenAPI, Swagger UI y OpenAPI Validator en Express.js

## 1. ¿Qué es OpenAPI?

OpenAPI es una especificación estándar para describir APIs HTTP/REST. Permite documentar rutas, métodos HTTP, parámetros, cuerpos de petición, respuestas, códigos de estado, errores y mecanismos de autenticación.

La idea principal es que la API tenga un **contrato formal** que pueda ser entendido por personas y herramientas.
---

## 2. ¿Qué es Swagger UI?

Swagger UI permite visualizar una especificación OpenAPI como una documentación interactiva en el navegador.

Con Swagger UI, los usuarios y desarolladores pueden:

- Ver rutas disponibles.
- Ver métodos HTTP.
- Ver parámetros requeridos.
- Ver bodies esperados.
- Ver respuestas posibles.
- Probar peticiones directamente desde la documentación.

Ruta común:

```http
GET /api-docs
```

---

## 3. ¿Qué es `express-openapi-validator`?

`express-openapi-validator` es un middleware para Express que valida peticiones y respuestas usando una especificación OpenAPI 3.

Si OpenAPI dice que `grade` debe ser `number`:

```yaml
grade:
  type: number
```

y el cliente envía:

```json
{
  "grade": "noventa"
}
```

el middleware puede responder automáticamente con:

```http
400 Bad Request
```

---

## 4. Instalación de dependencias

```bash
npm install swagger-ui-express yamljs express-openapi-validator
```

Usaremos:

```text
swagger-ui-express       -> Mostrar documentación interactiva
yamljs                   -> Leer el archivo openapi.yaml desde JavaScript
express-openapi-validator -> Validar requests contra el contrato OpenAPI
```

---

## 5. ¿Dónde colocar openapi.yaml

El archivo principal de la documentación openapi.yml estará en:

```text
docs/openapi.yaml
```

---

## 6. Crear el archivo `openapi.yaml`

Crear:

```text
docs/openapi.yaml
```

Contenido base:

```yaml
openapi: 3.0.3

info:
  title: Students API
  version: 1.0.0
  description: API para gestionar estudiantes usando Express.js

servers:
  - url: http://localhost:3000
    description: Servidor local

paths:
  /students:
    get:
      summary: Obtener todos los estudiantes
      tags:
        - Students
      responses:
        "200":
          description: Lista de estudiantes obtenida correctamente
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/StudentListResponse"

    post:
      summary: Crear un estudiante
      tags:
        - Students
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/CreateStudentInput"
      responses:
        "201":
          description: Estudiante creado correctamente
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/StudentResponse"
        "400":
          description: Datos inválidos

  /students/{id}:
    get:
      summary: Obtener un estudiante por ID
      tags:
        - Students
      parameters:
        - name: id
          in: path
          required: true
          description: ID del estudiante
          schema:
            type: string
      responses:
        "200":
          description: Estudiante encontrado
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/StudentResponse"
        "404":
          description: Estudiante no encontrado

    patch:
      summary: Actualizar parcialmente un estudiante
      tags:
        - Students
      parameters:
        - name: id
          in: path
          required: true
          description: ID del estudiante
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/UpdateStudentInput"
      responses:
        "200":
          description: Estudiante actualizado correctamente
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/StudentResponse"
        "400":
          description: Datos inválidos
        "404":
          description: Estudiante no encontrado

    delete:
      summary: Eliminar un estudiante
      tags:
        - Students
      parameters:
        - name: id
          in: path
          required: true
          description: ID del estudiante
          schema:
            type: string
      responses:
        "204":
          description: Estudiante eliminado correctamente
        "404":
          description: Estudiante no encontrado

components:
  schemas:
    Student:
      type: object
      properties:
        id:
          type: string
          example: "6848d89a5f3e8c4a12345678"
        name:
          type: string
          example: "Ana"
        grade:
          type: number
          example: 95
        site:
          type: string
          example: "La Paz"
        active:
          type: boolean
          example: true

    CreateStudentInput:
      type: object
      required:
        - name
        - grade
        - site
      properties:
        name:
          type: string
          minLength: 2
          example: "Ana"
        grade:
          type: number
          minimum: 0
          maximum: 100
          example: 95
        site:
          type: string
          example: "La Paz"
        active:
          type: boolean
          example: true

    UpdateStudentInput:
      type: object
      properties:
        name:
          type: string
          minLength: 2
          example: "Ana María"
        grade:
          type: number
          minimum: 0
          maximum: 100
          example: 88
        site:
          type: string
          example: "Cochabamba"
        active:
          type: boolean
          example: false

    StudentResponse:
      type: object
      properties:
        success:
          type: boolean
          example: true
        message:
          type: string
          example: "Student retrieved successfully"
        data:
          $ref: "#/components/schemas/Student"

    StudentListResponse:
      type: object
      properties:
        success:
          type: boolean
          example: true
        data:
          type: array
          items:
            $ref: "#/components/schemas/Student"
```

---

## 7. Explicación de partes principales

### `openapi`

```yaml
openapi: 3.0.3
```

Indica la versión de OpenAPI.

### `info`

```yaml
info:
  title: Students API
  version: 1.0.0
```

Contiene información general de la API.

### `servers`

```yaml
servers:
  - url: http://localhost:3000
```

Indica dónde se ejecuta la API.

### `paths`

```yaml
paths:
  /students:
```

Aquí se documentan las rutas.

### `components.schemas`

```yaml
components:
  schemas:
```

Aquí se definen estructuras reutilizables, como `Student`, `CreateStudentInput` o `StudentResponse`.

---

## 8. Integrar Swagger UI en Express

En `src/app.js`:

```js
import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const app = express();

app.use(express.json());

const openApiDocument = YAML.load("./docs/openapi.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));

app.get("/students", (req, res) => {
  res.json({
    success: true,
    data: []
  });
});

export default app;
```

Abrir en el navegador:

```http
http://localhost:3000/api-docs
```

---

## 9. Separar `app.js` y `server.js`

### `src/app.js`

```js
import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const app = express();

app.use(express.json());

const openApiDocument = YAML.load("./docs/openapi.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));

app.get("/students", (req, res) => {
  res.json({
    success: true,
    data: []
  });
});

export default app;
```

### `src/server.js`

```js
import app from "./app.js";

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

En `package.json`:

```json
{
  "type": "module",
  "scripts": {
    "dev": "node --watch src/server.js",
    "start": "node src/server.js"
  }
}
```

---

## 10. Integrar `express-openapi-validator`

El validador debe registrarse antes de las rutas que queremos validar. También debe ir después de `express.json()`.

```js
import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import * as OpenApiValidator from "express-openapi-validator";

const app = express();

app.use(express.json());

const openApiDocument = YAML.load("./docs/openapi.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));

app.use(
  OpenApiValidator.middleware({
    apiSpec: "./docs/openapi.yaml",
    validateRequests: true,
    validateResponses: false
  })
);

app.get("/students", (req, res) => {
  res.json({
    success: true,
    data: []
  });
});

app.post("/students", (req, res) => {
  const student = req.body;

  res.status(201).json({
    success: true,
    message: "Student created successfully",
    data: {
      id: "6848d89a5f3e8c4a12345678",
      ...student
    }
  });
});

export default app;
```

---

## 11. `validateRequests: true`

```js
validateRequests: true
```

Valida las peticiones entrantes.

Puede validar:

- `requestBody`
- `path params`
- `query params`
- `headers`

Ejemplo válido:

```json
{
  "name": "Ana",
  "grade": 95,
  "site": "La Paz",
  "active": true
}
```

Ejemplo inválido:

```json
{
  "name": "Ana",
  "grade": "noventa",
  "site": "La Paz"
}
```

Como `grade` debería ser `number`, el middleware puede responder con error `400`.

---

## 12. `validateResponses: false`

```js
validateResponses: false
```

Significa que solo se validarán las peticiones del cliente, no las respuestas del servidor.

---

## 13. Middleware de errores para OpenAPI Validator

Cuando `express-openapi-validator` detecta un error, lo envía al middleware de errores de Express.

---

## 14. Probar la validación

### Body válido

```http
POST /students
Content-Type: application/json
```

```json
{
  "name": "Ana",
  "grade": 95,
  "site": "La Paz",
  "active": true
}
```

### Body inválido: falta `name`

```json
{
  "grade": 95,
  "site": "La Paz",
  "active": true
}
```

Respuesta esperada:

```json
{
  "success": false,
  "message": "request/body must have required property 'name'",
  "errors": [
    {
      "path": "/body/name",
      "message": "must have required property 'name'"
    }
  ]
}
```

### Body inválido: `grade` incorrecto

```json
{
  "name": "Ana",
  "grade": "noventa",
  "site": "La Paz",
  "active": true
}
```

Respuesta esperada:

```json
{
  "success": false,
  "message": "request/body/grade must be number",
  "errors": [
    {
      "path": "/body/grade",
      "message": "must be number"
    }
  ]
}
```

---

## 15. Documentar query params

Ejemplo:

```http
GET /students?site=La Paz&active=true
```

Agregar en `openapi.yaml`:

```yaml
/students:
  get:
    summary: Obtener todos los estudiantes
    tags:
      - Students
    parameters:
      - name: site
        in: query
        required: false
        schema:
          type: string
        example: "LP"
      - name: active
        in: query
        required: false
        schema:
          type: boolean
        example: true
    responses:
      "200":
        description: Lista de estudiantes obtenida correctamente
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/StudentListResponse"
```

Ejemplo válido:

```http
GET /students?active=true
```

Ejemplo inválido:

```http
GET /students?active=hola
```

---

## 16. Documentar path params

Ejemplo:

```http
GET /students/6848d89a5f3e8c4a12345678
```

OpenAPI:

```yaml
/students/{id}:
  get:
    summary: Obtener un estudiante por ID
    tags:
      - Students
    parameters:
      - name: id
        in: path
        required: true
        schema:
          type: string
        description: ID del estudiante
    responses:
      "200":
        description: Estudiante encontrado
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/StudentResponse"
      "404":
        description: Estudiante no encontrado
```

---

## 17. Documentar autenticación Bearer Token

Si la API usa JWT, se puede documentar el uso de Bearer Token.

Agregar en `components`:

```yaml
components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
```

Luego proteger una ruta:

```yaml
/students:
  post:
    summary: Crear un estudiante
    tags:
      - Students
    security:
      - bearerAuth: []
    requestBody:
      required: true
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/CreateStudentInput"
    responses:
      "201":
        description: Estudiante creado correctamente
      "401":
        description: Token requerido o inválido
```

En Swagger UI aparecerá el botón:

```text
Authorize
```

Ahí se puede ingresar el token JWT.

Formato:

```text
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

---

## 18. Buenas prácticas

- Mantener actualizado `openapi.yaml`.
- No documentar algo diferente a lo que realmente hace el código.
- Usar `components.schemas` para evitar repetir estructuras.
- Documentar errores, no solo respuestas exitosas.
- Documentar autenticación si la API usa JWT.
- Validar `requestBody`, `params` y `query`.
- Empezar con `validateRequests: true`.
- Activar `validateResponses: true` cuando el equipo de desarrollo ya esté más cómodo.
- Mantener respuestas consistentes.
- Usar Swagger UI para que frontend, backend y testers compartan el mismo contrato.

---