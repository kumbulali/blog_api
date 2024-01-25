const Joi = require('joi');

const userValidation = {
    changePasswordValidationSchema: Joi.object({
        currentPassword: Joi.string().required(),
        newPassword: Joi.string().required(),
        newPasswordVerify: Joi.ref('newPassword')
    }),

    changePasswordOfUserByIDValidationSchema: Joi.object({
        newPassword: Joi.string().required(),
        newPasswordVerify: Joi.ref('newPassword')
    })
};

module.exports = userValidation;