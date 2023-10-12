const express = require('express');
const moviesController = require('../Controllers/MoviesControllers');

const router = express.Router();


router.get('/movies', moviesController.getMovies);

module.exports = router;
