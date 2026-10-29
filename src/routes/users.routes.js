import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  postUser,
  putUser,
} from "../controllers/users.controller.js";
import {
  validationDeleteUser,
  validationGetUser,
  validationPostUser,
  validationPutUser,
} from "../middleware/validation.User.js";
import { validate } from "../middleware/validate.js";
import { adminMiddleware } from "../middleware/validation/adminMiddleware .js";
// se importan los controladores

export const usersRouter = express.Router();

usersRouter.get("/", adminMiddleware, getUsers);
usersRouter.get("/:id", adminMiddleware, validationGetUser, validate, getUser);

usersRouter.post("/", adminMiddleware, validationPostUser, validate, postUser);

usersRouter.put("/:id", adminMiddleware, validationPutUser, validate, putUser);

usersRouter.delete(
  "/:id",
  adminMiddleware,
  validationDeleteUser,
  validate,
  deleteUser,
);
