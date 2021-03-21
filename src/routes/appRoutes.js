const express = require('express');

const appController = require('../controllers/appController');

const router = express.Router();

router.get('/', appController.getHomePage);

router.route('/login')
  .get(appController.getLoginPage)
  .post(appController.login);

router.route('/register')
  .get(appController.getRegisterPage)
  .post(appController.register);

router.post('/create-post', appController.createPost);

module.exports = router;