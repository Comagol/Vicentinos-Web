const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'El título es requerido'],
        trim: true,
        maxlength: [200, 'El título no puede tener más de 200 caracteres']
    },
    content: {
        type: String,
        required: [true, 'El contenido es requerido'],
        trim: true
    },
    summary: {
        type: String,
        trim: true,
        maxlength: [300, 'El resumen no puede tener más de 300 caracteres']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
        required: [true, 'El autor es requerido']
    },
    category: {
        type: String,
        enum: ['general', 'events', 'announcements', 'sports', 'social'],
        default: 'general'
    },
    tags: [{
        type: String,
        trim: true
    }],
    image: {
        type: String
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    views: {
        type: Number,
        default: 0
    },
    featured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Índices para mejorar el rendimiento
newsSchema.index({ title: 'text', content: 'text' });
newsSchema.index({ category: 1 });
newsSchema.index({ isPublished: 1, publishDate: -1 });
newsSchema.index({ featured: 1 });

// Método para incrementar vistas
newsSchema.methods.incrementViews = function() {
    this.views += 1;
    return this.save();
};

// Método para obtener noticias públicas
newsSchema.statics.getPublished = function() {
    return this.find({ isPublished: true })
        .populate('author', 'name')
        .sort({ publishDate: -1 });
};

module.exports = mongoose.model('News', newsSchema); 