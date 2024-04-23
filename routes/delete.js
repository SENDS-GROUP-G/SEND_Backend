const express = require('express');
const { query } = require('../helpers/db.js');
const bcrypt = require('bcrypt');

const deleteRouter = express.Router();

deleteRouter.delete("/delete/users/:user_id", async(req, res) => {
    const userId = parseInt(req.params.user_id);
    try {
        const sql = 'SELECT * FROM users WHERE user_id = $1';
        const data = await query(sql,[userId]);
        console.log(data.rowCount);
        if(data.rowCount === 1) {
            console.log(data.rows[0]);
            const checkPassword = await bcrypt.compare(req.body.password, data.rows[0].password);
            if (checkPassword) {
                await query('delete from comment_reacts where comment_id in (select comment_id from comments inner join posts on comments.post_id = posts.post_id where posts.user_id = $1)', [userId]);
                await query('delete from comments where post_id in (select post_id from comments where user_id = $1 )', [userId]);
                await query('delete from post_reacts where post_id in (select post_id from posts where user_id = $1)', [userId]);
                await query('delete from posts where user_id = $1', [userId]);
                const result = await query('DELETE FROM users WHERE user_id = $1', [userId]);
                res.status(200).json({ user_id: userId, message: 'Account deleted successfully'});
            } else {
                res.status(401).json({ error : 'Incorrect Password' })
            }
        } else {
            res.status(401).json({ error : 'Account not found'})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error});
    }
});

module.exports = { deleteRouter };