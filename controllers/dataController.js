const axios = require('axios');
const parser = require('xml2json');
const apisController = require('./apisController');
const descriptionsController = require('./descriptionsController');
const apiDescriptionsController = require('./apiDescriptionsController');
const mappingFunction = require('../factory/mappingFunction');
const sqlFactory = require('../factory/mysql.factory');

exports.getData = async (request, response) => {
	const { apiId } = request.body;

	const [apiReturnsInJson, appExpectsJson] = await getFormats(apiId, request);
	const apiData = await makeRequestToApi(apiId, apiReturnsInJson, request);
	const appDescription = await getDescription(apiId, request);

	const mappedData = mappingFunction.map(appDescription, apiData);

	const mappedAndParsedData = (appExpectsJson)
		? mappedData
		: parser.toXml(mappedData)

	response.status(200).send(mappedAndParsedData);
}

async function makeRequestToApi (apiId, apiReturnsInJson, requestHandler) {
	const queryString = "SELECT url, method FROM apis WHERE id = ?";
	const { url: apiUrl, method: apiMethod } = (await sqlFactory.runQuery(requestHandler, queryString, apiId))[0];

	const requestConfig = {
		url: apiUrl,
		method: apiMethod
	};

	try {
		const dataFromApi = await axios(requestConfig);
		return (apiReturnsInJson)
			? dataFromApi
			: parser.toJson(dataFromApi.data, {object: true})
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

async function getFormats (apiId, requestHandler) {
	const apiReturnsInJson = await apiDescriptionsController.apiReturnsInJson(requestHandler, apiId);
	const appExpectsJson = await descriptionsController.appExpectsJson(requestHandler, apiId);
	
	return [apiReturnsInJson, appExpectsJson];
}
