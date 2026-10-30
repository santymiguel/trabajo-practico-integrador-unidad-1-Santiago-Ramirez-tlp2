import Profile from "../../models/Profile";

export const getProfile = async (req, res) => {
  try {
    const perfil = await Profile.findOne({ where: { user_id: req.user.id } });
    res.json({ body: perfil });
  } catch (err) {
    return res
      .status(500)
      .json({
        ok: false,
        message: "Error al obtener perfil",
        error: err.message,
      });
  }
};
