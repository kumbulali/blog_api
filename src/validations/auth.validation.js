const Joi = require('joi');

const authValidation = {
    loginValidationSchema: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }),
    
    registerValidationSchema: Joi.object({
        full_name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }),

    changePasswordValidationSchema: Joi.object({
        currentPassword: Joi.string().required(),
        newPassword: Joi.string().required(),
        newPasswordVerify: Joi.ref('newPassword')
    })
};

module.exports = authValidation;