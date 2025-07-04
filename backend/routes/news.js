import express from "express";
import NewsController from "../controllers/newsControler.js";

// Instancia de express Router
const router = express.Router();

// Ruta Get para obtener todas las noticias
router.get("/", NewsController.getAllNews);