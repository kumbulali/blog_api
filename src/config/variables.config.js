const dotenv = require('dotenv');

dotenv.config();

const SERVER = {
    hostname: process.env.HOSTNAME || "localhost",
    port: process.env.PORT || 3000
};

const DATABASE = {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 5432,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER
};

const config = {
    server: SERVER,
    database: DATABASE,
    jwtSecret: process.env.JWT_SECRET
};

module.exports = config;