const userService = require('../services/user.service'),
    userValidation = require('../validations/user.validation');

module.exports.getUserMe = async (req, res) => {
    try {
        const user = await userService.getUserMe(req);
        res.status(200).send(user);
    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
};

module.exports.changePassword = async (req, res) => {
    try {
        const { error } = userValidation.changePasswordValidationSchema.validate(req.body);
        if (error)
            throw new Error(error);

        await userService.changePassword(req);
        res.status(200).send({
            message: 'Password changed'
        });
    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
};

module.exports.deleteMyAccount = async (req, res) => {
    try {
        await userService.deleteMyAccount(req);
        res.status(200).send({
            message: 'Account successfully deleted'
        });
    } catch (err) {
        res.status(400).send({
            message: err.message
        });
    }
};

module.exports.updateMyAccountInfo = async (req, res) => {
    try {
        await userService.updateMyAccountInfo(req);

        res.status(200).send({
            message: 'Account info successfully updated'
        });
    } catch (err) {
        res.status(400).send({
            message: err.message
        });
    }
};

module.exports.getUserByUsername = async (req, res) => {
    try {
        const user = await userService.getUserByUsername(req.params.username);
        res.status(200).send(user);
    } catch (err) {
        res.status(400).send({
            message: err.message
        });
    }
};

module.exports.getUserByID = async (req, res) => {
    try {
        const user = await userService.getUserByID(req.params.user_id);
        res.status(200).send(user);
    } catch (err) {
        res.status(400).send({
            message: err.message
        });
    }
};

module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).send(users);
    } catch (err) {
        res.status(400).send({
            message: err.message
        });
    }
};