const _ = require('lodash'),
    db = require('../config/db.connection.config'),
    jwtHelper = require('../helpers/jwt.helper');

/* BASİT BİR RBAC ÖRNEĞİ ROLE ENDPOINTLERİ OLUŞTURULUP ROL TABANLI ERİŞİM KONTROLÜ YAPILABİLİR.
    Dummy veritabanında yalnızca { id: 1, name: 'Admin' } ve { id: 2, name: 'User' } rolleri mevcut.
*/
module.exports.checkRole = (roleIds) => {
    return (req, res, next) => {
        try {
            const jwtPayload = jwtHelper.getPayloadFromReq(req);
            if(!_.includes(roleIds, jwtPayload.role))
                throw new Error("Unauthorized");
            return next();
        } catch (error) {
            res.status(401).json({
                message: "Unauthorized"
            });
        }
    }
};

module.exports.checkJwt = async (req, res, next) => {
    try {
        const jwtPayload = jwtHelper.getPayloadFromReq(req);
        const result = await db.query(`SELECT session_id FROM sessions WHERE user_id = $1`, [jwtPayload.id]);
        if(!result.rows.length || (result.rows[0].session_id !== jwtPayload.sessionId)){
            throw new Error('Unauthorized');
        }
        next();
    } catch (error) {
        res.status(401).json({
            message: "Unauthorized"
        });
    }
};