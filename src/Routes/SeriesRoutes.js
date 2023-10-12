const express = require('express');
const seriesController = require('..//Controllers/SeriesControllers');

const router = express.Router();

router.get('/series', seriesController.getSeries);

module.exports = router;
