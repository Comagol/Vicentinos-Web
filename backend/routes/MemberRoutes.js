import express from "express";
import MemberController from "../controllers/members.js";
import authMiddleware from "../middlewares/auth.js";
const router = express.Router();

// Rutas Privadas (solo para el usuario autenticado)


// Ruta para obtener información del miembro actual (PROTEGIDA)
router.get("/current", authMiddleware, MemberController.getCurrentMember);

// Ruta para actualizar información del miembro (PROTEGIDA)
router.put("/current", authMiddleware, MemberController.updateMember);

// Get = obtener todos los socios (PROTEGIDA)
router.get("/", authMiddleware, MemberController.getAllMembers);

// Get = obtener un socio por id (PROTEGIDA)
router.get("/:id", authMiddleware, MemberController.getMemberById);

// Post = crear un nuevo socio (PROTEGIDA)
router.post("/", authMiddleware, MemberController.createMember); 

// Put = actualizar un socio (PROTEGIDA)
router.put("/:id", authMiddleware, MemberController.updateMember);

// Delete = eliminar un socio (PROTEGIDA)
router.delete("/:id", authMiddleware, MemberController.deleteMember);

export default router;