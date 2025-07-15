import express from "express";
import LoginController from "../controllers/login.js";
import authMiddleware from "../middlewares/auth.js";
import { setAuthCookie } from "../helpers/cookieHelper.js";

//Creo el router
const router = express.Router();

//Ruta para el login
router.post("/", LoginController.login);