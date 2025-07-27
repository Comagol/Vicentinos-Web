import MemberModel from "../models/membersModels.js";
import UserModel from "../models/UserModel.js";

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
            const { 
                nombre, 
                apellido, 
                telefono, 
                direccion, 
                fechaNacimiento 
            } = req.body;
            
            const userId = req.user.id;

            const user = await AuthModel.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }

            // Actualizar campos permitidos
            if (nombre) user.nombre = nombre;
            if (apellido) user.apellido = apellido;
            if (telefono) user.telefono = telefono;
            if (direccion) user.direccion = direccion;
            if (fechaNacimiento) user.fechaNacimiento = new Date(fechaNacimiento);

            await user.save();

            res.json({ 
                message: "Información actualizada correctamente",
                member: {
                    id: user._id,
                    email: user.email,
                    role: user.role,
                    nombre: user.nombre,
                    apellido: user.apellido,
                    nombreCompleto: user.nombreCompleto,
                    telefono: user.telefono,
                    direccion: user.direccion,
                    fechaNacimiento: user.fechaNacimiento,
                    numeroSocio: user.numeroSocio,
                    categoria: user.categoria,
                    estado: user.estado,
                    fechaRegistro: user.fechaRegistro
                }
            });
        } catch (error) {
            console.error('Error actualizando datos del miembro:', error);
            res.status(500).json({ message: "Error en el servidor" });
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
    };

    //Metodo para obtener la informacion del socio autenticado
    async getCurrentMember(req, res) {
        try {
            const user = await AuthModel.findById(req.user.id).select('-password');
            
            if (!user) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }

            const memberData = {
                id: user._id,
                email: user.email,
                role: user.role,
                nombre: user.nombre,
                apellido: user.apellido,
                nombreCompleto: user.nombreCompleto,
                telefono: user.telefono,
                direccion: user.direccion,
                fechaNacimiento: user.fechaNacimiento,
                numeroSocio: user.numeroSocio,
                categoria: user.categoria,
                estado: user.estado,
                fechaRegistro: user.fechaRegistro,
                foto: user.foto,
                observaciones: user.observaciones,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            };

            res.json({ member: memberData });
        } catch (error) {
            console.error('Error obteniendo datos del miembro:', error);
            res.status(500).json({ message: "Error en el servidor" });
        }
    }
}

export default new MemberController();