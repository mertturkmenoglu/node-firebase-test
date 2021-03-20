const express = require('express');

const appController = require('../controllers/appController');

const router = express.Router();

router.get('/', appController.getHomePage);

module.exports = router;