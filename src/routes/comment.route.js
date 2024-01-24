const express = require('express'),
    commentRouter = express.Router(),
    commentController = require('../controllers/comment.controller'),
    { checkJwt } = require('../middlewares/authorization.checker.middleware');

commentRouter.get('/:comment_id', [checkJwt], commentController.getCommentById);

commentRouter.patch('/:comment_id', [checkJwt], commentController.updateComment);

commentRouter.delete('/:comment_id', [checkJwt], commentController.deleteComment);

module.exports = commentRouter;