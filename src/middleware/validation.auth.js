import { body, param } from "express-validator";
import { Op } from "sequelize";
import User from "../models/User.js";

export const validationRegister = [
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

  body("birth_date")
    .optional()
    .isDate({ format: "YYYY-MM-DD", strictMode: true })
    .withMessage("Debe ser una fecha válida en formato YYYY-MM-DD")
    .custom((value) => {
      if (new Date(value) > new Date()) {
        throw new Error("La fecha de nacimiento no puede ser futura");
      }
      return true;
    }),
];

export const validationLogin = [
  body("username")
    .isLength({ min: 3, max: 20 })
    .withMessage("El username debe tener entre 3 y 20 caracteres")
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage("El username solo puede contener letras y números"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(/[A-Z]/)
    .withMessage("La contraseña debe tener al menos una mayúscula")
    .matches(/[a-z]/)
    .withMessage("La contraseña debe tener al menos una minúscula")
    .matches(/[0-9]/)
    .withMessage("La contraseña debe tener al menos un número"),
];
