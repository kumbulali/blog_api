const express = require('express'),
    userRouter = express.Router(),
    userController = require('../controllers/user.controller'),
    { checkJwt, checkRole } = require('../middlewares/authorization.checker.middleware');

userRouter.get('/me', [checkJwt], userController.getUserMe);

userRouter.delete('/me', [checkJwt], userController.deleteMyAccount);

userRouter.patch('/me', [checkJwt], userController.updateMyAccountInfo);

userRouter.patch('/changePassword', [checkJwt], userController.changePassword);

userRouter.get('/id/:user_id', [checkJwt, checkRole([1])], userController.getUserByID);

userRouter.get('/username/:username', [checkJwt, checkRole([1])], userController.getUserByUsername);

userRouter.get('/', [checkJwt, checkRole([1])], userController.getAllUsers);

module.exports = userRouter;