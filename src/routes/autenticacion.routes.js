import express from "express";
import { authMiddleware } from "../middleware/validation/authMiddleware.js";
import { register } from "../controllers/autenticacion/register.controller.js";
import {
  validationLogin,
  validationRegister,
} from "../middleware/validation.auth.js";
import { validate } from "../middleware/validate.js";

export const authRouter = express.Router();

authRouter.post("/auth/register", validationRegister, validate, register);

authRouter.post("/auth/login", validationLogin, validate, login);

authRouter.get("/auth/profile", authMiddleware, getProfile);

authRouter.put("/auth/profile", authMiddleware, updateProfile);

authRouter.post("/auth/logout", authMiddleware, verifyToken, logout);
