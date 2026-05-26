# MongoDB - Apuntes para Estudiantes

## 1. ¿Qué es MongoDB?

MongoDB es una base de datos NoSQL orientada a documentos. Almacena información en documentos con una estructura similar a JSON.

### Estructura general

Aplicación → Base de Datos → Colecciones → Documentos

Ejemplo:

```json
{
  "name": "Ana",
  "career": "Systems Engineering",
  "semester": 5
}
```

## 2. Conceptos Fundamentales

| Relacional | MongoDB |
|------------|----------|
| Database | Database |
| Table | Collection |
| Row | Document |
| Column | Field |

Ejemplo:

Base de datos: university

Colección: students

Documento:

```json
{
  "name": "Ana",
  "career": "Systems Engineering",
  "semester": 5
}
```

## 3. Diferencias con Bases de Datos Tradicionales

En SQL normalmente existe una estructura fija para todos los registros.

MongoDB permite estructuras más flexibles.

Documento 1:

```json
{
  "name": "Ana",
  "semester": 5
}
```

Documento 2:

```json
{
  "name": "Luis",
  "email": "luis@umss.edu"
}
```

Ventajas:

- Flexibilidad.
- Estructuras similares a JSON.
- Fácil manejo de información compleja.

## 4. Ejemplos de Información Universitaria

Estudiante:

```json
{
  "name": "Ana",
  "career": "Systems Engineering",
  "semester": 5
}
```

Materia:

```json
{
  "name": "Backend Development",
  "credits": 4
}
```

Inscripción:

```json
{
  "studentId": "1",
  "courseId": "2",
  "grade": 85
}
```

Documento con información embebida:

```json
{
  "name": "Ana",
  "courses": [
    {
      "name": "Node.js",
      "grade": 95
    }
  ]
}
```

## 5. MongoDB Atlas

Durante el curso utilizaremos únicamente MongoDB Atlas.

MongoDB Atlas es una plataforma en la nube para crear y administrar bases de datos MongoDB.

Ventajas:

- No requiere instalar MongoDB Community Server.
- Plan gratuito suficiente para prácticas.
- Accesible desde cualquier computadora con Internet.

### Visualización de Datos

Los datos serán administrados mediante Data Explorer, herramienta integrada en Atlas.

Con Data Explorer podremos:

- Crear bases de datos.
- Crear colecciones.
- Insertar documentos.
- Editar documentos.
- Eliminar documentos.
- Consultar documentos.

Flujo de trabajo:

MongoDB Atlas → Data Explorer → Bases de Datos → Colecciones → Documentos
