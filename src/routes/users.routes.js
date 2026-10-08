import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  postUser,
  putUser,
} from "../controllers/users.controller";
import {
  validationGetUser,
  validationPostUser,
} from "../middleware/validation.User";
import { validate } from "../middleware/validate";
// se importan los controladores

export const usersRouter = express.Router();

usersRouter.get("/", getUsers);
usersRouter.get("/:id", validationGetUser, validate, getUser);

usersRouter.post("/", validationPostUser, validate, postUser);

usersRouter.put("/:id", putUser);

usersRouter.delete("/:id", deleteUser);
