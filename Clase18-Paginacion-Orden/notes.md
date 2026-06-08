# Guía de Notas: Paginación y Ordenamiento en APIs REST con Express.js

## ¿Por qué usar paginación?

Cuando una API tiene muchos registros, no es eficiente devolverlos todos en una sola respuesta. Por eso se utiliza paginación.

## Paginación

Ejemplo:

```http
GET /students?page=1&limit=10
```

- page: número de página.
- limit: cantidad de registros por página.

Fórmula:

```js
const startIndex = (page - 1) * limit;
const endIndex = page * limit;
```

Ejemplo:

| Página | Límite | startIndex | endIndex |
|---------|---------|------------|----------|
| 1 | 10 | 0 | 10 |
| 2 | 10 | 10 | 20 |
| 3 | 10 | 20 | 30 |

Implementación:

```js
app.get('/students', (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const data = students.slice(startIndex, endIndex);

  res.json({
    page,
    limit,
    total: students.length,
    totalPages: Math.ceil(students.length / limit),
    data
  });
});
```

## Ordenamiento

Ejemplo:

```http
GET /students?sortBy=grade&order=desc
```

- sortBy: campo de ordenamiento.
- order: asc o desc.

Implementación:

```js
const sortedStudents = [...students].sort((a, b) => {
  if (order === 'asc') {
    return a[sortBy] > b[sortBy] ? 1 : -1;
  }

  return a[sortBy] < b[sortBy] ? 1 : -1;
});
```

## Paginación + Ordenamiento

```http
GET /students?page=1&limit=10&sortBy=grade&order=desc
```

Buenas prácticas:

- Usar Query Parameters.
- Incluir información de paginación en la respuesta.
- Mantener una estructura de respuesta consistente.
- Combinar filtros, búsqueda, paginación y ordenamiento mediante query params.
