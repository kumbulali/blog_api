const categoryService = require('../services/category.service');

module.exports.getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).send(categories);
    } catch (err) {
        res.status(400).send({
            message: err.message
        });
    }
};

module.exports.createCategory = async (req, res) => {
    try {
        const category = await categoryService.createCategory(req.body);
        res.status(200).send(category);
    } catch (err) {
        res.status(400).send({
            message: err.message
        });
    }
};

module.exports.updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.category_id;
        await categoryService.updateCategory(req.body, categoryId);
        res.status(200).send({
            message: 'Category successfully updated'
        });
    } catch (err) {
        res.status(400).send({
            message: err.message
        });
    }
};

module.exports.deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.category_id;
        await categoryService.deleteCategory(categoryId);
        res.status(200).send({
            message: 'Category successfully deleted'
        });
    } catch (err) {
        res.status(400).send({
            message: err.message
        });
    }
};