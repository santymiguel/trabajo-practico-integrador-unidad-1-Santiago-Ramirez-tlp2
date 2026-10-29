import { matchedData } from "express-validator";
import Article from "../../models/Article.js";
import ArticleTag from "../../models/ArticleTag.js";

export const postArticleTagMiddleware = async (req, res, next) => {
  const { article_id } = matchedData(req);
  const article = await Article.findByPk(article_id);

  if (!article) {
    return res.status(404).json({
      ok: false,
      message: "Artículo no encontrado",
    });
  }

  if (article.user_id !== req.user.id) {
    return res.status(403).json({
      ok: false,
      message: "No sos el propietario de este recurso",
    });
  }

  next();
};

export const deleteArticleTagMiddleware = async (req, res, next) => {
  const articleTagId = req.params.articleTagId;
  const articleTag = await ArticleTag.findByPk(articleTagId);

  if (!articleTag) {
    return res.status(404).json({
      ok: false,
      status: 404,
      message: "Relación artículo-etiqueta no encontrada",
    });
  }
  const article = await Article.findByPk(articleTag.article_id);
  if (!article) {
    return res.status(404).json({
      ok: false,
      status: 404,
      message: "Artículo no encontrado",
    });
  }

  if (req.user.id !== article.user_id) {
    return res.status(403).json({
      ok: false,
      status: 403,
      message: "No cuenta con permisos para remover esta etiqueta",
    });
  }

  next();
};
