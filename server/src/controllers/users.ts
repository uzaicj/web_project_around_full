import User from "../models/user.js";
import type { Response, Request } from "express";


const getUsers = async (req: Request, res: Response) => {
  const data = await User.find({});

  res.send(data);
};

const getUser = async (req: Request, res: Response) => {
  const data = await User.findById(req.params.id);

  if (!data) {
    throw Object.assign(new Error("User ID not found"), {
      statusCode: 404,
    });
  }

  res.send(data);
};

const getCurrentUser = async (req: Request, res: Response) => {
  const data = await User.findById(req.user?._id);

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
  );

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
  );

  if (!data) {
    throw Object.assign(new Error("User ID not found"), {
      statusCode: 404,
    });
  }

  res.send(data);
};

const createUser = async (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  const newUser = new User({ name, about, avatar });
  await newUser.save();

  res.status(201).json(newUser);
};




export { getUsers, getUser, getCurrentUser, patchUser, patchAvatar, createUser };
