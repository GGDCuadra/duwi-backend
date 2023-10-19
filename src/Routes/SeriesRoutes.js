const express = require('express');
const seriesController = require('..//Controllers/SeriesControllers');
const favControllers  = require('../Controllers/FavControllersSeries')


const router = express.Router();

router.get('/series/name', seriesController.getSeriesByName);
router.get('/series', seriesController.getSeries);
router.get('/series/:id', seriesController.getSeriesById);
router.get('/top-series', seriesController.getTopSeries);


router.post('/postSeries', seriesController.postSeries)
router.put('/series/:id', seriesController.updateSeries);
router.put('/series/deshabilitar/:id', seriesController.disableSerie);

//RUTAS FAVORITOS SERIES
router.get('/favorites/:userId', favControllers.getFavoritesByUser);
router.post("/favorites", favControllers.addFavSeries);
router.delete('/favorites/:userId/:seriesId', favControllers.deleteFavorite);

module.exports = router;