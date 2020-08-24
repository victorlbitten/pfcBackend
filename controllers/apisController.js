const { query } = require("express");
const descriptionsController = require('./descriptionsController');
const apiDescriptionsController = require('./apiDescriptionsController');
const sqlFactory = require('../factory/mysql.factory');

exports.getAllApis = async (request, response) => {
    const queryString = 'SELECT * FROM apis';
    try {
      const apisData = await sqlFactory.runQuery(request, queryString);
      response.status(200).send(apisData);
    } catch (error) {
      console.log(["Couldn't get all APIs. Error log: ", error]);
      response.status(400).send(error);
    }
  }


  exports.createApi = async (request, response) => {
    const { api, appDescription, apiDescription } = request.body;
    const queryString = "INSERT INTO apis SET ?";

    try {
      const { insertId } = await sqlFactory.runQuery(request, queryString, api);
      await descriptionsController.createAppDescriptionByApiId(appDescription, insertId, request);
      await apiDescriptionsController.createApiDescriptionById(apiDescription, insertId, request);
    } catch (error) {
      console.log(["Couldn't create API. Log error: ", error]);
      response.status(400).send(error);
    }
  }


  exports.updateApi = async (request, response) => {
    const queryString = "UPDATE apis SET ? where id = ?";
    const apiId = request.params.id;
    const {api: apiData, appDescription, apiDescription} = request.body;

    try {
      await apiDescriptionsController.updateApiDescription(apiDescription, apiId, request);
      await descriptionsController.updateApplicationDescription(appDescription, apiId, request);
      const updatedElement = await sqlFactory.runQuery(request, queryString, [apiData,apiId]);

      response.status(200).send(updatedElement);
    } catch (error) {
      
    }
  }


  exports.deleteApi = (request, response) => {
    const apiId = parseInt(request.params.id);

    const deleteAppDescription = async () => {
      try {
        await descriptionsController.deleteDescriptionByApiId(request, apiId);
      } catch (error) {
        response.status(400).send(error);
      }
    }

    const deleteApiDescription = async () => {
      try {
        await apiDescriptionsController.deleteApiDescriptionById(request, apiId);
      } catch (error) {
        response.status(400).send(error);
      }
    }

    const deleteApiDetails = async () => {
      const queryString = "DELETE FROM apis WHERE id = ?";
      await sqlFactory.runQuery(request, queryString, apiId);

      response.status(200).send('deleted');
    }

    deleteAppDescription();
    deleteApiDescription();
    deleteApiDetails();
  }


  exports.getDescriptionByApiId = async (request, response) => {
    const apiId = request.params.id;
    const queryString = "SELECT * from descriptions WHERE api_id = ?";
    
    try {
      const result = await sqlFactory.runQuery(request, queryString, apiId);
      response.status(200).send(result);
    } catch (error) {
      console.log(["Couldn't load Application description with log: ", error]);
      response.status(400).send(result);
    }
  }


  exports.getApiDescriptionById = async (request, response) => {
    const apiId = request.params.id;
    const queryString = "SELECT * FROM apisDescription WHERE api_id = ?";

    try {
      const result = await sqlFactory.runQuery(request, queryString, apiId);
      response.status(200).send(result);
    } catch (error) {
      console.log(["Couldn't load API description with log: ", error]);
      response.status(400).send(result);
    }
  }