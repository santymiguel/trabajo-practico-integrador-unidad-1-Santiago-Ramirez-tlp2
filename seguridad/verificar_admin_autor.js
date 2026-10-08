export async function isAuthorOrAdmin(req, res, next) {
  try {
    const articleId = req.params.id;

    const article = await Article.findByPk(articleId);

    if (!article) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "No se encontró el artículo",
      });
    }

    // Si es admin, puede editar cualquier artículo
    if (req.user.role === "admin") {
      return next();
    }

    // Si no es admin, debe ser el autor
    if (article.user_id !== req.user.id) {
      return res.status(403).json({
        ok: false,
        status: 403,
        message: "No tienes permiso para editar este artículo",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      ok: false,
      status: 500,
      message: "Error al verificar los permisos",
      error: error.message,
    });
  }
}
