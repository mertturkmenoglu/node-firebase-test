const express = require('express');

const appController = require('../controllers/appController');

const router = express.Router();

router.get('/', appController.getHomePage);

router.get('/login', appController.getLoginPage);

router.get('/register', appController.getRegisterPage);

router.post('/create-post', appController.createPost);

module.exports = router;