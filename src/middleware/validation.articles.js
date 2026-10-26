import { body, param } from "express-validator";
import { Op } from "sequelize";
import User from "../models/User.js";

/* ^[a-zA-Z0-9]+$

significa:

Desde el principio hasta el final, tiene que haber uno o más caracteres que sean letras o números. */

/* .matches(/[A-Z]/)
    .withMessage("La contraseña debe tener al menos una mayúscula")
 */
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

export const validationPostUser = [
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
      const user = await UsersModel.findByPk(user_id);

      if (!user) {
        throw new Error("El usuario indicado no existe");
      }

      return true;
    }),
];
// me quede aca, esta terminado hay que ir por el siguiente

export const validationPutUser = [
  param("id").isInt().withMessage("El id debe ser un número entero"),

  body("username")
    .optional()
    .isLength({ min: 3, max: 20 })
    .withMessage("El username debe tener entre 3 y 20 caracteres")
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage("El username solo puede contener letras y números")
    .custom(async (username, { req }) => {
      const user = await User.findOne({
        where: {
          username,
          id: {
            [Op.ne]: req.params.id,
          },
        },
      });
      if (user) {
        throw new Error("El username ya está registrado");
      }

      return true;
    }),

  body("email")
    .optional()
    .isEmail()
    .withMessage("El email debe tener un formato válido")
    .custom(async (email, { req }) => {
      const user = await User.findOne({
        where: {
          email,
          id: {
            [Op.ne]: req.params.id,
          },
        },
      });

      if (user) {
        throw new Error("El email ya está registrado");
      }

      return true;
    }),

  body("password")
    .optional()
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(/[A-Z]/)
    .withMessage("La contraseña debe tener al menos una mayúscula")
    .matches(/[a-z]/)
    .withMessage("La contraseña debe tener al menos una minúscula")
    .matches(/[0-9]/)
    .withMessage("La contraseña debe tener al menos un número"),

  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("El rol debe ser user o admin"),
];

export const validationDeleteUser = [
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
