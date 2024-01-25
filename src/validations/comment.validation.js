const Joi = require('joi');

const commentValidation = {
    createCommentValidationSchema: Joi.object({
        content: Joi.string().required()
    }),

    updateCommentValidationSchema: Joi.object({
        content: Joi.string().required()
    })
};

module.exports = commentValidation;