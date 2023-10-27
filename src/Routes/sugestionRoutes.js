const express = require('express');
const router = express.Router();
const { sendSuggestion } = require('../Controllers/sendSugestionControllers'); 

router.post('/suggestion', sendSuggestion);

module.exports = router;


