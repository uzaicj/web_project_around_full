# Around API

API REST desarrollada con **Node.js, Express, TypeScript y MongoDB** como parte del Proyecto 14 del programa de Desarrollo Web de TripleTen.

## Descripción del proyecto

Around API es un servidor backend para una aplicación en la que los usuarios pueden gestionar sus perfiles y tarjetas con imágenes. La API permite consultar y actualizar información de usuarios, crear y eliminar tarjetas, y agregar o quitar likes.

El proyecto utiliza MongoDB para almacenar los datos y Mongoose para definir los modelos, validar la información y realizar operaciones sobre la base de datos.

## Funcionalidades

### Usuarios

- Obtener la lista de usuarios.
- Consultar los datos del usuario actual.
- Buscar un usuario por su ID.
- Crear usuarios.
- Actualizar el nombre y la descripción del perfil.
- Actualizar el avatar del usuario.

### Tarjetas

- Obtener todas las tarjetas.
- Crear tarjetas con nombre e imagen.
- Eliminar tarjetas por su ID.
- Agregar y quitar likes.
- Identificar si el usuario actual ha dado like a cada tarjeta mediante la propiedad `isLiked`.

### Validación y manejo de errores

- Validación de campos mediante esquemas de Mongoose.
- Validación de direcciones URL mediante expresiones regulares.
- Comprobación del formato de los identificadores de MongoDB.
- Manejo centralizado de errores HTTP.
- Respuestas JSON con códigos de estado adecuados para operaciones exitosas y errores.

## Tecnologías utilizadas

- **Node.js:** entorno de ejecución de JavaScript.
- **Express:** creación del servidor y definición de rutas HTTP.
- **TypeScript:** tipado estático para mejorar la organización y la seguridad del código.
- **MongoDB:** base de datos NoSQL.
- **Mongoose:** modelado de datos, validaciones y operaciones con MongoDB.
- **ES Modules:** organización del código mediante `import` y `export`.
- **tsx:** ejecución de TypeScript durante el desarrollo.
- **Nodemon:** reinicio automático del servidor durante el desarrollo.
- **ESLint:** análisis estático del código.
- **Prettier:** apoyo al formato consistente del código.

## Requisitos previos

Para ejecutar el proyecto necesitas:

- Node.js y npm instalados.
- MongoDB instalado y en ejecución.
- Git, si deseas clonar el repositorio.

## Instalación

1. Clona el repositorio y entra en la carpeta del proyecto.
2. Instala las dependencias:

   npm install

3. Inicia MongoDB y verifica que esté disponible en la dirección configurada en la aplicación:

   mongodb://localhost:27017/aroundb
   

4. Inicia el servidor en modo desarrollo:

   npm run dev

El servidor estará disponible en `http://localhost:3000`.

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor en modo desarrollo con recarga automática. |
| `npm run build` | Compila el código TypeScript. |
| `npm run start` | Ejecuta la versión compilada desde `dist/`. |
| `npm run lint` | Analiza el código con ESLint. |

Para ejecutar la versión de producción localmente, compila primero el proyecto:

npm run build
npm run start

## Endpoints principales

### Usuarios

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/users` | Obtiene todos los usuarios. |
| GET | `/users/me` | Obtiene el usuario actual. |
| GET | `/users/:id` | Obtiene un usuario por su ID. |
| POST | `/users` | Crea un usuario. |
| PATCH | `/users/me` | Actualiza el perfil. |
| PATCH | `/users/me/avatar` | Actualiza el avatar. |

### Tarjetas

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/cards` | Obtiene todas las tarjetas. |
| POST | `/cards` | Crea una tarjeta. |
| DELETE | `/cards/:id` | Elimina una tarjeta. |
| PUT | `/cards/:id/likes` | Agrega un like. |
| DELETE | `/cards/:id/likes` | Quita un like. |

## Códigos de estado HTTP

La API utiliza los siguientes códigos de estado para comunicar el resultado de las solicitudes:

- **200 OK:** solicitud procesada correctamente.
- **201 Created:** recurso creado correctamente.
- **400 Bad Request:** datos inválidos o identificador con formato incorrecto.
- **404 Not Found:** recurso o ruta no encontrados.
- **500 Internal Server Error:** error interno del servidor.

Los errores se gestionan mediante un middleware centralizado y las respuestas de error contienen un campo `message`.

## Estructura del proyecto


├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   └── app.ts
├── dist/
├── .editorconfig
├── .gitignore
├── eslint.config.js
├── package.json
├── tsconfig.json
└── README.md


La carpeta `dist/` se genera al compilar el proyecto y no debe incluirse en el repositorio. La carpeta `node_modules/` también debe estar excluida mediante `.gitignore`.

## Autorización

El proyecto utiliza un middleware de autorización temporal que asigna un usuario de prueba a las solicitudes. Este mecanismo permite desarrollar y comprobar las funcionalidades relacionadas con el usuario actual sin implementar todavía un sistema completo de autenticación.


## Autor

Proyecto realizado como parte del programa de Desarrollo Web de TripleTen.
