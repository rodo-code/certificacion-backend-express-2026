# Práctica 4 para Domingo 24 de mayo
---

## Instrucciones

Sobre el código disponible en [Clase10-Servidor-Basico](https://github.com/rodo-code/certificacion-backend-express-2026/blob/main/Clase10-Servidor-Basico) realiza los siguientes ejercicios, cada uno puntua igual.

Para la realización correcta de esta práctica se le pide al estudiante pueda investigar lo siguiente:

- Como leer un body en formato JSON de una petición.
- Como instalar una libreria con `npm`.
- Como eliminar y sobrescribir un archivo usando la libreria `fs/promises`.
- Códigos de respuesta HTTP.
- Métodos HTTP.
- Uso correcto de Postman para enviar un `body` en formato JSON.

## Ejercicio 1

### Nueva petición

Actualiza la lógica del servidor para que maneje la petición

```text
POST /words
```

### Parámetros o Body

La petición recibirá un `body` en formato `JSON` bajo el siguiente formato:

```json
{
    "word": "Maria Jose"
}
```

### Resultado esperado

- La petición debe agregar la palabra o palabras que describa el body en la propiedad `word`, al archivo `content.txt`.

## Ejercicio 2

### Nueva petición

Actualiza la lógica del servidor para que maneje la petición

```text
GET /words/{line}
```

### Parámtros o Body

- Esta petición recibe un parámetro llamado `line` en la `url`.
- `line` debe ser un número entero mayor a 0, sin embargo nota que un usuario podria no enviar un número entero en ese parámetro.
- `line` representa la linea de texto que un usuario quiere obtener del archivo, asumimos que la primera linea del archivo es igual a `1`.

### Resultado esperado

- Si el usuario usara la ruta `/words/1` se espera que se devuelva el contenido de la primera linea del archivo `content.txt`
- Si el usuario usara la ruta `/words/xd` se espera que se devuelva un error indicando un código `400 - Bad Request`
- Suponiendo que el archivo solo tiene 10 lineas de contenido y el usuario usara la ruta `/words/20` se espera que se devuelva un error indicando un código `404 - Not Found`
- La diferencia entre responder con `400` o `404` radica en el tipo del parámetro `line`, si `line` es un `number` responde con un `404` en caso contrario con un `400`.

## Ejercicio 3

### Nueva petición

Actualiza la lógica del servidor para que maneje la petición

```text
GET /random-word
```

### Parámtros o Body

- Esta petición no recibe ningún parámetro o body.

### Resultado esperado

- Se espera que el desarrollador use la libreria [random-item](https://www.npmjs.com/package/random-item) para este ejercicio
- Debe devolver el contenido de una linea aleatoria del archivo `content.txt`

## Ejercicio 4

### Nueva petición

Actualiza la lógica del servidor para que maneje la petición

```text
PATCH /words/{line}
```

### Parámtros o Body

- Esta petición recibe un parámetro llamado `line` en la `url`.
- `line` debe ser un número entero mayor a 0, sin embargo nota que un usuario podria no enviar un número entero en ese parámetro.
- `line` representa la linea de texto que un usuario quiere **modificar** del archivo, asumimos que la primera linea del archivo es igual a `1`.
- Además de un parámetro esta petición recibirá el siguiente body, indicando el nuevo contenido de la linea `line`.
```json
{
    "word": "Mario Alberto"
}
```

### Resultado esperado

- Si el usuario usara la ruta `/words/1` se espera que se modifique el contenido de la primera linea del archivo `content.txt` con la palabra contenida en el body.
- Si el usuario usara la ruta `/words/xd` se espera que se devuelva un error indicando un código `400 - Bad Request`
- Suponiendo que el archivo solo tiene 10 lineas de contenido y el usuario usara la ruta `/words/20` se espera que se devuelva un error indicando un código `404 - Not Found`
- La diferencia entre responder con `400` o `404` radica en el tipo del parámetro `line`, si `line` es un `number` responde con un `404` en caso contrario con un `400`.

## Ejercicio 5

### Nueva petición

Actualiza la lógica del servidor para que maneje la petición

```text
DELETE /words/{line}
```

### Parámtros o Body

- Esta petición recibe un parámetro llamado `line` en la `url`.
- `line` debe ser un número entero mayor a 0, sin embargo nota que un usuario podria no enviar un número entero en ese parámetro.
- `line` representa la linea de texto que un usuario quiere **eliminar** del archivo, asumimos que la primera linea del archivo es igual a `1`.

### Resultado esperado

- Si el usuario usara la ruta `/words/1` se espera que se elimine el contenido de la primera linea del archivo `content.txt` con la palabra contenida en el body, si el archivo tenia 10 lineas, ahora debe quedar con 9 lineas.
- Si el usuario usara la ruta `/words/xd` se espera que se devuelva un error indicando un código `400 - Bad Request`
- Suponiendo que el archivo solo tiene 10 lineas de contenido y el usuario usara la ruta `/words/20` se espera que se devuelva un error indicando un código `404 - Not Found`
- La diferencia entre responder con `400` o `404` radica en el tipo del parámetro `line`, si `line` es un `number` responde con un `404` en caso contrario con un `400`.

## Consideraciones Finales

- No esta prohibido modificar las rutas pre existentes hechas en clase, de ser necesario el estudiante puede modificar la lógica de las mismas para beneficio de la realización de esta tarea.
- Al realizar el testing de esta tarea, se recomienda usar Postman y verificar si el contenido de `content.txt` esta cumpliendo la acción de la ruta determinada.
- Para la realización de algunos ejercicios sera necesario actualizar `fileService.js`.
- **Se dará puntaje extra a los trabajos que además de cumplir con la funcionalidad mencionada eviten el uso de código repetitivo**