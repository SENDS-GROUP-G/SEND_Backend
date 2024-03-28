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
//app.use(express.urlencoded({extended: false}));

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

// Get a specified post by postid
app.get("/postid=:postid", (req, res) => {
    const pool = openDb()
    const postid = req.params.postid
    pool.query('SELECT posts.postid, posts.userid, users.username, posts.postcontent FROM posts INNER JOIN users ON posts.userid = users.userid WHERE posts.postid=$1',
    [postid],
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

// WORK Create new comment with userid = 1
app.post("/postid=:postid/newcomment", (req, res) => {
    const pool = openDb();
    const userid = 1;
    const postid = Number(req.params.postid);
    const commentContent = req.body.commentcontent
    pool.query('INSERT INTO comments (postid, userid, commentcontent) VALUES ($1, $2, $3) RETURNING commentid, postid, userid, commentcontent',
    [postid, userid, commentContent],
    (error, result) => {
        if (error) {
            res.status(500).json({ error: error.message })
        } else {
            res.status(200).json({ commentid : result.rows[0].commentid, commentcontent: commentContent })
        }        
    })  
})

// WORK Edit a post
app.put('/update/:postid', (req,res) => {
    const pool = openDb()
    const postId = Number(req.params.postid); // Corrected
    const postContent = req.body.postcontent;
    pool.query('UPDATE posts SET postcontent = $1 WHERE postid = $2 RETURNING postid, postcontent', 
    [postContent, postId], 
    (error, result) => {
        if (error) {    
            res.status(500).json({ error: error.message })
        }
            res.status(200).json({ postid: result.rows[0].postid, postcontent: postContent })
    })
})

/*
postRouter.put('/posts/:postid', async (req, res) => {
    const postId = Number(req.params.postid); // Corrected
    const { postcontent } = req.body;

    try {
        const result = await query('UPDATE posts SET postcontent = $1 WHERE postid = $2 RETURNING postid, postcontent', [postcontent, postId]);
        //update posts set postcontent = 'hello tam' where postid = 1
        res.status(200).json({postid: result.rows[0].postid})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
*/


app.listen(port)


