import Article from "../models/Article.js";
import ArticleTag from "../models/ArticleTag.js";
import Tag from "../models/Tag.js";

export const postArticleTag = async (req, res) => {
  try {
    const { article_id, tag_id } = req.body;

    const articulo = await Article.findByPk(article_id);

    if (!articulo) {
      return res
        .status(404)
        .json({ ok: false, status: 404, message: "Articulo no encontrado" });
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
