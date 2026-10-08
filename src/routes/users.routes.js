import express from "express";
// se importan los controladores

export const usersRouter = express.Router();

usersRouter.get("/", getUsers);
usersRouter.get("/:id", getUser);

usersRouter.post("/", postUser);

usersRouter.put("/:id", putUser);

usersRouter.delete("/:id", deleteUser);
