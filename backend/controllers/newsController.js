const News = require('../models/News');

// Obtener todas las noticias (públicas)
const getAllNews = async (req, res) => {
    try {
        const { page = 1, limit = 10, category, featured } = req.query;
        
        const filter = { isPublished: true };
        if (category) filter.category = category;
        if (featured === 'true') filter.featured = true;
        
        const news = await News.find(filter)
            .populate('author', 'name')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ publishDate: -1 });
            
        const total = await News.countDocuments(filter);
        
        res.json({
            news,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener una noticia por ID
const getNewsById = async (req, res) => {
    try {
        const news = await News.findById(req.params.id)
            .populate('author', 'name');
            
        if (!news) {
            return res.status(404).json({ error: 'Noticia no encontrada' });
        }
        
        // Incrementar vistas
        await news.incrementViews();
        
        res.json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear una nueva noticia
const createNews = async (req, res) => {
    try {
        const news = new News(req.body);
        await news.save();
        res.status(201).json(news);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Actualizar una noticia
const updateNews = async (req, res) => {
    try {
        const news = await News.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!news) {
            return res.status(404).json({ error: 'Noticia no encontrada' });
        }
        res.json(news);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar una noticia
const deleteNews = async (req, res) => {
    try {
        const news = await News.findByIdAndDelete(req.params.id);
        if (!news) {
            return res.status(404).json({ error: 'Noticia no encontrada' });
        }
        res.json({ message: 'Noticia eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Buscar noticias
const searchNews = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ error: 'Término de búsqueda requerido' });
        }
        
        const news = await News.find({
            $and: [
                { isPublished: true },
                {
                    $or: [
                        { title: { $regex: q, $options: 'i' } },
                        { content: { $regex: q, $options: 'i' } },
                        { tags: { $in: [new RegExp(q, 'i')] } }
                    ]
                }
            ]
        })
        .populate('author', 'name')
        .sort({ publishDate: -1 })
        .limit(20);
        
        res.json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener noticias destacadas
const getFeaturedNews = async (req, res) => {
    try {
        const news = await News.find({ 
            isPublished: true, 
            featured: true 
        })
        .populate('author', 'name')
        .sort({ publishDate: -1 })
        .limit(5);
        
        res.json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Publicar/despublicar noticia
const togglePublishStatus = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) {
            return res.status(404).json({ error: 'Noticia no encontrada' });
        }
        
        news.isPublished = !news.isPublished;
        if (news.isPublished) {
            news.publishDate = new Date();
        }
        
        await news.save();
        res.json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllNews,
    getNewsById,
    createNews,
    updateNews,
    deleteNews,
    searchNews,
    getFeaturedNews,
    togglePublishStatus
}; 