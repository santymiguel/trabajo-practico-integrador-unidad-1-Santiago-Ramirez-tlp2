import Article from "../../models/Article.js";

export const adminOrAuthorMiddleware = async (req, res, next) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({
        ok: false,
        message: "Artículo no encontrado",
      });
    }

    if (req.user.role !== "admin" && article.user_id !== req.user.id) {
      return res.status(403).json({
        ok: false,
        message: "Acceso denegado. Se requiere rol de administrador",
      });
    }

    next();
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: "Error al verificar los permisos",
    });
  }
};
