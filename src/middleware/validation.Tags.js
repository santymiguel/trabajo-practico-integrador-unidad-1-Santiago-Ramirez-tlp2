import { body } from "express-validator";
import Tag from "../models/Tag.js";
import { Op } from "sequelize";

export const validationPostTag = [
  body("name")
    .isString()
    .withMessage("El nombre debe ser una cadena de texto")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 2, max: 30 })
    .withMessage("El nombre debe tener entre 2 y 30 caracteres")
    .not()
    .matches(/\s/)
    .withMessage("El nombre no puede contener espacios")
    .custom(async (name) => {
      const tag = await Tag.findOne({ where: { name } });

      if (tag) {
        throw new Error("Ya existe un Tag con ese nombre");
      }

      return true;
    }),
];

export const validationPutTag = [
  body("name")
    .optional()
    .isString()
    .withMessage("El nombre debe ser una cadena de texto")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 2, max: 30 })
    .withMessage("El nombre debe tener entre 2 y 30 caracteres")
    .not()
    .matches(/\s/)
    .withMessage("El nombre no puede contener espacios")
    .custom(async (name, { req }) => {
      const id = req.params.id;
      const tag = await Tag.findOne({ where: { name, id: { [Op.ne]: id } } });

      if (tag) {
        throw new Error("Ya existe un Tag con ese nombre");
      }

      return true;
    }),
];
