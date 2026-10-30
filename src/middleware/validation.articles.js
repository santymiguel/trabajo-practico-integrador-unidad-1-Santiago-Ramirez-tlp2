import { body, param } from "express-validator";
import { Op } from "sequelize";
import User from "../models/User.js";

export const validationGetArticle = [
  param("id")
    .isInt()
    .withMessage("el id debe ser un numero entero")
    .bail()
    .custom(async (id) => {
      const article = await User.findByPk(id);
      if (!article) {
        throw new Error("no se encontro un articulo con la id ingresada");
      }
      return true;
    }),
];

export const validationPostArticle = [
  body("title")
    .notEmpty()
    .withMessage("El título es obligatorio")
    .bail()
    .isLength({ min: 3, max: 200 })
    .withMessage("El title debe tener entre 3 y 200 caracteres"),

  body("content")
    .notEmpty()
    .withMessage("El contenido es obligatorio")
    .bail()
    .isLength({ min: 50 })
    .withMessage("El contenido debe tener al menos 50 caracteres"),

  body("excerpt")
    .optional()
    .isLength({ max: 500 })
    .withMessage("El resumen no puede superar los 500 caracteres"),

  body("status")
    .optional()
    .isIn(["published", "archived"])
    .withMessage("El estado debe ser published o archived"),

  body("user_id")
    .isInt({ min: 1 })
    .withMessage("El user_id debe ser un identificador válido")
    .bail()
    .custom(async (user_id) => {
      const user = await User.findByPk(user_id);

      if (!user) {
        throw new Error("El usuario indicado no existe");
      }

      return true;
    }),
];

export const validationPutArtcile = [
  body("title")
    .optional()
    .notEmpty()
    .withMessage("El título es obligatorio")
    .bail()
    .isLength({ min: 3, max: 200 })
    .withMessage("El title debe tener entre 3 y 200 caracteres"),

  body("content")
    .optional()
    .notEmpty()
    .withMessage("El contenido es obligatorio")
    .bail()
    .isLength({ min: 50 })
    .withMessage("El contenido debe tener al menos 50 caracteres"),

  body("excerpt")
    .optional()
    .isLength({ max: 500 })
    .withMessage("El resumen no puede superar los 500 caracteres"),

  body("status")
    .optional()
    .isIn(["published", "archived"])
    .withMessage("El estado debe ser published o archived"),

  body("user_id")
    .optional()
    .isInt({ min: 1 })
    .withMessage("El user_id debe ser un identificador válido")
    .bail()
    .custom(async (user_id) => {
      const user = await UsersModel.findByPk(user_id);
      if (!user) {
        throw new Error("la user_id ingresada no corresponde a ningun usuario");
      }
      return true;
    }),
];

export const validationDeleteArticle = [
  param("id")
    .isInt()
    .withMessage("el id debe ser un numero entero")
    .bail()
    .custom(async (id) => {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("no se encontro un usuario con la id ingresada");
      }
      return true;
    }),
];
