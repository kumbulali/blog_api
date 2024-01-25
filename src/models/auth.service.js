const bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    db = require('../config/db.connection.config'),
    config = require('../config/environment.variables.config'),
    _ = require('lodash');

const removeCredentials = (userObject) => {
    return _.omit(userObject, ['password', 'salt']);
};

module.exports.register = async (userData) => {
    const salt = await bcrypt.genSalt();

    userData.salt = salt;
    userData.password = await bcrypt.hash(userData.password, salt);

    const result = await db.query(
        `INSERT INTO users (username, email, password, salt) 
     VALUES ($1, $2, $3, $4) RETURNING *`,
        [
            userData.username,
            userData.email,
            userData.password,
            userData.salt
        ]
    );

    const user = result.rows[0];
    user.authToken =jwt.sign(
        { id: user.id, email: user.email },
        config.jwtSecret,
        { expiresIn: "1h" }
      );
    return removeCredentials(user);
};

module.exports.login = async (userData) => {
    const result = await db.query(
        'SELECT * FROM users WHERE email = $1',
        [userData.email]
    );

    const user = result.rows[0];

    if (!user) {
        throw new Error('User not found.');
    }

    const passwordMatches = await bcrypt.compare(userData.password, user.password);
    
    if (!passwordMatches) {
        throw new Error('Invalid credentials.');
    }

    user.authToken =jwt.sign(
        { id: user.id, email: user.email },
        config.jwtSecret,
        { expiresIn: "1h" }
      );
    return removeCredentials(user);
};

module.exports.changePassword = async (reqBody, token) => {
    const jwtPayload = jwt.verify(token, config.jwtSecret);
        result = await db.query("SELECT * FROM users WHERE id = $1", [jwtPayload.id]),
        user = result.rows[0];

    const passwordMatches = await bcrypt.compare(reqBody.currentPassword, user.password);

    if (!passwordMatches) {
        throw new Error("Current password is incorrect");
    }

    const hashedPassword = await bcrypt.hash(reqBody.newPassword, user.salt);

    await db.query(
        "UPDATE users SET password=$1 WHERE id=$2",
        [hashedPassword, user.id]
    );
};