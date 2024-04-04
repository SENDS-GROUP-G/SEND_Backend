const express = require('express');
const { query } = require('../helpers/db.js');

const commentRouter = express.Router()

// Get all comments
commentRouter.get('/posts/:postId/comments', async (req, res) => {
  const id = req.params.postId;
  try {
    const result = await query('SELECT * FROM comments WHERE post_id =' + id );
    const rows = result.rows ? result.rows : [];
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

// *WORK* Create new comment
commentRouter.post("/posts/:post_id/comments", async(req, res) => {
    try {
        const userId = parseInt(req.body.user_id);
        const postId = parseInt(req.params.post_id);
        const commentContent = req.body.comment_content;
        const result = await query('INSERT INTO comments (post_id, user_id, comment_content) VALUES ($1, $2, $3) RETURNING comment_id, post_id, user_id, comment_content',
        [postId, userId, commentContent]);
        const rows = result.rows ? result.rows : [];
        res.status(200).json({ comment_id : rows[0].comment_id, comment_content: commentContent })
    } catch (error) {
        res.statusMessage = error;
        res.status(500).json({ error : error });
    }
})

// Delete a comment by ID
commentRouter.delete("/posts/:post_id/comments/:comment_id", async(req, res) => {
    const comment_id = Number(req.params.comment_id);
    try {
        const result = await query('DELETE FROM comments WHERE comment_id = $1', [comment_id]);
        res.status(200).json({comment_id: comment_id});
        } catch (error) {
        console.log(error);
        res.statusMessage = error;
        res.status(500).json({error: error});
    }
});

module.exports = { commentRouter } 