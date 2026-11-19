import { Router } from "express";
import { getUsers, getUser, getCurrentUser, patchUser, patchAvatar } from "../controllers/users.js";

const usersRouter = Router();

usersRouter.get("/", getUsers);
usersRouter.get("/me", getCurrentUser);
usersRouter.patch("/me", patchUser);
usersRouter.patch("/me/avatar", patchAvatar);
usersRouter.get("/:id", getUser);

export default usersRouter;
