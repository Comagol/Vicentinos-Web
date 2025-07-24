//Controlador para la autenticacion

import AuthModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { setAuthCookie, deleteAuthCookie } from "../helpers/cookieHelper.js";

const SECRET = process.env.JWT_SECRET || "CLAVE_SECRETA";

// Clase para manejar los metodos de autenticación

class AuthController {
  //Metodo para el registro
  async login(req, res) {
    try {
      const { email, password, role } = req.body;

      //1. Buscando el mail del supuesto usuario en la base de datos.
      const userToAuth = await AuthModel.findOne({email})
      if (!userToAuth) return res.status(401).json({ message: "Usuario no encontrado"});

      //2. verificando la constraseña del supuesto usuario en la base de datos.
      const valid = await bcrypt.compare(password, userToAuth.password);
      if (!valid) return res.status(401).json({ message: "Contraseña incorrecta"});

      //3. Genero el token JWT
      const token = jwt.sign({ id: userToAuth.id, email: userToAuth.email, role: userToAuth.role }, SECRET, { expiresIn: "1h"});

      //4. Seteo la cookie
      setAuthCookie(res, token);

      //5. Respuesta al servidor
      res.json({ message: "Login exitoso" });
    } catch (error) {
      res.status(500).json({ message: "Error en el servidor" });
    }
  };

  async logout(req, res) {
    deleteAuthCookie(res);
    res.json({ message: "Logout exitoso"});
  };

  async register(req, res) {
    try {
      const {email, password} = req.body;

      // verifico si el usuario ya existe.
      const existingUser = await AuthModel.findOne({ email });
      if(existingUser) {
        return res.status(400).json({ message: "El email ya esta registrado"});
      }

      // Hasheo la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Creo el usuario
      const newUser = new AuthModel({
        email,
        password: hashedPassword,
      });

      await newUser.save();

      //luego voy a agregar que se genere el token

      res.status(201).json({ message: "usuario registrado exitosamente" });
    } catch (error) {
      res.status(500).json({ message: "Error en el servidor"});
    }
  };
};

export default new AuthController();