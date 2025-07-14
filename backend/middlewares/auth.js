function authMiddleware(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'No se proporcionó un token de autenticación' });
  }
  // Voy a dejar un token arcodeado en el backend
  const tokenCodificado = '1234567890';
  if (token !== tokenCodificado) {
    return res.status(401).json({ message: 'Token de autenticacion invalido' });
  }
  next();
}

module.exports = authMiddleware;