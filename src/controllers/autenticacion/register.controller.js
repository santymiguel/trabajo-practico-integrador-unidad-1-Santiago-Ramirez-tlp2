import { matchedData } from "express-validator";
import { hashPassword } from "../../helpers/bycript.helper";
import Profile from "../../models/Profile";
import User from "../../models/User";

export async function register(req, res) {
  try {
    const data = matchedData(req, ["body"]);

    const hashedPassword = hashPassword(password);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const perfilNuevo = await Profile.create({
      ...data,

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
