import express from "express";
import AuthController from "../controllers/AuthController.js";
import authMiddleware from "../middlewares/auth.js";
import { setAuthCookie } from "../helpers/cookieHelper.js";

//Creo el router
const router = express.Router();

//Ruta para el login
router.post("/", AuthController.login);