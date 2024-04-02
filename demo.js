require('dotenv').config()
//console.log(process.env)
const express = require('express')
const cors = require('cors')
//const { query } = require('./helpers/db.js');
const { postRouter } = require('./routes/posts.js');
const { commentRouter } = require('./routes/comments.js');

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use('/',postRouter)
app.use('/',commentRouter)

const port = process.env.PORT;

app.listen(port)


