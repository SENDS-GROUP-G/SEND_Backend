const express = require('express');
const { query } = require('../helpers/db.js');
const bcrypt = require('bcrypt');

const userRouter = express.Router();

//Register
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

//Login to an account:
userRouter.post("/users/login", async(req,res) => {
    console.log(req.body);
    try {
        const sql = "SELECT * FROM users WHERE email=$1";
        const result = await query(sql,[req.body.email]);
        console.log(result.rowCount)
        console.log(req.body.password);
        console.log("This " + result.rows[0].password);
        if (result.rowCount === 1) {
            bcrypt.compare(req.body.password,result.rows[0].password, (err, bcrypt_res) => {
                if (!err) {
                    console.log('ok')
                    console.log(bcrypt_res)
                    if (bcrypt_res === true) {
                        const user = result.rows[0];
                        res.status(200).json({ "user_id": user.user_id,"email":user.email, "user_name": user.user_name })
                    } else {
                        res.statusMessage = 'Invalid login';
                        res.status(401).json({ error: 'Invalid login '})
                    }
                } else {
                    res.statusMessage = err;
                    res.status(500).json({error: err})
                }
            })
        } else {
            res.statusMessage = 'Invalid login';
            res.status(401).json({error: 'Invalid login'})
        }
    } catch (error) {
        res.statusMessage = err;
        res.status(500).json({error: err})
    }
})


module.exports = { userRouter };