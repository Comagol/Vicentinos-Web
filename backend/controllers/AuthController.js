//Controlador para la autenticacion

import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { setAuthCookie, deleteAuthCookie } from "../helpers/cookieHelper.js";

const SECRET = process.env.JWT_SECRET || "CLAVE_SECRETA";

class AuthController {
  //Metodo para el registro
  async register(req, res) {
    try {
      const { email, password } = req.body;
    } catch (error) {
      res.status(500).json({ message: "Error al registrar usuario" });
    }
  }
}