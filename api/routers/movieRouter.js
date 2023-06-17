const express = require('express');
const router = express.Router();
const { createMovie, updateMovie, deleteMovie, getMovieById, getRandomMovie, getAllMovies, getFilterMovie } = require('../controllers/movieController');
const checkAuth = require('../checkAuth');

router.post('/', checkAuth, createMovie);
router.put('/:id', checkAuth, updateMovie);
router.delete('/:id', checkAuth, deleteMovie);
router.get('/find/:id', checkAuth, getMovieById);
router.get('/random', checkAuth, getRandomMovie);
router.get('/', checkAuth, getAllMovies);
router.get('/findName', checkAuth, getFilterMovie);

module.exports = router;