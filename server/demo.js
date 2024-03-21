const express = require('express')
const cors = require('cors')
const { Pool } = require('pg')

const openDb = () => {
    const pool = new Pool ({
        user: 'postgres',
        host: 'localhost',
        database: 'sends',
        password: 'test',
        port: 5432
    })
    return pool
}

const app = express()
app.use(cors())
app.use(express.json())

const port = 3001

app.post("/newpost", (req, res) => {
    const pool = openDb()
    const userid = 2;

    pool.query('INSERT INTO posts (userid, postcontent) VALUES ($1, $2) RETURNING postid, postcontent, userid',
    [userid, req.body.postcontent],
    (error, result) => {
        if (error) {
            res.status(500).json({ error: error.message })
        } else {
            res.status(200).json({ postid : result.rows[0].postid })
        }
    })
})

app.get("/", (req,res) => {
    const pool = openDb()

    pool.query('SELECT postid, username, postcontent FROM posts inner join users on posts.userid = users.userid', (error, result) => {
        if (error) {
            res.status(500).json({ error: error.message})
        }
        res.status(200).json(result.rows)
    })
})

app.listen(port)