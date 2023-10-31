const express = require('express');
const router = express.Router();
const { postMovieVista, postSerieVista, getMoviesVistasById,  getSeriesVistasById ,putMovieVista , putSerieVista ,deleteMovieVista, deleteSerieVista } = require('../Controllers/Movievistacontroller');


router.post('/moviesvistas', postMovieVista);
router.post('/seriesvistas', postSerieVista);

router.get('/moviesvistas/:id', getMoviesVistasById);
router.get('/seriesvistas/:id', getSeriesVistasById);

router.put('/moviesvistas/:id', putMovieVista);
router.put('/seriesvistas/:id', putSerieVista);

router.delete('/moviesvistas/:id', deleteMovieVista);
router.delete('/seriesvistas/:id', deleteSerieVista);

module.exports = router;
