# Seguridad, Autenticación y Autorización en APIs REST con Express.js

## 1. ¿Por qué necesitamos seguridad en una API?

Una API REST permite que clientes como aplicaciones web, móviles o sistemas externos interactúen con nuestros datos.

Ejemplo:

```http
GET /students
POST /students
DELETE /students/123
```

Si estas rutas no tienen seguridad, cualquier persona podría:

* Consultar información privada.
* Crear datos falsos.
* Modificar registros.
* Eliminar información importante.

Por eso una API debe controlar:

```text
Quién accede.
Qué puede hacer.
Cómo se protege la información.
```

---

## 2. Seguridad en APIs

La seguridad busca proteger los datos y servicios de una aplicación.

Tres objetivos importantes son:

### Confidencialidad

Solo las personas autorizadas pueden acceder a la información.

### Integridad

La información no debe modificarse de manera incorrecta o no autorizada.

### Disponibilidad

La API debe estar disponible para los usuarios legítimos.

---

## 3. Autenticación vs Autorización

## Autenticación

La autenticación responde:

```text
¿Quién eres?
```

Ejemplo:

```json
{
  "email": "admin@university.com",
  "password": "123456"
}
```

El sistema verifica si el usuario realmente existe y si su contraseña es correcta.

---

## Autorización

La autorización responde:

```text
¿Qué puedes hacer?
```

Ejemplo:

```text
Un estudiante puede ver sus notas.
Un docente puede registrar notas.
Un administrador puede eliminar usuarios.
```

---

## 4. JSON Web Token - JWT

JWT es un mecanismo muy usado en APIs REST para autenticar usuarios.

Un JWT tiene esta estructura:

```text
HEADER.PAYLOAD.SIGNATURE
```

### Header

Contiene información sobre el tipo de token y el algoritmo usado.

### Payload

Contiene información del usuario.

Ejemplo:

```json
{
  "userId": "123",
  "role": "admin"
}
```

### Signature

Sirve para verificar que el token no fue modificado.

---

## 5. Instalación de dependencias

```bash
npm install jsonwebtoken bcrypt
```

También es recomendable usar variables de entorno:

```bash
npm install dotenv
```

Archivo `.env`:

```env
JWT_SECRET=mySuperSecretKey
JWT_EXPIRES_IN=1h
```

---

## 6. Guardar contraseñas de forma segura con bcrypt

Nunca se debe guardar una contraseña en texto plano.

Incorrecto:

```json
{
  "email": "ana@mail.com",
  "password": "123456"
}
```

Correcto:

```json
{
  "email": "ana@mail.com",
  "password": "$2b$10$..."
}
```

bcrypt permite convertir una contraseña en un hash seguro.

---

## 7. Crear hash de una contraseña

```js
import bcrypt from "bcrypt";

const password = "123456";
const saltRounds = 10;

const hashedPassword = await bcrypt.hash(password, saltRounds);

console.log(hashedPassword);
```

### ¿Qué significa `saltRounds`?

Indica el costo del algoritmo. Mientras más alto sea, más lento y seguro será el proceso.

Un valor común para empezar es:

```js
10
```

Ejemplo en registro de usuario:

```js
app.post("/register", async (req, res) => {
  const { email, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = {
    email,
    password: hashedPassword,
    role: role || "student"
  };

  return res.status(201).json({
    message: "User registered successfully",
    user
  });
});
```

En una aplicación real, el usuario debería guardarse en la base de datos con la contraseña encriptada.

---

## 8. Comparar contraseña en login

Cuando el usuario inicia sesión, no se compara texto plano con texto plano.

Se compara:

```text
Contraseña ingresada
vs
Hash almacenado en base de datos
```

Ejemplo:

```js
import bcrypt from "bcrypt";

const passwordFromRequest = "123456";
const hashedPasswordFromDB = "$2b$10$...";

const isPasswordCorrect = await bcrypt.compare(
  passwordFromRequest,
  hashedPasswordFromDB
);

console.log(isPasswordCorrect);
```

`bcrypt.compare()` devuelve:

```js
true
```

si la contraseña es correcta.

Devuelve:

```js
false
```

si la contraseña es incorrecta.

---

## 9. Ejemplo de login con bcrypt

```js
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email
  });

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials"
    });
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordCorrect) {
    return res.status(401).json({
      message: "Invalid credentials"
    });
  }

  return res.json({
    message: "Login successful"
  });
});
```

Es buena práctica responder `"Invalid credentials"` tanto si el usuario no existe como si la contraseña es incorrecta.

---

## 10. Crear un token con `jwt.sign()`

`jwt.sign()` permite generar un token.

Sintaxis básica:

```js
jwt.sign(payload, secret, options);
```

Ejemplo:

```js
import jwt from "jsonwebtoken";

const token = jwt.sign(
  {
    userId: user._id,
    role: user.role
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "1h"
  }
);
```

### Partes importantes

```js
{
  userId: user._id,
  role: user.role
}
```

Es el payload. Contiene información del usuario.

```js
process.env.JWT_SECRET
```

Es la clave secreta usada para firmar el token.

```js
{
  expiresIn: "1h"
}
```

Indica que el token expirará en una hora.

