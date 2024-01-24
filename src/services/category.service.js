const db = require('../config/db.connection.config');

module.exports.getAllCategories = async () => {
  const result = await db.query(`SELECT * FROM categories`);
  return result.rows;
};

module.exports.createCategory = async (category) => {
  const result = await db.query(`INSERT INTO categories (name) VALUES ($1) RETURNING *`, [category.name]);
  return result.rows[0];
};

module.exports.updateCategory = async (reqBody, categoryId) => {
  await db.query(`UPDATE categories SET 
                        name = COALESCE($1, name) 
                        WHERE id = $2`,
                        [reqBody.name, categoryId]);
};

module.exports.deleteCategory = async (categoryId) => {
  await db.query(`DELETE FROM categories WHERE id = $1`, [categoryId]);
};