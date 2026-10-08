import Profile from "../../models/Profile";

export const profile = (req, res) => {
  const perfil = Profile.findOne({ where: { user_id: req.user.id } });
  res.json({ body: perfil });
};
