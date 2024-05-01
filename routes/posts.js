const express = require('express');
const { query } = require('../helpers/db.js');

const postRouter = express.Router()

// Get all posts
postRouter.get("/", async (req, res) => {
  try {
    sql = 'SELECT posts.post_id, posts.title, posts.saved, posts.user_id, users.user_name, users.avatar, posts.post_content FROM posts JOIN users ON posts.user_id = users.user_id';
    const result = await query(sql);
    const rows = result.rows ? result.rows: [];
    res.status(200).json(rows);
  } catch (error) {
      res.status(500).json({ error: error.message });
    }  
  })

// Get a post by ID:
postRouter.get("/posts/:post_id", async (req, res) => {
  const post_id = Number(req.params.post_id);
  try {
    const result = await query('SELECT * FROM posts WHERE post_id = $1', [post_id]);
    const rows = result.rows ? result.rows : [];
    if (rows.length === 1) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// *WORK* Create new post
postRouter.post("/posts", async(req,res) => {
    const userId = parseInt(req.body.user_id);
    const postContent = req.body.post_content;
    const title = req.body.title;
    try {
        const result = await query('INSERT INTO posts (user_id, title, post_content) VALUES ($1, $2, $3) RETURNING post_id, title, post_content, user_id, (SELECT user_name FROM users WHERE user_id=$1)',
        [userId, title, postContent]);
        const rows = result.rows ? result.rows : [];
        res.status(200).json({ post_id : rows[0].post_id , user_id: userId, user_name: rows[0].user_name, title : title, post_content: postContent })
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
  const title = req.body.title;
  try {
      const result = await query(
      'UPDATE posts SET title =$1, post_content =$2 WHERE post_id =$3 RETURNING *', 
      [title, post_content, post_id]);
      const rows = result.rows ? result.rows : [];
      res.status(200).json({ 
          post_id: rows[0].post_id, 
          title: rows[0].title, 
          post_content: rows[0].post_content 
        })
  } catch (error) {
      console.log( error )
      res.status(500).json({error: error.message});
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