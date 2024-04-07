const express = require('express');
const { query } = require('../helpers/db.js');
const bcrypt = require('bcrypt');

const userRouter = express.Router();


userRouter.post("/register", async (req, res) => {
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if(!err) {
            const user_name = req.body.user_name;
            const email = req.body.email;
            const password = hash;
            try {
                const result = await query('INSERT INTO users (user_name, password, email) VALUES ($1, $2, $3) RETURNING *',
                    [user_name, password, email]);
                const rows = result.rows ? result.rows : [];
                res.status(200).json({ user_id: rows[0].user_id, user_name: user_name, email: email })
            } catch (error) {
                console.log(error)
                res.statusMessage = error
                res.status(500).json({ error: error.message })
            }
        } else {
            res.statusMessage = err
            res.status(500).json({ error: err.message })
        }
    });
});
module.exports = { userRouter };