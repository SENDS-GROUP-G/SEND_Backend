const express = require('express');
const { query } = require('../helpers/db.js');

const commentRouter = express.Router();

commentRouter.put('/posts/:postId/comments/:commentId', async (req, res) => {
    const { commentId } = req.params.commentId;

    try {
        const result = await query('UPDATE comments SET content = $2 WHERE id = $3 RETURNING *', [commentcontent, commentId]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

commentRouter.get('/comments', async (req, res) => {
    try{
        const result = await query('SELECT * FROM comments')
        const rows = result.rows ? result.rows : []
        res.status(200).json(rows)
    } catch (error) {
        console.log(error)
        res.statusMessage = error
        res.status(500).json({error: error})
    }
})

module.exports = {commentRouter};