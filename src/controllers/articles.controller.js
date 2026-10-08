import Article from "../models/Article";

export async function postArticle(req, res) {
  try {
    const { title, content, excerpt, status } = req.body;

    const nuevoArticle = await Article.create({
      title,
      content,
      excerpt,
      status,
      user_id: req.user.id,
    });
    return res.status(201).json({ ok: true, status: 201, body: nuevoArticle });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      status: 500,
      message: "error al querer crear el articulo",
      error: err.message,
    });
  }
}

export async function getArticles(req, res) {
  try {
    const articulos = await Article.findAll();

    return res.status(200).json({ ok: true, status: 200, body: articulos });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      status: 500,
      message: "Error al obtener los articulos",
      error: err.message,
    });
  }
}

export const getArticle = async (req, res) => {
  try {
    const id = req.params.id;

    const articulo = await Article.findByPk(id);

    if (!articulo) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Artículo no encontrado",
      });
    }

    return res.status(200).json({ ok: true, status: 200, body: articulo });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: "error al obtener el articulo",
      error: err.message,
    });
  }
};

export const getArticlesByUser = async (req, res) => {
  try {
    const articulos = await Article.findAll({
      where: {
        user_id: req.user.id,
        status: "published",
      },
    });

    return res.status(200).json({
      ok: true,
      status: 200,
      body: articulos,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      status: 500,
      message: "Error al obtener los artículos del usuario",
      error: err.message,
    });
  }
};

export const getArticleByUser = async (req, res) => {
  try {
    const id = req.params.id;

    const articulo = await Article.findOne({
      where: {
        id,
        user_id: req.user.id,
      },
    });

    if (!articulo) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Artículo no encontrado",
      });
    }

    return res.status(200).json({
      ok: true,
      status: 200,
      body: articulo,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      status: 500,
      message: "Error al obtener el artículo",
      error: err.message,
    });
  }
};

export const putArticle = async (req, res) => {
  try {
    const id = req.params.id;

    const articulo = await Article.findByPk(id);

    if (!articulo) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Artículo no encontrado",
      });
    }

    if (articulo.user_id !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        ok: false,
        status: 403,
        message: "No tienes permisos para actualizar este artículo",
      });
    }

    const datosActualizados = matchedData(req);

    await Article.update(datosActualizados, {
      where: { id },
    });

    const articuloActualizado = await Article.findByPk(id);

    return res.status(200).json({
      ok: true,
      status: 200,
      body: articuloActualizado,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      status: 500,
      message: "Error al actualizar el artículo",
      error: err.message,
    });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const id = req.params.id;
    const articulo = await Article.findByPk(id);
    if (!articulo) {
      return res
        .status(404)
        .json({ ok: false, status: 404, message: "Artículo no encontrado" });
    }
    if (articulo.user_id !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        ok: false,
        status: 403,
        message: "No tienes permisos para eliminar este artículo",
      });
    }
    await Article.destroy({ where: { id } });
    return res.status(200).json({
      ok: true,
      status: 200,
      message: "Artículo eliminado satisfactoriamente",
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      status: 500,
      message: "Error al eliminar el artículo",
      error: err.message,
    });
  }
};
