const express = require('express');
const router = express.Router();
const {
    getAllMembers,
    getMemberById,
    createMember,
    updateMember,
    deleteMember,
    searchMembers
} = require('../controllers/memberController');

// Rutas para miembros
router.get('/', getAllMembers);
router.get('/search', searchMembers);
router.get('/:id', getMemberById);
router.post('/', createMember);
router.put('/:id', updateMember);
router.delete('/:id', deleteMember);

module.exports = router; 