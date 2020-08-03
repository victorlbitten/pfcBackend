const axios = require('axios');
const apisController = require('./apisController');
const descriptionsController = require('./descriptionsController');
const mappingFunction = require('../factory/mappingFunction');
const sqlFactory = require('../factory/mysql.factory');

exports.getData = async (request, response) => {
	const { apiId } = request.body;

	const apiData = await makeRequestToApi(apiId, request);
	const appDescription = await getDescription(apiId, request);

	const mappedData = mappingFunction.map(appDescription, apiData);

	response.status(200).send({'1': mappedData, '2': appDescription});
}

async function makeRequestToApi (apiId, requestHandler) {
	const queryString = "SELECT url, method FROM apis WHERE id = ?";
	const { url: apiUrl, method: apiMethod } = (await sqlFactory.runQuery(requestHandler, queryString, apiId))[0];

	const requestConfig = {
		url: apiUrl,
		method: apiMethod
	};

	try {
		const dataFromApi = await axios(requestConfig);
		return dataFromApi;
	} catch (error) {
		console.log(error);
		return error;
	}
}

async function getDescription (apiId, requestHandler) {
	const queryString = "SELECT description FROM descriptions WHERE api_id = ?";
	const descriptionData = await sqlFactory.runQuery(requestHandler, queryString, apiId);
	return JSON.parse(descriptionData[0].description);
}
