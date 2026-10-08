import Article from "../models/Article.js";
import Tag from "../models/Tag.js";

export async function postTag(req, res) {
  try {
    const { name } = req.body;

    const nuevaTag = await Tag.create({
      name,
    });
    return res.status(201).json({ ok: true, status: 201, body: nuevaTag });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      status: 500,
      message: "error al querer crear la etiqueta",
      error: err.message,
    });
  }
}

export async function getTags(req, res) {
  try {
    const etiquetas = await Tag.findAll();

    return res.status(200).json({ ok: true, status: 200, body: etiquetas });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      status: 500,
      message: "Error al obtener las etiquetas",
      error: err.message,
    });
  }
}

export const getTag = async (req, res) => {
  try {
    const id = req.params.id;

    const etiqueta = await Tag.findByPk(id, {
      include: { model: Article, as: "articles" },
    });

    if (!etiqueta) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Etiqueta no encontrada",
      });
    }

    return res.status(200).json({ ok: true, status: 200, body: etiqueta });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: "error al obtener la etiqueta",
      error: err.message,
    });
  }
};

export async function putTag(req, res) {
  try {
    const id = req.params.id;

    const datosActualizados = matchedData(req);

    const tagActualizado = await Tag.update(datosActualizados, {
      where: { id },
    });
    return res
      .status(200)
      .json({ ok: true, status: 200, body: tagActualizado });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      status: 500,
      message: "error al querer editar la etiqueta",
      error: err.message,
    });
  }
}

export async function deleteTag(req, res) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        ok: false,
        status: 400,
        message: "La id ingresada debe ser un número entero positivo",
      });
    }
    const etiqueta = await Tag.findOne({ where: { id } });
    if (!etiqueta) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "etiqueta no encontrada",
      });
    }
    await Tag.destroy({ where: { id } });
    return res.status(200).json({
      ok: true,
      status: 200,
      message: "Etiqueta eliminada satisfactoriamente",
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      status: 500,
      message: "Error al querer eliminar la etiqueta",
      error: err.message,
    });
  }
}
