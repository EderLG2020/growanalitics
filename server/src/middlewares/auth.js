const { verifyToken } = require("../config/jwt");

function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Token no encontrado" });

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ error: "Token inválido o expirado" });
  }
}


module.exports = authMiddleware;
