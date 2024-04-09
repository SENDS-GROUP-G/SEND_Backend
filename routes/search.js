const express = require('express');
const { query } = require('../helpers/db.js');

const searchRouter = express.Router()

searchRouter.get('/search/title', async (req, res) => {
    const title = req.body.title;
    try {
        const result = await query('SELECT * FROM posts WHERE title ILIKE $1', ['%' + title + '%']);
        const rows = result.rows ? result.rows : [];
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

searchRouter.get('/search/user', async (req, res) => {
    const user_name = req.body.name;
    try {
        const result = await query('SELECT user_name FROM users LEFT JOIN posts on posts.user_id = users.user_id WHERE user_name ILIKE $1', [user_name + '%']);
        const rows = result.rows ? result.rows : [];
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = { searchRouter };