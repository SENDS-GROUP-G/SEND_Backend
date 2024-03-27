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

// Get all posts and username
app.get("/", (req,res) => {
    const pool = openDb()
    pool.query('SELECT posts.postid, posts.userid, users.username, posts.postcontent FROM posts INNER JOIN users ON posts.userid = users.userid', 
    (error, result) => {
        if (error) {
            res.status(500).json({ error: error.message})
        }
        res.status(200).json(result.rows)
    })
})

// create new post with userid = 2
app.post("/userid=:userid/newpost", (req, res) => {
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

// Create new comment with userid = 1
app.post("/newcomment", (req, res) => {
    const pool = openDB();
    const userid = 1;
})

/*/ Get all tables
app.get("/allData", (req, res) => {
    const pool = openDb();
    const allData = {};
})  */


// Get all comments
app.get("/allcomments", (req,res) => {
    const pool = openDb()

    pool.query('SELECT * FROM comments', (error, result) => {
        if (error) {
            res.status(500).json({ error: error.message})
        }
        res.status(200).json(result.rows)
    })
})

app.listen(port)