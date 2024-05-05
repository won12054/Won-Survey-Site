const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.post('/register', authController.register);

router.get('/check-email', authController.checkEmailExists);

router.get('/check-username', authController.checkUsernameExists);

router.post('/login', authController.login);

module.exports = router;
