require('dotenv').config()
//console.log(process.env)
const express = require('express')
const cors = require('cors')
const { query } = require('./helpers/db.js');

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}));

const port = process.env.PORT;

// *WORK* Get all posts and username
app.get("/", async(req, res) => {
    console.log(query)
    try {
        const result = await query('SELECT posts.postid, posts.userid, users.username, posts.postcontent FROM posts INNER JOIN users ON posts.userid = users.userid')
        const rows = result.rows ? result.rows : []
        res.status(200).json(rows)
    } catch (error) {
        console.log(error)
        res.statusMessage = error
        res.status(500).json({error: error})
    }
})

// *WORK* Get a specified post by postid and username
app.get("/search/postid=:postid", async(req, res) => {
    try {
        const postId = parseInt(req.params.postid);
        const result = await query('SELECT posts.postid, posts.userid, users.username, posts.postcontent FROM posts INNER JOIN users ON posts.userid = users.userid WHERE posts.postid=$1',
        [postId]);
        const rows = result.rows ? result.rows : [];
        res.status(200).json(rows);
    } catch (error) {
        res.statusMessage = error
        res.status(500).json({error: error})
    }
})

// *WORK* Create new post
app.post("/userid=:userid/newpost", async(req,res) => {
    try {
        const userId = parseInt(req.params.userid);
        const postContent = req.body.postcontent;
        const result = await query('INSERT INTO posts (userid, postcontent) VALUES ($1, $2) RETURNING postid, postcontent, userid',
        [userId, postContent]);
        const rows = result.rows ? result.rows : [];
        res.status(200).json({ postid : rows[0].postid , userid: userId , postcontent: postContent })
    } catch (error) {
        console.log(error)
        res.statusMessage = error
        res.status(500).json({error: error.message})
    }
})

// *WORK* Get all comments
app.get("/allcomments", async(req, res) => {
    try {
        const result = await query('SELECT * FROM comments');
        const rows = result.rows ? result.rows : [];
        res.status(200).json(rows)
    } catch (error) {
        res.statusMessage = error;
        res.status(500).json({error : error});
    }
})

// *WORK* Create new comment
app.post("/userid=:userid/postid=:postid/newcomment", async(req, res) => {
    try {
        const userId = parseInt(req.params.userid);
        const postId = parseInt(req.params.postid);
        const commentContent = req.body.commentcontent;
        const result = await query('INSERT INTO comments (postid, userid, commentcontent) VALUES ($1, $2, $3) RETURNING commentid, postid, userid, commentcontent',
        [postId, userId, commentContent]);
        const rows = result.rows ? result.rows : [];
        res.status(200).json({ commentid : rows[0].commentid, commentcontent: commentContent })
    } catch (error) {
        res.statusMessage = error;
        res.status(500).json({ error : error });
    }
})

// *WORK* Edit a post
app.put("/edit/postid=:postid", async(req, res) => {
    try {
        const postId = parseInt(req.params.postid);
        const { postcontent } = req.body;
        const result = await query('UPDATE posts SET postcontent = $1 WHERE postid = $2 RETURNING postid, postcontent',
        [postcontent, postId])
        const rows = result.rows ? result.rows : [];
        res.status(200).json({ postid: rows[0].postid, postcontent: postcontent })
    } catch (error) {
        res.statusMessage = error;
        res.status(500).json({ error : error })
    }
})

// *WORK* Edit a comment
app.put("/edit/commentid=:commentid", async(req, res) => {
    try {
        const commentId = parseInt(req.params.commentid);
        const commentContent = req.body.commentcontent;
        const result = await query('UPDATE comments SET commentcontent = $1 WHERE commentid = $2 RETURNING commentid, commentcontent',
        [commentContent, commentId])
        const rows = result.rows ? result.rows : [];
        res.status(200).json({ commentid: rows[0].commentid, commentcontent: commentContent })
    } catch (error) {
        res.statusMessage = error;
        res.status(500).json({ error : error })
    }
})

// *WORK* Delete a post
app.delete("/delete/postid=:postid", async(req, res) => {
    try {
        const postId = parseInt(req.params.postid);
        const result = await query('DELETE FROM posts WHERE postid = $1',
        [postId])
        res.status(200).json({ postid: postId })
    } catch (error) {
        console.log(error);
        res.statusMessage = error;
        res.status(500).json({ error : error })
    }
})

// *WORK* Delete a comment
app.delete("/delete/commentid=:commentid", async(req, res) => {
    try {
        const commentId = parseInt(req.params.commentid);
        const result = await query('DELETE FROM comments WHERE commentid = $1',
        [commentId])
        res.status(200).json({ commentid: commentId })
    } catch (error) {
        console.log(error);
        res.statusMessage = error;
        res.status(500).json({ error : error })
    }
})

app.listen(port)


