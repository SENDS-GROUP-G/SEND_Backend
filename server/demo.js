require('dotenv').config()
//console.log(process.env)
const express = require('express')
const cors = require('cors')
//const { query } = require('./helpers/db.js');
const { sendsRouter } = require('./routes/sends.js');

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use('/',sendsRouter)

const port = process.env.PORT;

app.listen(port)


