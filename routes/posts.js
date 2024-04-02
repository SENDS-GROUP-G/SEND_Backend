const express = require('express');
const { query } = require('../helpers/db.js');

const postRouter = express.Router()


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


module.exports = { postRouter } 