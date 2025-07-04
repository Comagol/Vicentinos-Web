import express from "express";
import NewsController from "../controllers/newsControler.js";

// Instancia de express Router
const router = express.Router();

// Ruta Get para obtener todas las noticias
router.get("/", NewsController.getAllNews);

// Ruta Get para obtener una noticia por id
router.get("/:id", NewsController.getNewById);

//Ruta Post para crear una noticia
router.post("/", NewsController.createNews);

//Ruta Put para actualizar una noticia
router.put("/:id", NewsController.updateNews);

//Ruta Delete para eliminar una noticia
router.delete("/:id", NewsController.deleteNew);