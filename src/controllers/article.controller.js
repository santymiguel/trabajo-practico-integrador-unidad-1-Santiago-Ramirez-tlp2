import Article from "../models/Article";

export async function deleteArticle(req, res) {
  const id = req.params.id;
  const article = await Article.findOne({ where: { id } });
  if (!article) {
    return res.status(404).json({ message: "articulo no encontrado" });
  }
  if (req.user.id !== article.user_id && req.user.rol !== "admin") {
    return res.status(403).json({
      ok: false,
      status: 403,
      mesagge: "No cuenta con los permisos para eliminar este articulo",
    });
  }
  await Article.destroy({ where: { id: article.id } });
  res.status(200).json({
    ok: true,
    status: 200,
    mesagge: "articulo eliminado correctamente",
  });
}
