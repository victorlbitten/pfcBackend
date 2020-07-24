var express = require('express');
var App = express.Router();
var Data = getmodule('controllers/dataController')

App.route('/')
  .get(Data.getData)

module.exports = App;