---

## 11. Login generando JWT

```js
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email
  });

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials"
    });
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordCorrect) {
    return res.status(401).json({
      message: "Invalid credentials"
    });
  }

  const token = jwt.sign(
    {
      userId: user._id,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h"
    }
  );

  return res.json({
    message: "Login successful",
    token
  });
});
```

Respuesta esperada:

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

---

## 12. Enviar JWT en una petición REST API

Una vez que el cliente recibe el token, debe enviarlo en las rutas protegidas usando el header:

```http
Authorization: Bearer TOKEN
```

Ejemplo:

```http
GET /students
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

La palabra `Bearer` indica que se está enviando un token de acceso.

---

## 13. Verificar un token con `jwt.verify()`

`jwt.verify()` sirve para validar que un token sea correcto y no haya expirado.

Sintaxis:

```js
jwt.verify(token, secret);
```

Ejemplo:

```js
const payload = jwt.verify(
  token,
  process.env.JWT_SECRET
);
```

Si el token es válido, devuelve el payload:

```js
{
  userId: "123",
  role: "admin",
  iat: 1710000000,
  exp: 1710003600
}
```

Si el token es inválido o expiró, lanza un error.

---

## 14. Middleware de autenticación

```js
import jwt from "jsonwebtoken";

function authenticate(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({
      message: "Token required"
    });
  }

  const token = authorization.split(" ")[1];

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = payload;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
}
```

### ¿Qué hace este middleware?

1. Lee el header `Authorization`.
2. Extrae el token después de `Bearer`.
3. Verifica el token con `jwt.verify()`.
4. Guarda el payload en `req.user`.
5. Permite continuar con `next()`.

---

## 15. Usar middleware de autenticación

```js
app.get("/students", authenticate, async (req, res) => {
  return res.json({
    message: "Protected students route",
    user: req.user
  });
});
```

Si el usuario no envía token:

```json
{
  "message": "Token required"
}
```

Si el token es inválido:

```json
{
  "message": "Invalid or expired token"
}
```

Si el token es válido, puede acceder a la ruta.

---

## 16. Middleware de autorización

La autorización se basa en permisos o roles.

Ejemplo de roles:

```text
student
teacher
admin
```

Middleware para permitir solo administradores:

```js
function authorizeAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Forbidden"
    });
  }

  next();
}
```

Uso:

```js
app.delete(
  "/students/:id",
  authenticate,
  authorizeAdmin,
  async (req, res) => {
    return res.json({
      message: "Student deleted"
    });
  }
);
```

---

## 17. Autorización flexible por roles

```js
function authorizeRoles(...allowedRoles) {
  return function (req, res, next) {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Forbidden"
      });
    }

    next();
  };
}
```

Uso:

```js
app.delete(
  "/students/:id",
  authenticate,
  authorizeRoles("admin"),
  deleteStudent
);
```

```js
app.patch(
  "/students/:id",
  authenticate,
  authorizeRoles("admin", "teacher"),
  updateStudent
);
```

```js
app.get(
  "/students",
  authenticate,
  authorizeRoles("admin", "teacher", "student"),
  getStudents
);
```

---

## 18. Códigos HTTP importantes

### 200 OK

La petición fue exitosa.

### 201 Created

Se creó un recurso correctamente.

### 400 Bad Request

La petición tiene datos inválidos.

### 401 Unauthorized

El usuario no está autenticado.

Ejemplo:

```json
{
  "message": "Token required"
}
```

### 403 Forbidden

El usuario está autenticado, pero no tiene permisos.

Ejemplo:

```json
{
  "message": "Forbidden"
}
```

### 500 Internal Server Error

Error interno del servidor.

---

## 19. Flujo completo de autenticación y autorización

```text
1. Usuario se registra
2. La contraseña se guarda con bcrypt.hash()
3. Usuario inicia sesión
4. Se compara la contraseña con bcrypt.compare()
5. Si es correcta, se genera un JWT con jwt.sign()
6. El cliente guarda el token
7. El cliente envía el token en Authorization: Bearer TOKEN
8. El middleware verifica el token con jwt.verify()
9. El middleware guarda la información del usuario en req.user
10. El middleware de autorización verifica el rol
11. Si tiene permiso, accede al recurso
```

---

## 20. Buenas prácticas

* Nunca guardar contraseñas en texto plano.
* Usar `bcrypt.hash()` para guardar contraseñas.
* Usar `bcrypt.compare()` para login.
* Guardar `JWT_SECRET` en variables de entorno.
* No enviar JWT por query params.
* Enviar JWT usando `Authorization: Bearer TOKEN`.
* Usar expiración en tokens.
* Usar HTTPS en producción.
* Responder con mensajes genéricos en login, como `"Invalid credentials"`.
* Separar autenticación y autorización en middlewares diferentes.

---

## 21. Resumen

```text
Seguridad:
Protege datos y servicios.

Autenticación:
Verifica quién eres.

Autorización:
Verifica qué puedes hacer.

bcrypt:
Permite guardar contraseñas de forma segura.

JWT:
Permite identificar usuarios autenticados mediante tokens.

Bearer Token:
Forma estándar de enviar el JWT en una petición HTTP.
```
