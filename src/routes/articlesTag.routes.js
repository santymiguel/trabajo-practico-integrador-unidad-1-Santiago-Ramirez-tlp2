import express from "express";
import {
  deleteArticleTag,
  postArticleTag,
} from "../controllers/articlesTags.controller.js";
//import controladores

export const articlesTagRouter = express.Router();

articlesTagRouter.post("/", postArticleTag);
articlesTagRouter.delete("/:articleTagId", deleteArticleTag);
