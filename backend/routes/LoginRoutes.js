import express from "express";
import AuthController from "../controllers/AuthController.js";

//Creo el router
const router = express.Router();

//Ruta para el login
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.post("/register", AuthController.register);
