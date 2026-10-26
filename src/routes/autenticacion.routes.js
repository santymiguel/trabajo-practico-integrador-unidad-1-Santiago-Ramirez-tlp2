import express from "express";
import { authMiddleware } from "../middleware/validation/authMiddleware.js";
import { register } from "../controllers/autenticacion/register.controller.js";

export const authRouter = express.Router();

authRouter.post("/auth/register", register);

authRouter.post("/auth/login", login);

authRouter.get("/auth/profile", authMiddleware, getProfile);

authRouter.put("/auth/profile", authMiddleware, updateProfile);

authRouter.post("/auth/logout", authMiddleware, verifyToken, logout);
