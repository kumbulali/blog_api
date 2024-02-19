const elasticService = require('../services/elastic.service');

module.exports.categoryRates = async (req, res) => {
    try {
        const result = await elasticService.categoryRates();
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
};

module.exports.userStats = async (req, res) => {
    try {
        const result = await elasticService.userStats();
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
};

module.exports.postByTimeThisWeek = async (req, res) => {
    try {
        const result = await elasticService.postByTimeThisWeek();
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
};

module.exports.postByTimeThisMonth = async (req, res) => {
    try {
        const result = await elasticService.postByTimeThisMonth();
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
};

module.exports.postByTimeThisYear = async (req, res) => {
    try {
        const result = await elasticService.postByTimeThisYear();
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
};

module.exports.indexDummyPosts = async (req, res) => {
    try {
        const result = await elasticService.indexDummyPosts();
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
};

module.exports.indexDummyUsers = async (req, res) => {
    try {
        const result = await elasticService.indexDummyUsers();
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
};