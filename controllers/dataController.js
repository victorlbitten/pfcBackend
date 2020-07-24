const axios = require('axios');
const apisController = require('./apisController');
const descriptionsController = require('./descriptionsController');
const mappingFunction = require('../factory/mappingFunction');

exports.getData = async function (request, response) {
	const apiName = request.query.name;
	// TODO: Modificar quando suporte a autenticação
	const authToken = request.headers.authorization || null;

	apisController.getApiDataByName(apiName, request)
		.then(async ({ id: apiId, url, method }) => {
			const rawDataFromApi = await requestDataFromApi(method, authToken, url);
			const {mapping: unparsedMappingProperties} = await descriptionsController
				.getMappingByApiId(apiId, request);
			const mappingProperties = JSON.parse(unparsedMappingProperties);

			const mappedData = mappingFunction.map(rawDataFromApi, mappingProperties);
			response.send(mappedData);
		})
		.catch((error) => {
			return response.status(400).json(error);
		});
}

function requestDataFromApi(method, authToken, url) {
	const authConfig = {Authorization: authToken}
	return new Promise(resolve => {
		const requestOptions = {
			method,
			headers: authConfig,
			url
		};
		axios(requestOptions)
			.then(({ data: apiResponse }) => {
				resolve(apiResponse);
			})
			.catch((error) => console.log(error));
	})
}