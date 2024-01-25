const jwt = require('jsonwebtoken'),
    db = require('../config/db.connection.config'),
    crypto = require('crypto'),
    config = require('../config/environment.variables.config');

module.exports.signJwt = async (payload) => {
    const result = await db.query(`SELECT session_id FROM sessions WHERE user_id = $1`, [payload.id]);
    payload.sessionId = crypto.randomBytes(8).toString('hex'); 

    if (result.rows.length){
        await db.query(`UPDATE sessions SET session_id = $1 WHERE user_id = $2`, [payload.sessionId, payload.id]);
    }else{
        await db.query(`INSERT INTO sessions (session_id, user_id) VALUES ($1, $2)`, [payload.sessionId, payload.id]);
    }

    const token = jwt.sign(payload,
        config.jwtSecret,
        { expiresIn: "1h" })

    return token;
};

module.exports.getPayloadFromReq = (req) => {
    const token = req.headers["authorization"];
    const bearerToken = token.slice(7);
    return jwt.verify(bearerToken, config.jwtSecret);
};

module.exports.getPayloadFromToken = (bearerToken) => {
    return jwt.verify(bearerToken, config.jwtSecret);
};
