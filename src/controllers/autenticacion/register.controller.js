import { matchedData } from "express-validator";
import { hashPassword } from "../../helpers/bycript.helper.js";
import Profile from "../../models/Profile.js";
import User from "../../models/User.js";

export async function register(req, res) {
  try {
    const data = matchedData(req, { locations: ["body"] });
    const { password, ...profileData } = data;

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      ...profileData,
      password: hashedPassword,
    });
    const perfilNuevo = await Profile.create({
      ...profileData,
      user_id: user.id,
    });

    const userResponse = user.toJSON();
    delete userResponse.password;

    return res.status(201).json({
      ok: true,
      status: 201,
      body: {
        user: userResponse,
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
