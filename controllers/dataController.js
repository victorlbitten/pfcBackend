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
	const queryString = "SELECT url FROM apis WHERE id = ?";
	const url = await sqlFactory.runQuery(requestHandler, queryString, apiId);

	//TODO: make request

	const mockedApiData = {
		data: {
			user: {
				name: 'Victor',
				grades: [1,2,3,4],
				sisters: [
					{
						name:'isadora', age:29, test: {hahatest: 'isa'}, pets: ['gato', 'catioro']
					},
					{
						name:'ligia',age:25, test: {hahatest: 'liginha'}, pets: ['gato', 'catioro', 'passarito']
					}
				]
			}
		}
	};

	return mockedApiData;
}

async function getDescription (apiId, requestHandler) {
	const queryString = "SELECT description FROM descriptions WHERE api_id = ?";
	const descriptionData = await sqlFactory.runQuery(requestHandler, queryString, apiId);
	return JSON.parse(descriptionData[0].description);
}

async function getApiDescription (apiId, requestHandler) {
	const queryString = "SELECT description FROM apisDescription WHERE api_id = ?";
	const descriptionData = await sqlFactory.runQuery(requestHandler, queryString, apiId);

	return JSON.parse(descriptionData[0].description);
}