const express = require('express');
const DonationController = require('../Controllers/DonationController');

const router = express.Router();

router.post('/donate', DonationController.postDonation);
router.get('/viewdonations/:userId', DonationController.viewDonations);
router.get('/alldonations', DonationController.getAllDonations);

module.exports = router;