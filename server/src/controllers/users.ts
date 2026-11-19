
import User from "../models/user.js";
import type { Response, Request } from "express";
import bcrypt from "bcrypt";

const getUsers = async (req: Request, res: Response) => {
  const data = await User.find({}).select(
    "_id name about avatar"
  );

  res.send(data);
};

const getUser = async (req: Request, res: Response) => {
  const data = await User.findById(req.params.id).select(
    "_id name about avatar"
  );

  if (!data) {
    throw Object.assign(new Error("User ID not found"), {
      statusCode: 404,
    });
  }

  res.send(data);
};

const getCurrentUser = async (req: Request, res: Response) => {
  const data = await User.findById(req.user?._id).select(
    "_id name about avatar email"
  );

  if (!data) {
    throw Object.assign(new Error("User ID not found"), {
      statusCode: 404,
    });
  }

  res.send(data);
};

const patchUser = async (req: Request, res: Response) => {
  const { name, about } = req.body;

  const data = await User.findByIdAndUpdate(
    req.user?._id,
    { name, about },
    { new: true, runValidators: true }
  ).select("_id name about avatar email");

  if (!data) {
    throw Object.assign(new Error("User ID not found"), {
      statusCode: 404,
    });
  }

  res.send(data);
};

const patchAvatar = async (req: Request, res: Response) => {
  const { avatar } = req.body;

  const data = await User.findByIdAndUpdate(
    req.user?._id,
    { avatar },
    { new: true, runValidators: true }
  ).select("_id name about avatar email");

  if (!data) {
    throw Object.assign(new Error("User ID not found"), {
      statusCode: 404,
    });
  }

  res.send(data);
};

const createUser = async (req: Request, res: Response) => {
  const { name, about, avatar, password, email } = req.body;

  if (!password || !email) {
    throw Object.assign(new Error("Missing required fields"), {
      statusCode: 400,
    });
  }

  if (password.length < 8) {
    throw Object.assign(
      new Error("Password must be at least 8 characters long"),
      { statusCode: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new User({
      name,
      about,
      avatar,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      _id: newUser._id,
      email: newUser.email,
      name: newUser.name,
      about: newUser.about,
      avatar: newUser.avatar,
    });
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === 11000
    ) {
      throw Object.assign(new Error("Email already exists"), {
        statusCode: 409,
      });
    }

    throw error;
  }
};

export {
  getUsers,
  getUser,
  getCurrentUser,
  patchUser,
  patchAvatar,
  createUser,
};
