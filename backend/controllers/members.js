import MemberModel from "../models/membersModels.js";

//Clase para manejar los metodos de los socios
class MemberController {
    constructor() {
        this.members = [];
    }

    //Metodo para obtener todos los socios
    async getAllMembers(req, res) {
        try {
            const members = await MemberModel.find();
            res.status(200).json(members);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    //Metodo para obtener un socio por id
    async getMemberById(req, res) {
        try {
            const {id} =req.params;
            const member = await MemberModel.findById(id);
            if (!member) {
                return res.status(404).json({ message: "Socio no encontrado"});
            }
            res.status(200).json(member);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    //Metodo para crear un socio nuevo
    async createMember(req, res) {
        try {
            const { firstName, lastName, email, phone, birthDate, DNI, address, city, zipCode, memberId, signUpDate } = req.body;
            const member = { firstName, lastName, email, phone, birthDate, DNI, address, city, zipCode, memberId, signUpDate };
            const members = await MemberModel.find();   
            if (members.some(member => member.DNI === DNI)) {
                return res.status(400).json({ message: "Ya existe un socio con ese DNI"});
            }
            else {
                const newMember = await MemberModel.create(member);
                res.status(201).json(newMember);
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    //Metodo para actualizar valores de un socio
    async updateMember(req, res) {
        try {
            const {id} = req.params;
            const { firstName, lastName, email, birthDate, DNI, phone, address, city, zipCode} = req.body;
            const member = await MemberModel.findById(id);
            if (!member) {
                return res.status(404).json({ message: "Socio no encontrado"});
        }
        else {
                const updateMember = await MemberModel.update(id, member);
                res.status(200).json(updateMember);
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    // Metodo para eliminar un socio
    async deleteMember(req, res) {
        try {
            const {id} = req.params;
            const member = await MemberModel.findById(id);
            if (!member) {
                return res.status(404).json({ message: "Socio no encontrado"});
            }
            else {
                await MemberModel.delete(id);
                res.status(200).json({ message: "Socio eliminado correctamente"});
            }
        } catch (error) {
            res.status(500).json({ message: error.message});
        }
    }
}

export default new MemberController();