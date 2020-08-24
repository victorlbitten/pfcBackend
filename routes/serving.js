var express = require('express');
var App = express.Router();
var Serving = getmodule('controllers/servingController');

App.route('/xml')
  .get(Serving.getXml);

App.route('/json')
  .get(Serving.getJson);

module.exports = App;
