# Notas de la Clase 13 - Creación de un Servidor Básico con Express.js

## Instalación de Express

Para instalar el framework de backend `express` haremos `npm install express`.

## Inicializando y creando la app con express

Para inicializar la app con express, se debe importar `express`, y crear una instancia del mismo, de la siguiente manera;

```javascript
import express from "express";

const app = express();
```

## Configuración inicial de la app

Inicialmente podemos configurar el puerto que escuchará la app, por defecto nuevamente usaremos `3000`. Asi quedaria el código para que la app escuche un determinado puerto.

```javascript
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
```

## Creación de middleware básico para formato de Body

Usaremos una de las capacidades de express para crear un middleware que antes de enviar el request a la lógica de enrutamiento pueda darle formato a la petición enviada en el cuerpo de la petición.

Para esto usaremos lo siguiente:

```javascript
app.use(express.json());
```

El cual es un middleware que convertira el `body` enviado a la app en un `JSON` y de esta forma en un objeto que JavaScript puede leer, guardará esta información en `req.body`.

Existen otros middlewares para otros formatos como ser:

```javascript
app.use(express.text());                            // Para formatear a texto plano
app.use(express.urlencoded({ extended: true }));    // Para formatear datos enviados desde un formulario HTML
app.use(express.raw());                             // Para recibir datos sin procesar
```

## Creando funciones de Routing

Para indicarle a nuestra app la lógica para responder una determinada ruta usamos las siguientes funciones

```javascript
app.get("/", (req,res) => {...});
app.post("/", (req,res) => {...});
app.patch("/", (req,res) => {...});
app.put("/", (req,res) => {...});
app.delete("/", (req,res) => {...});
```

En cada función de routing podemos usar `req` para obtener el `body` recibido haciendo.

```javascript
const body = req.body;
```

Tambien podemos usar `res` para retonar cierto código y un contenido.

```javascript
res.send("text");   // Nos permite enviar texto o HTML como respuesta
res.json({...});    // Nos permite enviar una respuesta JSON
res.end();          // Envia la respusta con lo construido hasta ese momento
res.status(code);   // Indica que la respuesta debe tener codigo code.
```