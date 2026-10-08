import { comparePassword } from "../../helpers/bycript.helper";
import { generateToken } from "../../helpers/jwt.helper";
import Profile from "../../models/Profile";
import User from "../../models/User";

export const login = async (req, res) => {
  const { username, password } = req.body;
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
