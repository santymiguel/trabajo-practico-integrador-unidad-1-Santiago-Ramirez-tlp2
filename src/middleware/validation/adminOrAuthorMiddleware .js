export const adminOrAuthorMiddleware = (req, res, next) => {
  if (req.user.role !== "admin" && req.user.role !== "author") {
    return res.status(403).json({
      ok: false,
      message: "Acceso denegado",
    });
  }

  next();
};
