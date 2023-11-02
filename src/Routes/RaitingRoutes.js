const express = require('express');
const router = express.Router();
const RaitingController = require('..//Controllers/RaitingController');



router.post('/series/rating', RaitingController.postSeriesRating);
router.post('/movie/rating', RaitingController.postMovieRating);
router.get('/movie/average-rating/:movieId', RaitingController.getAverageMovieRating);
router.get('/series/average-rating/:serieId', RaitingController.getAverageSeriesRating);

module.exports = router;