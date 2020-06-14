const express = require('express');
const Route = express.Router();

Route.get('/:id', (req, res)=>{
  res.send(req.params.id);
});
module.exports = Route;
