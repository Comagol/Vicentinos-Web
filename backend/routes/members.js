import express from "express";
import MemberController from "../controllers/members.js";
const router = express.Router();

// Get = obtener todos los socios
router.get("/", MemberController.getAllMembers);

// Post = crear un nuevo socio
router.post("/", (req, res) => {
    res.send("Hello World");
}); 

// Put = actualizar un socio
router.put("/:id", (req, res) => {
    res.send("Hello World");
});

// Delete = eliminar un socio
router.delete("/:id", (req, res) => {
    res.send("Hello World");
});

export default router;