const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es requerido'],
        trim: true
    },
    lastname : {
        type: String,
        required: [true, 'El apellido es requerido'],
        trim: true
    },
    birthdate: {
        type: Date,
        required: [true, 'La fecha de nacimiento es requerida']
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: [true, 'El género es requerido']
    },
    email: {
        type: String,
        required: [true, 'El email es requerido'],
        unique: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    membershipNumber: {
        type: String,
        unique: true,
        required: [true, 'El número de membresía es requerido']
    },
    joinDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'pending'],
        default: 'active'
    },
    role: {
        type: String,
        enum: ['socio activo/a', 'socio deportivo/a', 'benefactor', 'administrador'],
        default: 'member'
    },
    profileImage: {
        type: String,
        required: [true, 'La foto de perfil es obligatoria.']
    },
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String
    },
    emergencyContact: {
        name: String,
        phone: String,
        relationship: String
    }
}, {
    timestamps: true
});

// Índices para mejorar el rendimiento
memberSchema.index({ email: 1 });
memberSchema.index({ membershipNumber: 1 });
memberSchema.index({ status: 1 });

// Método para obtener información pública del miembro
memberSchema.methods.toPublicJSON = function() {
    const member = this.toObject();
    delete member.__v;
    return member;
};

module.exports = mongoose.model('Member', memberSchema); 