import { matchedData } from "express-validator";
import Article from "../models/Article";
import ArticleTag from "../models/ArticleTag";
import Tag from "../models/Tag";

export const postArticleTag = async (req, res) => {
  try {
    const { article_id, tag_id } = matchedData(req);
    const articulo = await Article.findByPk(article_id);

    if (!articulo) {
      return res
        .status(404)
        .json({ ok: false, status: 404, message: "Artículo no encontrado" });
    }
    if (articulo.user_id !== req.user.id) {
      return res.status(403).json({
        ok: false,
        status: 403,
        message: "Solo el autor puede agregar etiquetas al artículo",
      });
    }
    const etiqueta = await Tag.findByPk(tag_id);
    if (!etiqueta) {
      return res
        .status(404)
        .json({ ok: false, status: 404, message: "Etiqueta no encontrada" });
    }
    const relacionExistente = await ArticleTag.findOne({
      where: { article_id, tag_id },
    });
    if (relacionExistente) {
      return res.status(409).json({
        ok: false,
        status: 409,
        message: "La etiqueta ya está asociada al artículo",
      });
    }
    const nuevaRelacion = await ArticleTag.create({ article_id, tag_id });
    return res.status(201).json({ ok: true, status: 201, body: nuevaRelacion });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      status: 500,
      message: "Error al agregar la etiqueta al artículo",
      error: err.message,
    });
  }
};

export async function deleteArticleTag(req, res) {
  try {
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

    await ArticleTag.destroy({
      where: { id: articleTagId },
    });

    return res.status(200).json({
      ok: true,
      status: 200,
      message: "Etiqueta removida correctamente",
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      status: 500,
      message: "Error al querer eliminar el artículo",
      error: err.message,
    });
  }
}
