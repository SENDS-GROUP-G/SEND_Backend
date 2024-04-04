const express = require('express');
const { query } = require('../helpers/db.js');

const postRouter = express.Router()

// Get all posts
postRouter.get("/", async (req, res) => {
  console.log('123');

  try {
    const result = await query('SELECT * FROM posts');
    const rows = result.rows ? result.rows: [];
    res.status(200).json(rows);
  } catch (error) {
      res.status(500).json({ error: error.message });
    }  
  })

// *WORK* Create new post
postRouter.post("/posts", async(req,res) => {
    const userId = parseInt(req.body.user_id);
    const postContent = req.body.post_content;
    try {
        const result = await query('INSERT INTO posts (user_id, post_content) VALUES ($1, $2) RETURNING post_id, post_content, user_id',
        [userId, postContent]);
        const rows = result.rows ? result.rows : [];
        res.status(200).json({ post_id : rows[0].post_id , user_id: userId , post_content: postContent })
    } catch (error) {
        console.log(error)
        res.statusMessage = error
        res.status(500).json({error: error.message})
    }
})
// Edit post

postRouter.put('/posts/:post_id', async (req, res) => {
  const post_id = Number(req.params.post_id);
  const post_content  = req.body.post_content;

  try {
      const result = await query('UPDATE posts SET post_content = $1 WHERE post_id = $2 RETURNING *', [post_content, post_id]);
      res.status(200).json({postid: result.rows[0].postid})
  } catch (error) {
      res.status(500).json({ error: error.message});
}
});

// Delete a post by ID
postRouter.delete("/posts/:post_id", async(req, res) => {
    const post_id = Number(req.params.post_id);
    //const comment_id = Number(req.params.comment_id);
    try {
        await query('DELETE FROM replies WHERE comment_id = (SELECT comment_id FROM comments WHERE post_id = $1)', [post_id]);
        await query('DELETE FROM comment_reacts WHERE comment_id = (SELECT comment_id FROM comments WHERE post_id = $1)', [post_id]);  
        await query('DELETE FROM post_reacts WHERE post_id = $1', [post_id]);
        await query('DELETE FROM comments WHERE post_id = $1', [post_id]);
        const result = await query('DELETE FROM posts WHERE post_id = $1', [post_id]);
        res.status(200).json({post_id: post_id});
        } catch (error) {
        console.log(error);
        res.statusMessage = error;
        res.status(500).json({error: error});
    }
})


module.exports = { postRouter } 