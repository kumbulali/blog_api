const commentService = require('../services/comment.service');

module.exports.getCommentsByPostId = async (req, res) => {
    try {
        const posts = await commentService.getCommentsByPostId(req.params.post_id);
        res.status(200).send(posts);
    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
};

module.exports.getCommentById = async (req, res) => {
    try {
        const post = await commentService.getCommentById(req.params.comment_id);
        res.status(200).send(post);
    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
};

module.exports.createComment = async (req, res) => {
    try {
        const post = await commentService.createComment(req);
        res.status(200).send(post);
    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
};

module.exports.updateComment = async (req, res) => {
    try {
        await commentService.updateComment(req);
        res.status(200).send({
            message: "Comment successfully updated"
        });
    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
};

module.exports.deleteComment = async (req, res) => {
    try {
        await commentService.deleteComment(req);
        res.status(200).send({
            message: "Comment successfully deleted"
        });
    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
};