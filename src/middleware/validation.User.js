import { body, param } from "express-validator";
import { Op } from "sequelize";
import User from "../models/User";

/* ^[a-zA-Z0-9]+$

significa:

Desde el principio hasta el final, tiene que haber uno o más caracteres que sean letras o números. */

/* .matches(/[A-Z]/)
    .withMessage("La contraseña debe tener al menos una mayúscula")
 */
export const validationGetUser = [
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

export const validationPostUser = [
  body("username")
    .isLength({ min: 3, max: 20 })
    .withMessage("El username debe tener entre 3 y 20 caracteres")
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage("El username solo puede contener letras y números")
    .custom(async (username) => {
      const user = await User.findOne({ where: { username } });

      if (user) {
        throw new Error("El username ya está registrado");
      }

      return true;
    }),

  body("email")
    .isEmail()
    .withMessage("El email debe tener un formato válido")
    .custom(async (email) => {
      const emailExistente = await User.findOne({ where: { email } });

      if (emailExistente) {
        throw new Error("El email ya está registrado");
      }

      return true;
    }),

  body("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(/[A-Z]/)
    .withMessage("La contraseña debe tener al menos una mayúscula")
    .matches(/[a-z]/)
    .withMessage("La contraseña debe tener al menos una minúscula")
    .matches(/[0-9]/)
    .withMessage("La contraseña debe tener al menos un número"),

  body("role")
    .isIn(["user", "admin"])
    .withMessage("El rol debe ser user o admin"),

  body("first_name")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres")
    .matches(/^[a-zA-Z]+$/)
    .withMessage("El nombre solo puede contener letras"),

  body("last_name")
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres")
    .matches(/^[a-zA-Z]+$/)
    .withMessage("El apellido solo puede contener letras"),

  body("biography")
    .optional()
    .isLength({ max: 500 })
    .withMessage("La biografía no puede superar los 500 caracteres"),

  body("avatar_url")
    .optional()
    .isURL()
    .withMessage("El avatar debe ser una URL válida"),
];

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
