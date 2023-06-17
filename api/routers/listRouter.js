const express = require('express');
const router = express.Router();
const { createList, deleteList, getList } = require('../controllers/listController');
const checkAuth = require('../checkAuth');

router.post('/', checkAuth, createList);
router.delete('/:id', checkAuth, deleteList);
router.get('/', checkAuth, getList);

module.exports = router;