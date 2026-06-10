# Notas Clase 21 - Métodos Más Utilizados en un Model de Mongoose

## Modelo Utilizado

Durante los ejemplos utilizaremos el siguiente Schema y Model:

```js
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: String,
  grade: Number,
  site: String,
  active: Boolean
});

export const Student = mongoose.model("Student", studentSchema);
```

---

# ¿Qué es un Model?

Un **Model** es una clase generada por Mongoose a partir de un Schema.

Permite interactuar con una colección de MongoDB utilizando métodos sencillos para:

* Crear documentos.
* Buscar documentos.
* Actualizar documentos.
* Eliminar documentos.

En este caso:

```js
Student
```

representa la colección:

```text
students
```

de MongoDB.

---

# Student.create()

Permite crear un nuevo documento.

## Sintaxis

```js
await Student.create(data);
```

## Ejemplo

```js
await Student.create({
  name: "Ana",
  grade: 95,
  site: "LP",
  active: true
});
```

## Resultado

MongoDB almacenará:

```json
{
  "_id": "...",
  "name": "Ana",
  "grade": 95,
  "site": "LP",
  "active": true
}
```

---

# Student.find()

Permite obtener múltiples documentos.

## Sintaxis

```js
await Student.find();
```

## Ejemplo

```js
const students = await Student.find();
```

## Resultado

```js
[
  {
    name: "Ana",
    grade: 95
  },
  {
    name: "Luis",
    grade: 80
  }
]
```

---

## Buscar utilizando filtros

```js
const activeStudents = await Student.find({
  active: true
});
```

MongoDB devolverá únicamente estudiantes activos.

---

# Student.findOne()

Permite obtener el primer documento que coincida con un filtro.

## Ejemplo

```js
const student = await Student.findOne({
  name: "Ana"
});
```

## Resultado

```js
{
  name: "Ana",
  grade: 95
}
```

Si no existe:

```js
null
```

---

# Student.findById()

Permite buscar un documento mediante su identificador único.

## Ejemplo

```js
const student = await Student.findById(
  "6848d89a5f3e8c4a12345678"
);
```

## Resultado

```js
{
  _id: "6848d89a5f3e8c4a12345678",
  name: "Ana",
  grade: 95
}
```

Si no existe:

```js
null
```

---

# Student.updateOne()

Permite actualizar un documento.

## Sintaxis

```js
await Student.updateOne(
  filtro,
  cambios
);
```

## Ejemplo

```js
await Student.updateOne(
  {
    name: "Ana"
  },
  {
    grade: 100
  }
);
```

---

## Actualización Parcial

```js
await Student.updateOne(
  {
    name: "Ana"
  },
  {
    active: false
  }
);
```

Solo se modificará el campo indicado.

---

# Student.findByIdAndUpdate()

Permite buscar y actualizar un documento utilizando su ID.

## Ejemplo

```js
const student = await Student.findByIdAndUpdate(
  "6848d89a5f3e8c4a12345678",
  {
    grade: 100
  },
  {
    new: true
  }
);
```

## ¿Qué hace `new: true`?

Devuelve el documento actualizado.

Sin:

```js
{
  new: true
}
```

Mongoose devuelve el documento anterior.

---

# Student.deleteOne()

Permite eliminar un documento.

## Ejemplo

```js
await Student.deleteOne({
  name: "Ana"
});
```

---

# Student.findByIdAndDelete()

Permite buscar y eliminar un documento mediante su ID.

## Ejemplo

```js
await Student.findByIdAndDelete(
  "6848d89a5f3e8c4a12345678"
);
```

---

# Consultas con Múltiples Filtros

Es posible combinar condiciones.

## Ejemplo

```js
const students = await Student.find({
  site: "La Paz",
  active: true
});
```

Resultado:

```text
Estudiantes activos de La Paz.
```

---

# Ordenamiento

## Orden Descendente

```js
const students = await Student.find()
  .sort({
    grade: -1
  });
```

Resultado:

```text
Mayor nota → Menor nota
```

---

## Orden Ascendente

```js
const students = await Student.find()
  .sort({
    grade: 1
  });
```

Resultado:

```text
Menor nota → Mayor nota
```

---

# Limitando Resultados

## Ejemplo

```js
const students = await Student.find()
  .limit(5);
```

Resultado:

```text
Primeros 5 estudiantes.
```

---

# Paginación

## Ejemplo

```js
const page = 2;
const limit = 10;

const students = await Student.find()
  .skip((page - 1) * limit)
  .limit(limit);
```

Resultado:

```text
Obtiene los estudiantes de la página 2.
```

---

# Resumen de Métodos Más Utilizados

| Método                | Propósito                      |
| --------------------- | ------------------------------ |
| `create()`            | Crear documento                |
| `find()`              | Obtener varios documentos      |
| `findOne()`           | Obtener un documento           |
| `findById()`          | Buscar por ID                  |
| `updateOne()`         | Actualizar documento           |
| `findByIdAndUpdate()` | Actualizar por ID              |
| `deleteOne()`         | Eliminar documento             |
| `findByIdAndDelete()` | Eliminar por ID                |
| `sort()`              | Ordenar resultados             |
| `limit()`             | Limitar resultados             |
| `skip()`              | Saltar resultados (paginación) |

---

# Flujo CRUD en una API REST

```text
POST   /students
↓
Student.create()

GET    /students
↓
Student.find()

GET    /students/:id
↓
Student.findById()

PATCH  /students/:id
↓
Student.findByIdAndUpdate()

DELETE /students/:id
↓
Student.findByIdAndDelete()
```
