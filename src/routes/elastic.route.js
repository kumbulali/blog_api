const express = require('express'),
    elasticRouter = express.Router(),
    elasticController = require('../controllers/elastic.controller'),
    { checkJwt, checkRole } = require('../middlewares/authorization.checker.middleware');

elasticRouter.get('/categoryRates', [checkJwt, checkRole([1])], elasticController.categoryRates);

elasticRouter.get('/userStats', [checkJwt, checkRole([1])], elasticController.userStats);

elasticRouter.get('/postByTime/thisWeek', [checkJwt, checkRole([1])], elasticController.postByTimeThisWeek);

elasticRouter.get('/postByTime/thisMonth', [checkJwt, checkRole([1])], elasticController.postByTimeThisMonth);

elasticRouter.get('/postByTime/thisYear', [checkJwt, checkRole([1])], elasticController.postByTimeThisYear);

elasticRouter.get('/createPosts', [checkJwt, checkRole([1])], elasticController.createPosts);

module.exports = elasticRouter;