const db = require('../config/db.connection.config'),
  jwtHelper = require('../helpers/jwt.helper'),
  _ = require('lodash');

module.exports.getAllPosts = async () => {
  const result = await db.query(`SELECT 
  posts.id, 
  users.full_name, 
  users.username, 
  COUNT(comments.post_id) AS comment_count,
  posts.title, 
  posts.content,
  posts.category_id, 
  posts.created_at,
  posts.updated_at
FROM posts 
INNER JOIN users ON posts.user_id = users.id 
LEFT JOIN comments ON posts.id = comments.post_id
WHERE posts.deleted_at IS NULL  
GROUP BY posts.id, users.full_name, users.username
ORDER BY posts.created_at DESC`);

  return result.rows;
};

module.exports.createPost = async (req) => {
  const { id } = jwtHelper.getPayloadFromReq(req),
    reqBody = req.body;

  const result = await db.query(`INSERT INTO posts 
  (user_id, title, content, category_id) 
  VALUES ($1, $2, $3, $4) RETURNING *`, [id, reqBody.title, reqBody.content, reqBody.category_id]);

  return result.rows[0];
};

module.exports.updatePost = async (req) => {
  const { id } = jwtHelper.getPayloadFromReq(req),
    reqBody = req.body,
    postId = req.params.post_id

  const postResult = await db.query(`SELECT * FROM posts WHERE id = $1`, [postId]);
  const post = postResult.rows[0];

  if(!post || post.deleted_at){
    throw new Error('Post not found');
  }

  if (post.user_id !== id) {
    throw new Error('User does not have permission to update this post');
  }

  await db.query(`UPDATE posts SET title = COALESCE($1, title),
   content = COALESCE($2, content) WHERE id = $3`, [reqBody.title, reqBody.content, postId]);
};

module.exports.deletePost = async (req) => {
  const { id } = jwtHelper.getPayloadFromReq(req),
    postId = req.params.post_id;

  const postResult = await db.query(`SELECT * FROM posts WHERE id = $1`, [postId]);
  const post = postResult.rows[0];

  if(!post || post.deleted_at){
    throw new Error('Post not found');
  }

  if (post.user_id !== id) {
    throw new Error('User does not have permission to delete this post');
  }
  try {
    await db.query('BEGIN');

    await db.query(`UPDATE posts SET deleted_at = NOW() WHERE id = $1`, [postId]);

    await db.query(`UPDATE comments SET deleted_at = NOW() WHERE post_id = $1`, [postId]);

    await db.query(`COMMIT`);
  } catch (err) {
    await db.query(`ROLLBACK`);

    throw new Error('An error occurred when deleting post');
  }
};

module.exports.getMyPosts = async (req) => {
  const { id } = jwtHelper.getPayloadFromReq(req);

  const result = await db.query(`SELECT 
  posts.id, 
  users.full_name, 
  users.username, 
  COUNT(comments.post_id) AS comment_count,
  posts.title, 
  posts.content,
  posts.category_id, 
  posts.created_at,
  posts.updated_at
FROM posts 
INNER JOIN users ON posts.user_id = users.id 
LEFT JOIN comments ON posts.id = comments.post_id
WHERE posts.user_id = $1 AND posts.deleted_at IS NULL  
GROUP BY posts.id, users.full_name, users.username
ORDER BY posts.created_at DESC`, [id]);

  return result.rows;
};

module.exports.getPostsByCategoryId = async (category_id) => {
  const result = await db.query(`SELECT 
  posts.id, 
  users.full_name, 
  users.username, 
  COUNT(comments.post_id) AS comment_count,
  posts.title, 
  posts.content,
  posts.category_id, 
  posts.created_at,
  posts.updated_at
FROM posts 
INNER JOIN users ON posts.user_id = users.id 
LEFT JOIN comments ON posts.id = comments.post_id
WHERE posts.category_id = $1 AND posts.deleted_at IS NULL  
GROUP BY posts.id, users.full_name, users.username
ORDER BY posts.created_at DESC`, [category_id]);

  return result.rows;
};
