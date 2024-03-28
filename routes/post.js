const express = require('express');
const { query } = require('../helpers/db.js');

const postRouter = express.Router();

postRouter.put('/posts/:id', async (req, res) => {
    const postId = Number(req.params.id); // Corrected
    const { postcontent } = req.body;

    try {
        const result = await query('UPDATE posts SET postcontent = $1 WHERE postid = $2', [postcontent, postId]);
        //update posts set postcontent = 'hello tam' where postid = 1
        res.json(result.rows[0]);
        res.status(200).json({id: result.rows[0].id})
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

postRouter.get('/posts', async (req, res) => {
    try{
        const result = await query('SELECT * FROM posts')
        const rows = result.rows ? result.rows : []
        res.status(200).json(rows)
    } catch (error) {
        console.log(error)
        res.statusMessage = error
        res.status(500).json({error: error})
    }
})
module.exports = { postRouter };
