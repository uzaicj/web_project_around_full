import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import router from "./routes/index.js";
import mongoose from "mongoose";
import { errorHandler } from "./middleware/error-handler.js";
import cors from "cors";
import { createUser } from "./controllers/users.js";
import { login } from "./controllers/login.js";
import { auth } from "./middleware/auth.js";
import { loginLimiter, registerLimiter } from "./middleware/limiter.js";

const app = express();
const PORT = process.env.PORT || 3001;

const MONGO_URI = process.env.MONGO_URI;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined");
}

if (!CLIENT_ORIGIN) {
  throw new Error("CLIENT_ORIGIN is not defined");
}

app.set('trust proxy', 1);

app.use(cors({ origin: CLIENT_ORIGIN }));

mongoose
  .connect(MONGO_URI, { maxPoolSize: 10 })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de estado
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Rutas públicas
app.post("/signup", registerLimiter, createUser);
app.post("/signin", loginLimiter, login);

// Rutas protegidas
app.use(auth);
app.use(router);

// Recurso no encontrado
app.use((_req, res) => {
  res.status(404).json({ message: "Requested resource not found" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});