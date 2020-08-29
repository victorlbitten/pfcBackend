var express = require('express');
var App = express.Router();
var Opc = getmodule('controllers/opcController');

App.route('/')
  .get(Opc.connectionTest);


module.exports = App;
