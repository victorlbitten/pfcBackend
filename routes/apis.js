var express = require('express');
var App = express.Router();
var Apis = getmodule('controllers/apisController');

App.route('/')
  .get(Apis.getAllApis)
  .post(Apis.createApi);

App.route('/:id')
  .delete(Apis.deleteApi)
  .put(Apis.updateApi);

App.route('/:id/app-description')
  .get(Apis.getDescriptionByApiId);

App.route('/:id/description')
  .get(Apis.getApiDescriptionById);

module.exports = App;
