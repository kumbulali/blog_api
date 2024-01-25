const postService = require('../services/post.service'),
    postValidation = require('../validations/post.validation');

module.exports.getAllPosts = async (req, res) => {
    try {
        const posts = await postService.getAllPosts();
        res.status(200).send(posts);
    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
};

module.exports.createPost = async (req, res) => {
    try {
        const { error } = postValidation.createPostValidationSchema.validate(req.body);
        if (error)
            throw new Error(error);
        const post = await postService.createPost(req);
        res.status(200).send(post);
    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
};

module.exports.updatePost = async (req, res) => {
    try {
        const { error } = postValidation.createPostValidationSchema.validate(req.body);
        if (error)
            throw new Error(error);
        await postService.updatePost(req);
        res.status(200).send({
            message: 'Post successfully updated'
        });
    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
};

module.exports.deletePost = async (req, res) => {
    try {
        await postService.deletePost(req);
        res.status(200).send({
            message: 'Post successfully deleted'
        });
    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
};

module.exports.getMyPosts = async (req, res) => {
    try {
        const posts = await postService.getMyPosts(req);
        res.status(200).send(posts);
    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
};

module.exports.getPostsByCategoryId = async (req, res) => {
    try {
        const posts = await postService.getPostsByCategoryId(req.params.category_id);
        res.status(200).send(posts);
    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
};

module.exports.getPostByID = async (req, res) => {
    try {
        const post = await postService.getPostByID(req.params.post_id);
        res.status(200).send(post);
    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
};