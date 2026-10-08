import User from "../models/User.js";
import Profile from "../models/Profile.js";
import Article from "../models/Article.js";
import { matchedData } from "express-validator";

export async function getUsers(req, res) {
  try {
    const usuarios = await User.findAll({
      include: [
        {
          model: Profile,
          as: "profile",
        },
      ],
    });

    return res.status(200).json({ ok: true, status: 200, body: usuarios });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      status: 500,
      message: "Error al obtener los usuarios",
      error: err.message,
    });
  }
}

export const getUser = async (req, res) => {
  try {
    const id = req.params.id;

    const usuario = await UsersModel.findByPk(id, {
      include: [
        { model: Profile, as: "profile" },
        { model: Article, as: "articles" },
      ],
    });

    return res.status(200).json({ ok: true, status: 200, body: usuario });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: "error al obtener el usuario",
      error: err.message,
    });
  }
};

export async function postUser(req, res) {
  try {
    const {
      username,
      email,
      password,
      role,
      first_name,
      last_name,
      biography,
      avatar_url,
      birth_date,
    } = req.body;

    const user = await UsersModel.create({
      username,
      email,
      password,
      role,
    });
    const perfilNuevo = await Profile.create({
      user_id: user.id,
      first_name,
      last_name,
      biography,
      avatar_url,
      birth_date,
    });
    return res.status(201).json({
      ok: true,
      status: 201,
      body: {
        user,
        profile: perfilNuevo,
      },
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      status: 500,
      message: "error al querer crear el usuario",
      error: err.message,
    });
  }
}

export async function putUser(req, res) {
  try {
    const id = req.params.id;

    const datosActualizados = matchedData(req);

    const usuarioActualizado = await UsersModel.update(datosActualizados, {
      where: { id },
    });
    return res
      .status(200)
      .json({ ok: true, status: 200, body: usuarioActualizado });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      status: 500,
      message: "error al querer editar el usuario",
      error: err.message,
    });
  }
}

export async function deleteUser(req, res) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        ok: false,
        status: 400,
        message: "La id ingresada debe ser un número entero positivo",
      });
    }
    const usuario = await User.findOne({ where: { id } });
    if (!usuario) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Usuario no encontrado",
      });
    }
    await User.destroy({ where: { id } });
    return res.status(200).json({
      ok: true,
      status: 200,
      message: "Usuario eliminado satisfactoriamente",
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      status: 500,
      message: "Error al querer eliminar el usuario",
      error: err.message,
    });
  }
}
