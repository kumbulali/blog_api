const express = require('express'),
    authRouter = express.Router(),
    authController = require('../controllers/auth.controller');
    
authRouter.post('/login', authController.login);

authRouter.post('/register', authController.register);

module.exports = authRouter;
