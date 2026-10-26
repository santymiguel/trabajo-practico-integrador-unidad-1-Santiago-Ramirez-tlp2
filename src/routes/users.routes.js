import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  postUser,
  putUser,
} from "../controllers/users.controller.js";
import {
  validationGetUser,
  validationPostUser,
} from "../middleware/validation.User.js";
import { validate } from "../middleware/validate.js";
// se importan los controladores

export const usersRouter = express.Router();

usersRouter.get("/", getUsers);
usersRouter.get("/:id", validationGetUser, validate, getUser);

usersRouter.post("/", validationPostUser, validate, postUser);

usersRouter.put("/:id", putUser);

usersRouter.delete("/:id", deleteUser);
