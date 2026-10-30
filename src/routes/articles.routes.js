import express from "express";
import {
  deleteArticle,
  getArticle,
  getArticleByUser,
  getArticles,
  getArticlesByUser,
  postArticle,
  putArticle,
} from "../controllers/articles.controller.js";
import { authMiddleware } from "../middleware/validation/authMiddleware.js";
import {
  validationDeleteArticle,
  validationDeleteUser,
  validationPostArticle,
  validationPutArtcile,
} from "../middleware/validation.articles.js";
import { adminOrAuthorMiddleware } from "../middleware/validation/adminOrAutorMiddleware.js";
import { validate } from "../middleware/validate.js";
// se importan los controladores

export const articlesRouter = express.Router();

articlesRouter.get("/", authMiddleware, getArticles);
articlesRouter.get("/:id", authMiddleware, getArticle);
articlesRouter.get("/user", authMiddleware, getArticlesByUser);
articlesRouter.get("/user/:id", authMiddleware, getArticleByUser);

articlesRouter.post(
  "/",
  authMiddleware,
  validationPostArticle,
  validate,
  postArticle,
);

articlesRouter.put(
  "/:id",
  adminOrAuthorMiddleware,
  validationPutArtcile,
  validate,
  putArticle,
);

articlesRouter.delete(
  "/:id",
  adminOrAuthorMiddleware,
  validationDeleteArticle,
  validate,
  deleteArticle,
);
