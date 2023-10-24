const express = require('express');
const DonationController = require('../Controllers/DonationController');

const router = express.Router();

router.post('/donate', DonationController.postDonation);
router.get('/viewdonations/:userId', DonationController.viewDonations);

module.exports = router;
