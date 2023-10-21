const express = require('express');
const DonationController = require('../Controllers/DonationController');

const router = express.Router();
// Ruta para procesar la donación
router.post('/donate', DonationController.postDonation);

module.exports = router;
