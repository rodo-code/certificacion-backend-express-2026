# Notas Clase 20 - Conexion a Base de Datos Mongo DB

## Configuracion de variables de entorno

1. Instalar el package `dotenv`, haciendo `npm install dotenv`.
2. Crear un archivo `.env` donde guardaremos las variables de entorno del proyecto, por ejemplo `PORT=3002`
3. Para invocar a las variables de entorno configuradas en `.env` hacemos:
```javascript
const PORT = process.env.PORT || 3000;
```

Nota que en este archivo colocaremos nuestra conexión a base de datos, tambien nota que este archivo jamas debe ser subido a un repositorio.

## Conectar con MongoDB

Nuestro archivo `.env` debe lucir de la siguiente manera:

```text
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/university
PORT=3000
```

Para conectarnos a MongoDB usaremos `moongose` asi que lo instalamos haciendo `npm install mongoose` y luego hacemos una función asincrona para la conexión:

```javascript 
import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB conectado correctamente");
  } catch (error) {
    console.error("Error conectando MongoDB:", error.message);
    process.exit(1);
  }
}
```

## Crear modelo de datos 

Mongoose es una capa de abstracción que nos permitirá usar más facilmente Mongo DB, nos permite crear un modelo que servira para hacer consultas mas facil a la base de datos, para crear el modelo hacemos:

```javascript
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: String,
  grade: Number,
  site: String,
  active: Boolean
});

export const Student = mongoose.model("Student", studentSchema);
```

Al crear el schema y el modelo, mongoose se conectara directamente con la collection `students`.

## Uso básico del modelo

Usaremos el modelo en `GET` y `POST` en esta clase.

Para usarlo en `GET` haremos uso de la función `find()`

```javascript
const studentList = await Student.find();
```

Para usarlo en `POST` haremos uso de la funcion `create()`

```javascript
const createdStudent = await Student.create({
  name: "Ana",
  grade: 95,
  site: "LP",
  active: true
});
```