//Controlador para la autenticacion

import UserModel from "../models/UserModel.js";
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
      const userToAuth = await UserModel.findOne({email})
      if (!userToAuth) return res.status(401).json({ message: "Usuario no encontrado"});

      //2. verificando la constraseña del supuesto usuario en la base de datos.
      const valid = await bcrypt.compare(password, userToAuth.password);
      if (!valid) return res.status(401).json({ message: "Contraseña incorrecta"});

      //3. Genero el token JWT
      const token = jwt.sign({ id: userToAuth.id, email: userToAuth.email, role: userToAuth.role }, SECRET, { expiresIn: "1h"});

      //4. Seteo la cookie
      setAuthCookie(res, token);

      //5. Respuesta con datos del usuario (sin contraseña)
      const userData = {
        id: userToAuth.id,
        email: userToAuth.email,
        role: userToAuth.role
      };
      
      res.json({ 
        message: "Login exitoso",
        user: userData 
      });
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
      const { email, password, nombre, apellido, telefono, direccion, fechaNacimiento } = req.body;
  
      // Verificar si el usuario ya existe
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "El email ya está registrado" });
      }
  
      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Crear el usuario con todos los datos
      const newUser = new UserModel({
        email,
        password: hashedPassword,
        nombre,
        apellido,
        telefono,
        direccion,
        fechaNacimiento: fechaNacimiento ? new Date(fechaNacimiento) : undefined,
      });
  
      await newUser.save();
  
      res.status(201).json({ 
        message: "Usuario registrado exitosamente",
        user: {
          id: newUser._id,
          email: newUser.email,
          nombre: newUser.nombre,
          apellido: newUser.apellido,
          numeroSocio: newUser.numeroSocio
        }
      });
    } catch (error) {
      console.error('Error en registro:', error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  }

  async getMe(req, res) {
    try {
      // req.user ya contiene los datos del token decodificado (id, email, role)
      const user = await UserModel.findById(req.user.id).select('-password');
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.json({ user });
    } catch (error) {
      res.status(500).json({ message: "Error en el servidor" });
    }
  };
};

export default new AuthController();