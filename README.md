# Around The U.S.

A responsive web application where users can share photographs of places, create cards, interact with other users' content, and manage their personal profiles.

## Features

### Authentication
- User registration and login.
- JWT-based authentication.
- Protected routes for authenticated users.
- Session persistence using localStorage.
- Logout functionality.

### User Profile
- View user information and profile avatar.
- Edit profile information.
- Update profile avatar.

### Cards
- Display cards retrieved from the database.
- Add new cards.
- Like and unlike cards.
- Delete your own cards.
- Update the interface dynamically after user interactions.

### User Interface
- Responsive design for desktop and mobile devices.
- Interactive popups and forms.
- Registration and authentication feedback through InfoTooltip.

## Technologies

**Frontend**
- React
- TypeScript
- React Router
- Vite
- HTML5
- CSS3

**Backend**
- Node.js
- Express
- MongoDB
- Mongoose

**Authentication**
- TripleTen Authentication API
- JSON Web Tokens (JWT)
- localStorage

**Development Tools**
- Git
- GitHub
- npm

## Project Structure

web_project_around_full/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── blocks/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── images/
│   │   ├── utils/
│   │   ├── main.tsx
│   │   └── index.css
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   └── package.json
│
├── package.json
└── README.md


## Installation

Clone the repository:

git clone https://github.com/uzaicj/web_project_around_full.git


Navigate to the project directory:

cd web_project_around_full


Install dependencies for both the client and server:

npm run install:all

## Running the Application

Start the backend server in one terminal:

npm run dev:server


The backend API runs at:

`http://localhost:3001`

Start the frontend in a separate terminal:

npm run dev:client

The frontend runs at:

`http://localhost:3000`

Both applications must be running simultaneously.



## Author

Developed as part of the TripleTen Full Stack Web Development program.