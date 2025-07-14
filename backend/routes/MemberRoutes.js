import express from "express";
import MemberController from "../controllers/members.js";
import authMiddleware from "../middlewares/auth.js";
const router = express.Router();

// Rutas Privadas (solo para el usuario autenticado)

// Get = obtener todos los socios
router.get("/", authMiddleware, MemberController.getAllMembers);

// Get = obtener un socio por id
router.get("/:id", authMiddleware, MemberController.getMemberById);

// Post = crear un nuevo socio
router.post("/", authMiddleware, MemberController.createMember); 

// Put = actualizar un socio
router.put("/:id", authMiddleware, MemberController.updateMember);

// Delete = eliminar un socio
router.delete("/:id", authMiddleware, MemberController.deleteMember);

export default router;