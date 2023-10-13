const express = require('express');
const seriesController = require('..//Controllers/SeriesControllers');

const router = express.Router();

router.get('/series', seriesController.getSeries);
router.get('/series/:id', seriesController.getSeriesById);
router.get('/series/name/:name', seriesController.getSeriesByName);
router.get('/top-series', seriesController.getTopSeries);
router.post('/postSeries', seriesController.postSeries)

module.exports = router;