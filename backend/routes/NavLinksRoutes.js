import express from 'express';
import NavLinksController from '../controllers/NavLinksController.js';

const router = express.Router();

//creo la ruta GET para obtener los links de navegacion.
router.get("/nav-links", NavLinksController.getNavLinks);

export default router;