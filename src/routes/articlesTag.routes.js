import express from "express";
import {
  deleteArticleTag,
  postArticleTag,
} from "../controllers/articlesTags.controller.js";
import {
  deleteArticleTagMiddleware,
  postArticleTagMiddleware,
} from "../middleware/validation/autorArticleTag.Middleware.js";
//import controladores

export const articlesTagRouter = express.Router();

articlesTagRouter.post("/", postArticleTagMiddleware, postArticleTag);
articlesTagRouter.delete(
  "/:articleTagId",
  deleteArticleTagMiddleware,
  deleteArticleTag,
);
