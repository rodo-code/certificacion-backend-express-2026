# Práctica 5 para el Jueves 11 de junio
---

## Recomendaciones

- Realizar los siguientes ejercicios usando el framework Express.js.
- Utilice la base de datos NoSQL Mongo DB.
- Puede usar otras las librerias que crea necesarias.
- Utilice la arquitectura por capas expuesta en clases.
- Utilice las buenas practicas del diseño de REST API expuesta en clases.
- Utilice buenas prácticas de diseño e implementación de código.

## Instrucciones

Crear los siguientes endpoints para una REST API.

### Modelo de datos

Se debe tener una base de datos de Mongo que almacene la siguiente información:

```json
{
    _id: "....",
    name: "Certificacion Backend",
    degree: "SIS",
    lecturer: "Ing. Rodolfo Catunta",
    schedule: "A+",
    credits: 6,
    active: true
}
```

Las validacioines para el cuerpo y modelo de datos deben ser:

- `name`, `degre` y `lecturer` deben ser si o si cadenas de caracteres.
- `schedule` debe ser uno de los siguientes `A+`, `B+`, `A`, `B`, `C`, `D`, `E`, `Z`.
- `credits` debe ser un entero positivo menor o igual a `10`.
- `active` debe ser un booleano.

### 1. GET /api/courses (10 puntos)

- Este endpoint busca obtener todos los cursos en la base de datos sin importar su estado de active u otro parámetro.

- La respuesta debe mostrar una lista de todos los cursos.

### 2. Filtros para GET /api/courses (10 puntos)

- Este endpoint busca filtrar los cursos.
- Los filtros se basan en `schedule`, `credits` y `active`
- Los filtros estan presente a través de query params por ejemplo el endpoint `GET /api/courses?schedule=A&credits=4&active=true` deberia filtrar todos los cursos en horario `A` que tengan `4` creditos y esten `activos`.
- Se debe responder con una lista de cursos.

### 3. POST /api/courses (10 puntos)

- Este endpoint busca agregar un curso a la base de datos.
- Este endpoint tiene un body, igual al del modelo de datos expuesto.
- Se debe responder con el curso creado en la base de datos.

### 4. GET /api/courses/:id (10 puntos)

- Este endpoint busca obtener un solo curso con un `id` determinado.
- Si ningún curso con el `id` especificado existe, se debe responder con un `404`.
- Si el `id` es correcto, se debe responder con la información del curso.

### 5. PATCH /api/courses/:id (10 puntos)

- Este endpoint busca modificar parcialmente un registro de un curso con `id` determinado.
- Si ningún curso con el `id` especificado existe, se debe responder con un `404`.
- Si el `id` es correcto, se debe modificar el curso y responder con la información actualizada del curso.
- El body recibido sigue parcialmente el modelo de datos descrito.

### 6. DELETE /api/courses/:id (10 puntos)

- Este endpoint busca hacer un borado lógico de un curso con `id` determinado.
- Si ningún curso con el `id` especificado existe, se debe responder con un `404`.
- Si el `id` es correcto, se debe modificar el estado de `active` del curso a `false`.
- Se debe responder con el curso actualizado con `active` igual a `false`.

### 7. PUT /api/courses/schedule (10 puntos)

- Este endpoint recibe un body con un arreglo de `id` de cursos.
- El objetivo del endpoint es validar que en el arreglo de cursos no haya solapamiento de horarios y este sea un horario válido.
- El arreglo no debe tener dos cursos que tengan horario `A` por ejemplo, pues estos chocarian.
- Tampoco pueden existir dos materias con horario `A` y `A+` o `B` y `B+`.
- Se debe responder con un arreglo de cursos indicando los choques de materias y/o con la lista de cursos si es que el arreglo de cursos es válido para un horario.

## Evaluación

- Se evaluará cada endpoint de acuerdo a la ponderación descrita en las instrucciones, adicionalmente, se evaluará los siguientes aspectos con la ponderación descrita a continuación:

1. Uso de arquitectura por capas **(10 puntos)**.
2. Manejo correcto de errores y de validaciones para el uso de la REST API **(10 puntos)**.
3. Uso correcto de la Base de Datos **(10 puntos)**.