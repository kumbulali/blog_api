const { Pool } = require('pg');
const config = require('../config/variables.config');

const pool = new Pool(config.database);

pool.on('error', (err) => {
  console.error('An error occurred when connecting database: ', err);
});

module.exports = pool;