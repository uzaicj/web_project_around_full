
import express from "express";
import router from "./routes/index.js";
import mongoose from "mongoose";
import { errorHandler } from "./middleware/error-handler.js";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors({ origin: "http://localhost:3000" }));

mongoose
  .connect("mongodb://127.0.0.1:27017/aroundb")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware temporal: simula un usuario autenticado
app.use((req, res, next) => {
  req.user = {
    _id: "6ad04f0b0435a3a19307ac1c",
  };

  next();
});

// Rutas
app.use(router);

// Recurso no encontrado
app.use((_req, res) => {
  res.status(404).json({ message: "Requested resource not found" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
