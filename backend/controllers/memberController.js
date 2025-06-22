const Member = require('../models/Member');

// Obtener todos los miembros
const getAllMembers = async (req, res) => {
    try {
        const { page = 1, limit = 10, status, role } = req.query;
        
        const filter = {};
        if (status) filter.status = status;
        if (role) filter.role = role;
        
        const members = await Member.find(filter)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });
            
        const total = await Member.countDocuments(filter);
        
        res.json({
            members,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un miembro por ID
const getMemberById = async (req, res) => {
    try {
        const member = await Member.findById(req.params.id);
        if (!member) {
            return res.status(404).json({ error: 'Miembro no encontrado' });
        }
        res.json(member);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear un nuevo miembro
const createMember = async (req, res) => {
    try {
        const member = new Member(req.body);
        await member.save();
        res.status(201).json(member);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ 
                error: 'Ya existe un miembro con ese email o número de membresía' 
            });
        }
        res.status(400).json({ error: error.message });
    }
};

// Actualizar un miembro
const updateMember = async (req, res) => {
    try {
        const member = await Member.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!member) {
            return res.status(404).json({ error: 'Miembro no encontrado' });
        }
        res.json(member);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ 
                error: 'Ya existe un miembro con ese email o número de membresía' 
            });
        }
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un miembro
const deleteMember = async (req, res) => {
    try {
        const member = await Member.findByIdAndDelete(req.params.id);
        if (!member) {
            return res.status(404).json({ error: 'Miembro no encontrado' });
        }
        res.json({ message: 'Miembro eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Buscar miembros
const searchMembers = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ error: 'Término de búsqueda requerido' });
        }
        
        const members = await Member.find({
            $or: [
                { name: { $regex: q, $options: 'i' } },
                { email: { $regex: q, $options: 'i' } },
                { membershipNumber: { $regex: q, $options: 'i' } }
            ]
        }).limit(20);
        
        res.json(members);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllMembers,
    getMemberById,
    createMember,
    updateMember,
    deleteMember,
    searchMembers
}; 