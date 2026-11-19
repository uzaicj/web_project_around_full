
import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { Response, Request } from "express";
import User from "../models/user.js";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // 1. Comprobar que lleguen las credenciales
  if (!email || !password) {
    throw Object.assign(new Error("Missing email or password"), {
      statusCode: 400,
    });
  }

  // 2. Buscar al usuario por correo
  const user = await User.findOne({ email });

  // 3. Comprobar que exista
  if (!user) {
    throw Object.assign(new Error("Invalid email or password"), {
      statusCode: 401,
    });
  }

  // 4. Comparar la contraseña recibida con el hash guardado
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw Object.assign(new Error("Invalid email or password"), {
      statusCode: 401,
    });
  }

  // 5. Crear el token
  const token = jwt.sign(
    { _id: user._id },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  // 6. Devolver el token y los datos públicos
  return res.status(200).json({
    token,
    user: {
      _id: user._id,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    },
  });
};
