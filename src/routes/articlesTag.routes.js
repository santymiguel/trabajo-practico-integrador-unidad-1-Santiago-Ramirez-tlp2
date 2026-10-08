import express from "express";
import {
  deleteArticleTag,
  postArticleTag,
} from "../controllers/articlesTags.controller";
//import controladores

export const articlesTagRouter = express.Router();

articlesTagRouter.post("/", postArticleTag);
articlesTagRouter.delete("/:articleTagId", deleteArticleTag);
