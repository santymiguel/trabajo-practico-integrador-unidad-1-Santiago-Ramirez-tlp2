import express from "express";
import {
  deleteArticle,
  getArticle,
  getArticleByUser,
  getArticles,
  getArticlesByUser,
  postArticle,
  putArticle,
} from "../controllers/articles.controller";
// se importan los controladores

export const articlesRouter = express.Router();

articlesRouter.get("/", getArticles);
articlesRouter.get("/:id", getArticle);
articlesRouter.get("/user", getArticlesByUser);
articlesRouter.get("/user", getArticleByUser);

articlesRouter.post("/", postArticle);

articlesRouter.put("/:id", putArticle);

articlesRouter.delete("/:id", deleteArticle);
