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

module.exports.createPosts = async (req, res) => {
    try {
        const result = await elasticService.createPosts();
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
};