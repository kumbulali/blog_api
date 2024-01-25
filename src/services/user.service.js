const db = require('../config/db.connection.config'),
  jwtHelper = require('../helpers/jwt.helper'),
  bcrypt = require('bcrypt');

module.exports.getUserMe = async (req) => {
  const jwtPayload = jwtHelper.getPayloadFromReq(req),
    result = await db.query("SELECT full_name, username, email, role, created_at, updated_at FROM users WHERE id = $1", [jwtPayload.id]),
    user = result.rows[0];

  return user;
};

module.exports.changePassword = async (req) => {
  const jwtPayload = jwtHelper.getPayloadFromReq(req),
    reqBody = req.body,
    result = await db.query("SELECT * FROM users WHERE id = $1", [jwtPayload.id]),
    user = result.rows[0];

  const passwordMatches = await bcrypt.compare(reqBody.currentPassword, user.password);

  if (!passwordMatches) {
    throw new Error("Current password is incorrect");
  }

  const hashedPassword = await bcrypt.hash(reqBody.newPassword, user.salt);

  try {
    await db.query('BEGIN');

    await db.query(
      "UPDATE users SET password=$1 WHERE id=$2",
      [hashedPassword, user.id]
    );

    await db.query('DELETE FROM sessions WHERE user_id = $1', [user.id]);

    await db.query('COMMIT');
  } catch (err) {
    await db.query('ROLLBACK');

    throw err;
  }
};

module.exports.changePasswordOfUserByID = async (req) => {
  const user_id = req.params.user_id,
    reqBody = req.body,
    result = await db.query("SELECT * FROM users WHERE id = $1", [user_id]),
    user = result.rows[0];

  if(!user || user.deleted_at){
    throw new Error('User not found');
  }

  const hashedPassword = await bcrypt.hash(reqBody.newPassword, user.salt);

  try {
    await db.query('BEGIN');

    await db.query(
      "UPDATE users SET password=$1 WHERE id=$2",
      [hashedPassword, user.id]
    );

    await db.query('DELETE FROM sessions WHERE user_id = $1', [user.id]);

    await db.query('COMMIT');
  } catch (err) {
    await db.query('ROLLBACK');

    throw err;
  }
};

module.exports.deleteMyAccount = async (req) => {
  const jwtPayload = jwtHelper.getPayloadFromReq(req),
    { id } = jwtPayload;

  try {
    await db.query('BEGIN');

    await db.query('DELETE FROM sessions WHERE user_id = $1', [id]);

    await db.query('UPDATE users SET deleted_at = NOW() WHERE id = $1', [id]);

    await db.query('UPDATE comments SET deleted_at = NOW() WHERE user_id = $1', [id]);

    await db.query('UPDATE posts SET deleted_at = NOW() WHERE user_id = $1', [id]);

    await db.query('COMMIT');
  } catch (err) {
    await db.query('ROLLBACK');

    throw err;
  }
};

module.exports.deleteUserByID = async (req) => {
  const user_id = req.params.user_id;

  try {
    await db.query('BEGIN');

    await db.query('DELETE FROM sessions WHERE user_id = $1', [user_id]);

    await db.query('UPDATE users SET deleted_at = NOW() WHERE id = $1', [user_id]);

    await db.query('UPDATE comments SET deleted_at = NOW() WHERE user_id = $1', [user_id]);

    await db.query('UPDATE posts SET deleted_at = NOW() WHERE user_id = $1', [user_id]);

    await db.query('COMMIT');
  } catch (err) {
    await db.query('ROLLBACK');

    throw err;
  }
};

module.exports.updateMyAccountInfo = async (req) => {
  const jwtPayload = jwtHelper.getPayloadFromReq(req),
    reqBody = req.body;

  await db.query(`UPDATE users SET 
  full_name = COALESCE($1, full_name),
  username = COALESCE($2, username)
  WHERE id = $3`, [reqBody.full_name, reqBody.username, jwtPayload.id]);
};

module.exports.getUserByUsername = async (username) => {
  const result = await db.query("SELECT id, full_name, username, email, role, created_at, updated_at FROM users WHERE username = $1", [username]),
    user = result.rows[0];

  if (!user)
    throw new Error('User not found');

  return user;
};

module.exports.getUserByID = async (id) => {
  const result = await db.query("SELECT id, full_name, username, email, role, created_at, updated_at FROM users WHERE id = $1", [id]),
    user = result.rows[0];

  if (!user)
    throw new Error('User not found');

  return user;
};

module.exports.getAllUsers = async () => {
  const result = await db.query("SELECT id, full_name, username, email, role, created_at, updated_at FROM users");

  return result.rows;
};