const authService = require('../services/auth.service'),
    authValidation = require('../validations/auth.validation');

module.exports.register = async (req, res) => {
    try {
        const { error } = authValidation.registerValidationSchema.validate(req.body);
        if (error)
            throw new Error(error)
        const user = await authService.register(req.body);
        res.send(user);
    } catch (err) {
        res.status(400).send({
            message: err.message
        });
    }
};

module.exports.login = async (req, res) => {
    try {
        const { error } = authValidation.loginValidationSchema.validate(req.body);
        if (error)
            throw new Error(error)
        const user = await authService.login(req.body);
        res.send(user);
    } catch (err) {
        res.status(400).send({
            message: err.message
        });
    }
};