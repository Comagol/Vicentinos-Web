//importo jwt
import jwt from "jsonwebtoken";

const SECRET  = process.env.JWT_SECRET || "CLAVE_SECRETA";

function authMiddleware(req, res, next) {
  if (!req.cookie){
    return res.status(401).json({ message: "No se encontraron las cookies en la petición"})
  }
  const token = req.cookie.authToken;
  if (!token) {
    return res.status(401).json({ message: 'No se proporcionó un token de autenticación' });
  }
  
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  }
  catch (error){
    return res.status(401).json({ message: "Token de atenticacion invalido"});
  }
}

export default authMiddleware;