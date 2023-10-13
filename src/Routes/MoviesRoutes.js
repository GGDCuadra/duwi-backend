const express = require('express');
const moviesController = require('../Controllers/MoviesControllers');

const router = express.Router();

router.get('/movies', moviesController.getMovies);
router.get('/movies/:id', moviesController.getMovieById);
router.get('/movies/title/:title', moviesController.getMovieByTitle);
router.get('/top-movies', moviesController.getTopMovies);
router.get('/movies/genre/:genre', moviesController.getMoviesByGenre);


router.post('/movies', moviesController.postMovie);
router.put('/movies/:id', moviesController.putMovie);

module.exports = router;
