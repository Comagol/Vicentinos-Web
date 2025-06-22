const express = require('express');
const router = express.Router();
const {
    getAllNews,
    getNewsById,
    createNews,
    updateNews,
    deleteNews,
    searchNews,
    getFeaturedNews,
    togglePublishStatus
} = require('../controllers/newsController');

// Rutas públicas para noticias
router.get('/', getAllNews);
router.get('/featured', getFeaturedNews);
router.get('/search', searchNews);
router.get('/:id', getNewsById);

// Rutas administrativas (requieren autenticación)
router.post('/', createNews);
router.put('/:id', updateNews);
router.delete('/:id', deleteNews);
router.patch('/:id/publish', togglePublishStatus);

module.exports = router; 