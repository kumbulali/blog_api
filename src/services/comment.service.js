const db = require('../config/db.connection.config'),
  jwtHelper = require('../helpers/jwt.helper'),
  _ = require('lodash');

module.exports.getCommentsByPostId = async (postId) => {
  const result = await db.query(`SELECT 
  comments.id, 
  users.full_name, 
  users.username, 
  comments.content,
  comments.created_at,
  comments.updated_at
FROM comments 
INNER JOIN users ON comments.user_id = users.id 
WHERE comments.post_id = $1 AND comments.deleted_at IS NULL  
GROUP BY comments.id, users.full_name, users.username
ORDER BY comments.created_at DESC`, [postId]);

  if(!result.rows.length){
    throw new Error('No comments found');
  }

  return result.rows;
};

module.exports.getCommentById = async (commentId) => {
  const result = await db.query(`SELECT 
  comments.id, 
  users.full_name, 
  users.username, 
  comments.content,
  comments.created_at,
  comments.updated_at,
  comments.deleted_at
FROM comments 
INNER JOIN users ON comments.user_id = users.id 
WHERE comments.id = $1 AND comments.deleted_at IS NULL  
GROUP BY comments.id, users.full_name, users.username
ORDER BY comments.created_at DESC`, [commentId]),
  comment = result.rows[0];

  if(!comment || comment.deleted_at){
    throw new Error('Comment not found');
  }
  
  return result.rows[0];
};

module.exports.createComment = async (req) => {
  const { id } = jwtHelper.getPayloadFromReq(req);

  const result = await db.query(`WITH inserted_comment AS (
    INSERT INTO comments (content, user_id, post_id) 
    VALUES ($1, $2, $3)
    RETURNING id, content, user_id, created_at, updated_at
  )
  SELECT
    ic.id, 
    u.full_name,
    u.username,
    ic.content,
    ic.created_at,
    ic.updated_at 
  FROM inserted_comment ic
  INNER JOIN users u ON ic.user_id = u.id`, [req.body.content, id, req.params.post_id]);

  return result.rows[0];
};

module.exports.updateComment = async (req) => {
  const { id } = jwtHelper.getPayloadFromReq(req),
    comment_id = req.params.comment_id;

  const commentResult = await db.query(`SELECT * FROM comments WHERE id = $1`, [comment_id]);
  const comment = commentResult.rows[0];

  if (!comment || comment.deleted_at) {
    throw new Error('Comment not found');
  }

  if (comment.user_id !== id) {
    throw new Error('User does not have permission to update this comment');
  }

  const result = await db.query(`UPDATE comments SET content = COALESCE($1, content) WHERE id = $2`, [req.body.content, comment_id]);

  return result.rows[0];
};

module.exports.deleteComment = async (req) => {
  const { id } = jwtHelper.getPayloadFromReq(req),
    comment_id = req.params.comment_id;

  const commentResult = await db.query(`SELECT * FROM comments WHERE id = $1`, [comment_id]);
  const comment = commentResult.rows[0];

  if (!comment || comment.deleted_at) {
    throw new Error('Comment not found');
  }

  if (comment.user_id !== id) {
    throw new Error('User does not have permission to delete this comment');
  }

  const result = await db.query(`UPDATE comments SET deleted_at = NOW() WHERE id = $1`, [comment_id]);

  return result.rows[0];
};