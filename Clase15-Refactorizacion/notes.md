# Notas clase 15 de refactorización y organización de código en Express.js

## Motivación

Si notamos nuestro código actual no es escalable ya que `app.js` hace muchas cosas:
- Configura Express
- Guarda Datos
- Valida
- Filtra
- Responde
- Levanta el servidor

esto no cumple con el principio de **Single Responsability** de los principios **SOLID**.

Asi que refactorizaremos el código de la anterior clase bajo el siguiente formato:

```text
project/
│
├── src/
│   ├── app.js
│   │
│   ├── routes/
│   │   └── studentRoutes.js
│   │
│   ├── controllers/
│   │   └── studentController.js
│   │
│   ├── services/
│   │   └── studentService.js
│   │
│   │__ data/
│       └── students.js
└── package.json
```

Y el flujo de manejo de un `Request` ahora es:

```text
Request
   ↓
Route
   ↓
Controller
   ↓
Service
   ↓
Data / DB
```

## Data / DB

Usualmente en esta capa colocamos el acceso a la base de datos, consultas a ella y otros relacionados con la persistencia de datos.

Sin embargo como manejamos momentaneamente un arreglo para guardar nuestros datos, esta capa solo guardará el arreglo inicial de datos.

```javascript
export const studentList = [
  {
    name: "Matias Meneses",
    grade: 78,
  },
  {
    name: "Wendy Caceres",
    grade: 83,
  },
  {
    name: "Daner Tonconi",
    grade: 49,
  },
];
```
## Service

Un servicio contiene la lógica del negocio, para manejar los datos, esta directamente conectado con las funciones y los datos de la capa de `Data / DB`.

Para nuestro ejemplo un servicio podria ser:

```javascript
import { studentList } from "../data/students.js";

export function getAllStudents() {
  return studentList;
}

export function getStudentsByPassStatus(pass) {
  return studentList.filter((student) => {
    const hasPassed = student.grade >= 60;
    return hasPassed === pass;
  });
}

export function createStudent(studentData) {
  studentList.push(studentData);
  return studentData;
}

export function getStudentByPosition(position) {
  return studentList[position] ?? null;
}
```

## Controller

El controlador tendrá las siguientes funciones:

- Recibir los datos
- Validarlos
- Decidir que responder para cada ruta específica

Crearemos nuestro controller exportando una función por cada ruta en específico que tenemos en el proyecto actual quedando asi:

```javascript
import {
  getAllStudents,
  getStudentsByPassStatus,
  createStudent,
  getStudentByPosition,
} from "../services/studentService.js";

export function findStudents(req, res) {
  const { pass } = req.query;

  if (pass === undefined) {
    return res.status(200).json({
      students: getAllStudents(),
    });
  }

  if (pass !== "true" && pass !== "false") {
    return res.status(400).json({
      error: "Query parameter 'pass' must be 'true' or 'false'",
    });
  }

  const passAsBoolean = pass === "true";

  return res.status(200).json({
    students: getStudentsByPassStatus(passAsBoolean),
  });
}

export function saveStudent(req, res) {
  const { name, grade } = req.body;

  if (!name || grade === undefined) {
    return res.status(400).json({
      error: "Fields 'name' and 'grade' are required",
    });
  }

  if (typeof name !== "string" || name.trim().length === 0) {
    return res.status(400).json({
      error: "Field 'name' must be a non-empty string",
    });
  }

  if (typeof grade !== "number" || grade < 0 || grade > 100) {
    return res.status(400).json({
      error: "Field 'grade' must be a number between 0 and 100",
    });
  }

  const newStudent = createStudent({
    name: name.trim(),
    grade,
  });

  return res.status(201).json({
    message: "Student created successfully",
    student: newStudent,
  });
}

export function findStudentByPosition(req, res) {
  const position = Number(req.params.pos);

  console.log(`Retrieving information for student in position ${position}.`);

  if (!Number.isInteger(position) || position < 0) {
    return res.status(400).json({
      error: "Position must be a valid positive integer",
    });
  }

  const student = getStudentByPosition(position);

  if (!student) {
    return res.status(404).json({
      error: "Student not found",
    });
  }

  return res.status(200).json({
    student,
  });
}
```
## Router

En router tendremos que aprender una nueva capacidad de `Express.js`, `Router` nos permitira manejar de mejor forma las rutas de nuestra aplicación.

Notemos que con `Router` ahora podemos crear archivos donde manejemos solo las rutas de cierto recurso en este caso `student`.

A continuación un ejemplo del uso de `Router` en nuestro caso:

```javascript
import { Router } from "express";

import {
  findStudents,
  saveStudent,
  findStudentByPosition,
} from "../controllers/studentController.js";

const router = Router();

router.get("/", findStudents);

router.post("/", saveStudent);

router.get("/:pos", findStudentByPosition);

export default router;
```

## app.js

Server solo configura la aplicación y que `router` usara para que `peticion` o `recurso`.

```javascript
import express from "express";

import studentRoutes from "./routes/studentRoutes.js";

const PORT = 3000;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).send("<h1>Hello from Express</h1>");
});

app.use("/api/students", studentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

Nota que por buena practica cambiamos de ruta a `api/students` y ya no `api/student`, como regla en el curso haremos que:

- Las rutas de peticiones seran en plural `students`.
- El código que accede a ese recurso sera en singular, por ejemplo: `studentService`.