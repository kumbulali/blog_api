const express = require('express'),
    categoryRouter = express.Router(),
    categoryController = require('../controllers/category.controller'),
    { checkJwt, checkRole } = require('../middlewares/authorization.checker.middleware');

categoryRouter.get('/', [checkJwt], categoryController.getAllCategories);

categoryRouter.post('/', [checkJwt, checkRole([1])], categoryController.createCategory);

categoryRouter.delete('/:category_id', [checkJwt, checkRole([1])], categoryController.deleteCategory);

categoryRouter.patch('/:category_id', [checkJwt, checkRole([1])], categoryController.updateCategory);

module.exports = categoryRouter;