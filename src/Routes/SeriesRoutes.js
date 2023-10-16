const express = require('express');
const seriesController = require('..//Controllers/SeriesControllers');

const router = express.Router();

router.get('/series/name', seriesController.getSeriesByName);
router.get('/series', seriesController.getSeries);
router.get('/series/:id', seriesController.getSeriesById);
router.get('/top-series', seriesController.getTopSeries);
router.post('/postSeries', seriesController.postSeries)
router.put('/series/:id', seriesController.updateSeries);
router.put('/series/deshabilitar/:id', seriesController.disableSerie);

module.exports = router;