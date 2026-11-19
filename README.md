# Around The US

Aplicación web full stack que permite a los usuarios compartir fotografías de diferentes lugares, crear tarjetas, editar su perfil y gestionar sus publicaciones.

El proyecto implementa un sistema de autenticación y autorización para proteger las rutas y operaciones que requieren un usuario registrado.

## Tecnologías utilizadas

### Frontend
- React
- TypeScript
- Vite
- CSS
- React Router

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt

## Funcionalidades

- Registro e inicio de sesión de usuarios.
- Autenticación mediante JWT.
- Protección de rutas privadas.
- Visualización de tarjetas.
- Creación y eliminación de tarjetas.
- Edición de información del perfil.
- Actualización del avatar.
- Gestión de likes en las tarjetas.
- Persistencia de información mediante MongoDB.

## Despliegues

Frontend: https://web-project-around-full-hno4.vercel.app/signin

Backend: https://web-project-around-full-jade.vercel.app/

## Estructura del proyecto

web_project_around_full/
├── client/
│   ├── src/
│   ├── public/
│   ├── .env.example
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   └── app.ts
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md

## Instalación

### 1. Clonar el repositorio


git clone URL_DEL_REPOSITORIO
cd web_project_around_full


### 2. Instalar dependencias

Instalar las dependencias del frontend y backend:


npm install
npm install --prefix client
npm install --prefix server


### 3. Configurar variables de entorno

Crear los archivos `.env` correspondientes tomando como referencia los archivos `.env.example`.

**Server (.env)**

PORT=3000
MONGO_URL=tu_cadena_de_conexion
JWT_SECRET=tu_clave_secreta
CLIENT_ORIGIN=http://localhost:5173


**Client (.env)**


VITE_API_URL=http://localhost:3000



### 4. Ejecutar el proyecto

Desde la raíz del proyecto:


npm run dev:server


En otra terminal:


npm run dev:client


El frontend estará disponible en:

`http://localhost:5173`

El backend estará disponible en:

`http://localhost:3000`

## Base de datos

El proyecto utiliza MongoDB y Mongoose para almacenar la información.

Las colecciones principales son:

- **users:** información y credenciales de los usuarios.
- **cards:** información de las tarjetas compartidas.

La conexión se configura mediante la variable de entorno `MONGO_URL`.

## Autenticación y seguridad

- Contraseñas protegidas mediante bcrypt.
- Autenticación basada en JWT.
- Middleware para verificar tokens.
- Protección de rutas privadas.
- Variables sensibles almacenadas en archivos de entorno.

## Autor

Proyecto desarrollado como parte del programa de Desarrollo Web Full Stack de TripleTen.
