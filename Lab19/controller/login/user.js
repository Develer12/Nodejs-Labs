const express = require('express');
const Route = express.Router();
const userModel = require(__dirname + '/../../model/users');


Route.get('/:id', (req, res)=>{
  res.send(userModel.getById(req.params.id));
});

Route.get('/', (req, res)=>{
  res.send(userModel.gelAll());
  console.log('da');
});

module.exports = Route;
