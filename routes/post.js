const express = require('express');
const { query } = require('../helpers/db.js');

const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
  console.log('123');

  try {
    const result = await query('SELECT * FROM posts');
    const rows = result.rows ? result.rows: [];
    res.status(200).json(rows);
  } catch (error) {
      res.status(500).json({ error: error.message });
    }  
  })

  module.exports = postRouter  