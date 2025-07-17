//Controlador para la autenticacion

import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { setAuthCookie, deleteAuthCookie } from "../helpers/cookieHelper.js";

const SECRET = process.env.JWT_SECRET || "CLAVE_SECRETA";

// Clase para manejar los metodos de autenticación

class AuthController {
  //Metodo para el registro
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const userToAuth = await AuthModel.findOne({email})
      if (!userToAuth) return res.status(401).json({ message: "Usuario no encontrado"});
    } catch (error) {
      res.status(500).json({ message: "Error al registrar usuario" });
    }
  };

  async logout(req, res) {
    try {
      
    } catch (error) {
      
    }
  }
}

export default new AuthController();