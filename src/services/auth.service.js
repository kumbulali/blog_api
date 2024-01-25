const bcrypt = require('bcrypt'),
    jwtHelper = require('../helpers/jwt.helper'),
    db = require('../config/db.connection.config'),
    _ = require('lodash');

const removeCredentials = (userObject) => {
    return _.omit(userObject, ['password', 'salt', 'deleted_at']);
};

const generateUsername = async (fullName, userId) => {
    fullName = fullName.replace(/\s/g, '').toLowerCase();
    let username = fullName + userId;
    let attempt = 1;
    if (!await checkUsernameExistence(username)) {
        return username;
    }

    while (attempt <= 10) {
        const randomNumber = getRandomNumber();
        username = fullName + userId + randomNumber;
        if (!await checkUsernameExistence(username)) {
            return username;
        }
        attempt++;
    }
    throw new Error("username could not be generated");
};

const checkUsernameExistence = async (username) => {
    const result = await db.query(`SELECT 1 FROM users WHERE username = $1`, [username]);

    return result.rows.length;
}

const getRandomNumber = () => {
    return Math.floor(Math.random() * 1000);
};

module.exports.register = async (userData) => {
    const salt = await bcrypt.genSalt();

    userData.salt = salt;
    userData.password = await bcrypt.hash(userData.password, salt);

    await db.query('BEGIN');

    const result = await db.query(
        `INSERT INTO users (full_name, email, password, salt) 
     VALUES ($1, $2, $3, $4) RETURNING full_name, username, email, role, created_at, updated_at`,
        [
            userData.full_name,
            userData.email,
            userData.password,
            userData.salt
        ]
    );
    const user = result.rows[0];

    if (!user) {
        await db.query('ROLLBACK');
    }
    else {
        user.username = await generateUsername(user.full_name, user.id);
        await db.query(`UPDATE users SET username = $1 WHERE id = $2`, [user.username, user.id]);
        await db.query('COMMIT');
    }

    user.authToken = await jwtHelper.signJwt({ id: user.id, email: user.email, role: user.role });

    return removeCredentials(user);
};

module.exports.login = async (userData) => {
    const result = await db.query(
        'SELECT * FROM users WHERE email = $1',
        [userData.email]
    );

    const user = result.rows[0];

    if (!user || user.deleted_at) {
        throw new Error('User not found.');
    }

    const passwordMatches = await bcrypt.compare(userData.password, user.password);
    
    if (!passwordMatches) {
        throw new Error('Invalid credentials.');
    }

    user.authToken = await jwtHelper.signJwt({ id: user.id, email: user.email, role: user.role });

    return removeCredentials(user);
};