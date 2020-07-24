var express = require('express');
var App = express.Router();
var Descriptions = getmodule('controllers/descriptionsController');

// App.route('/')
//   .get(Descriptions.getAllDescriptions)
//   .delete(Descriptions.deleteAllDescriptions)
//   .post(Descriptions.createDescription);

// App.route('/:id')
//   .get(Descriptions.getDescriptionById)
//   .delete(Descriptions.deleteDescriptionById)
//   .put(Descriptions.updateDescriptionById);


module.exports = App;
