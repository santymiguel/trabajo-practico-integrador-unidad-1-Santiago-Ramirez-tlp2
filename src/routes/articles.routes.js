import express from "express";
// se importan los controladores

export const articlesRouter = express.Router();

articlesRouter.get("/", getArticles);
articlesRouter.get("/:id", getArticle);
articlesRouter.get("/user", getArticlesByUser);
articlesRouter.get("/user", getArticleByUser);

articlesRouter.post("/", postArticle);

articlesRouter.put("/:id", putArticle);

articlesRouter.delete("/:id", deleteArticle);
