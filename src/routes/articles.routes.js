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
  validator,
  postArticle,
);

articlesRouter.put(
  "/:id",
  adminOrAuthorMiddleware,
  validationPutArtcile,
  validator,
  putArticle,
);

articlesRouter.delete(
  "/:id",
  adminOrAuthorMiddleware,
  validationDeleteArticle,
  validator,
  deleteArticle,
);
