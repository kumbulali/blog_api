const Joi = require('joi');

const postValidation = {
    createPostValidationSchema: Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        category_id: Joi.number().required()
    }),

    updatePostValidationSchema: Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required()
    })
};

module.exports = postValidation;