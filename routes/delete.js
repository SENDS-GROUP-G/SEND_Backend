const express = require('express');
const { query } = require('../helpers/db.js');

const deleteRouter = express.Router();

deleteRouter.delete("/delete/:user_id", async(req, res) => {
    const user_id = Number(req.params.user_id);
    try {
        await query('delete from comment_reacts where comment_id in (select comment_id from comments inner join posts on comments.post_id = posts.post_id where posts.user_id = $1)', [user_id]);
        await query('delete from comments where post_id in (select post_id from comments where user_id = $1 )', [user_id]);
        await query('delete from post_reacts where post_id in (select post_id from posts where user_id = $1)', [user_id]);
        await query('delete from posts where user_id = $1', [user_id]);
        const result = await query('DELETE FROM users WHERE user_id = $1', [user_id]);
        res.status(200).json({user_id: user_id});
        } catch (error) {
        console.log(error);
        res.status(500).json({error: error});
    }
});

module.exports = { deleteRouter };