const sqlFactory = require('../factory/mysql.factory');
const { query } = require('express');

exports.createApiDescriptionById = async (apiDescription, insertedApiId, request) => {
  const queryString = "INSERT INTO apisDescription SET ?";
  const apiDescriptionToInsert = {
    api_id: insertedApiId,
    description: JSON.stringify(apiDescription.description),
    is_json: apiDescription.is_json
  };

  try {
    const result = await sqlFactory.runQuery(request, queryString, apiDescriptionToInsert);
    return result;
  } catch (error) {
    console.log(["Error inserting API description with log: ", error]);
    return error;
  }
};


exports.updateApiDescription = async (apiDescription, apiId, request) => {
  const queryString = "UPDATE apisDescription SET ? where api_id = ?";
  const descriptionToInsert = {
    api_id: apiId,
    description: JSON.stringify(apiDescription.description),
    is_json: apiDescription.is_json
  };
  const parametersList = [descriptionToInsert, apiId];
  
  await sqlFactory.runQuery(request, queryString, parametersList);
}


exports.deleteApiDescriptionById = async (request, apiId) => {
  const queryString = "DELETE from apisDescription WHERE api_id = ?";
  
  try {
    const result = await sqlFactory.runQuery(request, queryString, apiId);
    return result;
  } catch (error) {
    console.log(["Error deleting API description with log: ", error]);
    return error;
  }
}

exports.apiReturnsInJson = async (request, apiId) => {
  const queryString = "SELECT is_json FROM apisDescription WHERE api_id = ?";

  try {
    const apiReturnsInJson = await sqlFactory.runQuery(request, queryString, apiId);
    return Boolean(apiReturnsInJson[0].is_json);
  } catch (error) {
    console.log("Couldn't load API return format");
  }
}

