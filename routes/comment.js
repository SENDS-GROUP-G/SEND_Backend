const express = require('express');
const { query } = require('../helpers/db.js');

const commentRouter = express.Router();

commentRouter.get('/posts/:postId/comments', async (req, res) => {
  const id = req.params.postId;
  try {
    const result = await query('SELECT * FROM comments WHERE postid =' + id );
    const rows = result.rows ? result.rows : [];
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

module.exports = commentRouter