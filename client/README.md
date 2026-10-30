Around The U.S. — React + TypeScript

Proyecto desarrollado como parte del Sprint 12 del bootcamp de desarrollo web.

La aplicación Around The U.S. permite a los usuarios visualizar tarjetas de lugares, agregar nuevos lugares, editar su perfil y avatar, dar y quitar "Me gusta" y eliminar las tarjetas que les pertenecen.

🚀 Tecnologías
React
TypeScript
Vite
HTML5
CSS3
JavaScript
REST API
React Hooks
Context API
📁 Estructura del proyecto
src/
├── components/
│   ├── App.tsx
│   ├── Header/
│   ├── Main/
│   │   ├── Main.tsx
│   │   ├── Card/
│   │   └── Popup/
│   │       ├── EditAvatar/
│   │       ├── EditProfile/
│   │       ├── ImagePopup/
│   │       ├── NewCard/
│   │       ├── RemoveCard/
│   │       └── Popup.tsx
│   └── Footer/
│
├── contexts/
│   └── CurrentUserContext.tsx
│
├── hooks/
│   └── useFormValidation.ts
│
├── types/
│   └── types.ts
│
├── utils/
│   └── api.ts
│
├── images/
├── blocks/
├── index.css
└── main.tsx
✨ Funcionalidades
Obtener información del usuario mediante la API.
Obtener las tarjetas iniciales desde la API.
Editar nombre y descripción del perfil.
Actualizar la imagen de perfil.
Agregar nuevas tarjetas.
Abrir las imágenes de las tarjetas en un popup.
Dar y quitar "Me gusta" a las tarjetas.
Eliminar tarjetas propias.
Mostrar el botón de eliminar únicamente al propietario de la tarjeta.
Validar los formularios.
Mostrar mensajes de error de validación.
Deshabilitar los botones de envío cuando los formularios no son válidos.
Cerrar los popups.
Actualizar la interfaz después de las operaciones realizadas mediante la API.
🧠 Arquitectura React

El proyecto utiliza una arquitectura basada en componentes.

El estado principal se mantiene en App.tsx, incluyendo:

Usuario actual.
Lista de tarjetas.
Popup activo.

CurrentUserContext permite compartir la información del usuario actual y las funciones relacionadas con las operaciones principales.

Los componentes Main y Card están suscritos al contexto.

Las solicitudes a la API se realizan desde App.tsx, manteniendo la lógica de comunicación con el servidor fuera de los componentes de presentación.

🔌 API

La comunicación con el servidor se encuentra centralizada en:

src/utils/api.ts

La clase Api contiene métodos para:

Obtener información del usuario.
Obtener las tarjetas.
Actualizar el perfil.
Actualizar el avatar.
Agregar tarjetas.
Dar "Me gusta".
Quitar "Me gusta".
Eliminar tarjetas.
📝 Validación de formularios

El proyecto utiliza un hook personalizado:

src/hooks/useFormValidation.ts

Este hook aprovecha la validación nativa del navegador para comprobar los campos y controlar:

Errores de validación.
Estado de validez de cada campo.
Estado general del formulario.

Se utiliza en los formularios de:

Editar perfil.
Agregar una tarjeta.
🛠️ Instalación

Clona el repositorio y entra en la carpeta del proyecto:

git clone <https://github.com/uzaicj/web_project_around_react>
cd <web_project_around_react>

Instala las dependencias:

npm install
▶️ Ejecutar el proyecto

Para iniciar el servidor de desarrollo:

npm run dev

Vite iniciará la aplicación en el navegador.

📦 Build de producción

Para generar la versión de producción:

npm run build
🔍 Vista previa de producción

Después de realizar el build:

npm run preview
👨‍💻 Autor

Proyecto desarrollado como parte del proceso de aprendizaje de desarrollo web Full Stack.