const express = require('express');

const appController = require('../controllers/appController');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

router.get('/', appController.getHomePage);

router.route('/login')
  .get(appController.getLoginPage)
  .post(appController.login);

router.route('/register')
  .get(appController.getRegisterPage)
  .post(appController.register);

router.post('/create-post', isAuth, appController.createPost);

router.get('/logout', appController.logout);

module.exports = router;