import { Router } from "express";
import { getUsers, getUser, getCurrentUser, patchUser, patchAvatar, createUser } from "../controllers/users.js";

const usersRouter = Router();

usersRouter.get("/", getUsers);
usersRouter.get("/me", getCurrentUser);
usersRouter.patch("/me", patchUser);
usersRouter.patch("/me/avatar", patchAvatar);
usersRouter.get("/:id", getUser);
usersRouter.post("/", createUser);

export default usersRouter;
