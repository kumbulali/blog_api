const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

const logDirectory = path.join(__dirname, '..', '..', 'logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = fs.createWriteStream(path.join(logDirectory, `api_log_${new Date().toISOString().slice(0, 10)}.log`), { flags: 'a' });

const logger = morgan('combined', { stream: accessLogStream });

module.exports = logger;