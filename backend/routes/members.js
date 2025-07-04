import express from "express";
import MemberController from "../controllers/members.js";
const router = express.Router();

// Get = obtener todos los socios
router.get("/", MemberController.getAllMembers);

// Get = obtener un socio por id
router.get("/:id", MemberController.getMemberById);

// Post = crear un nuevo socio
router.post("/", MemberController.createMember); 

// Put = actualizar un socio
router.put("/:id", MemberController.updateMember);

// Delete = eliminar un socio
router.delete("/:id", (req, res) => {
    res.send("Hello World");
});

export default router;