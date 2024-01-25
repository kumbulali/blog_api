const Joi = require('joi');

const categoryValidation = {
    createCategoryValidationSchema: Joi.object({
        name: Joi.string().required()
    }),

    updateCategoryValidationSchema: Joi.object({
        name: Joi.string().required()
    })
};

module.exports = categoryValidation;