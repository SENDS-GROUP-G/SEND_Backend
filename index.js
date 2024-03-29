require('dotenv').config();
const express = require('express');
const cors = require('cors');
const postRouter = require('./routes/post.js');
const commentRouter = require('./routes/comment.js')

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/posts', postRouter);
app.use('/', commentRouter);

const port = process.env.PORT;

app.listen(port);