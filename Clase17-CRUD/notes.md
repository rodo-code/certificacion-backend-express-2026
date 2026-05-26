# Notas de la clase 17 - CRUD en arreglos

## Trabajo para participación

Modificar el proyecto actual para que el estudiante ahora tenga el siguiente formato:

```javascript
{
    id: 12345,
    name: "Matias Meneses",
    grade: 78,
    site: "LP",
    active: 1
}
```

Modificaciones al proyecto actual:

- Cuando se haga una peticion a `POST /api/students` se debe validar, que `id` sea un número, `name` un string, `grade` un número entre 0 y 100 inclusive, que `site` sea `LP` o `CB` o `SC` y que `active` se o bien 0 o 1.

- Se debe adicionar un filtro a través de un query param en la ruta `GET /api/students` que tenga el formato `?site=LP` este filtro solo se aplica si `site` es uno de los mencionados en el punto anterior.

- Modificar el comportamiento de `GET /api/students/:id` para ahora utilizar el `id` de un estudiante para responder.

- Modificar el comportamiento de `GET /api/students` para solo devolver estudiantes activos, es decir que tengan `active` igual a `1`.

## Operaciones CRUD 

### PUT o modificar completamente 

- Usaremos la ruta `PUT /api/students`
- Para hacer un PUT debemos recibir por completo un nuevo estudiante.
- Debemos validar nuevamente todo el cuerpo antes de modificar el registro
- Deberiamos buscar por `id` y luego actualizar todo el registro.

### PATCH o modificar parcialmente

- Usaremos la ruta `PATCH /api/students/:id`
- Solo podremos actualizar un estudiante en base a su `id`
- Debemos validar que no se trate de modificar `id` ni `active`, solo `name`, `grade` y `site`.

### DELETE o borrado logico

- Usaremos la ruta `DELETE /api/students/:id`
- Usaremos el campo `active` para borrar un elemento simplemente haciendo que tenga `active` igual a `0`.

### DELETE o borrado físico

- Modifica la ruta anterior `DELETE /api/students/:id`
- Para ahora hacer un borrado fisico, es decir eliminar completamente un estudiante de la lista de estudiantes (por puntos de participación).