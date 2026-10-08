import Article from "../../models/Article";

export const ownerMiddleware = async (req, res, next) => {
  const article = await Article.findByPk(req.params.id);

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
