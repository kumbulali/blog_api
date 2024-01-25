const express = require('express'),
    postRouter = express.Router(),
    postController = require('../controllers/post.controller'),
    commentController = require('../controllers/comment.controller'),
    { checkJwt } = require('../middlewares/authorization.checker.middleware');

postRouter.get('/', [checkJwt], postController.getAllPosts);

postRouter.post('/', [checkJwt], postController.createPost);

postRouter.get('/myPosts', [checkJwt], postController.getMyPosts);

postRouter.get('/:post_id', [checkJwt], postController.getPostByID);

postRouter.patch('/:post_id', [checkJwt], postController.updatePost);

postRouter.delete('/:post_id', [checkJwt], postController.deletePost);

postRouter.get('/category/:category_id', [checkJwt], postController.getPostsByCategoryId);

postRouter.get('/:post_id/comments', [checkJwt], commentController.getCommentsByPostId);

postRouter.post('/:post_id/comments', [checkJwt], commentController.createComment);

module.exports = postRouter;