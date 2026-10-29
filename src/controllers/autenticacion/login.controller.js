import { matchedData } from "express-validator";
import { comparePassword } from "../../helpers/bycript.helper.js";
import { generateToken } from "../../helpers/jwt.helper.js";
import Profile from "../../models/Profile.js";
import User from "../../models/User.js ";

export const login = async (req, res) => {
  const { username, password } = matchedData(req);
  // 1. Buscar usuario en la base de datos
  const user = await User.findOne({
    where: { username }, // Solo buscamos por username
    include: {
      model: Profile,
      attributes: ["first_name", "last_name"],
      as: "profile",
    },
  });
  if (!user) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }
  // 2. Comparar contraseña ingresada con hash almacenado
  const validPassword = await comparePassword(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }
  // 3. Si la contraseña es correcta, generar JWT
  const token = generateToken({
    id: user.id,
    role: user.role,
  });
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60, // 1 hora
  });
  return res.json({ message: "Login exitoso" });
};
