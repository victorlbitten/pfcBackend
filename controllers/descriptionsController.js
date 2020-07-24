const sqlFactory = require('../factory/mysql.factory');

exports.createAppDescriptionByApiId = async (appDescription, apiId, request) => {
	const queryString = "INSERT INTO descriptions SET ?";
	const descriptionToInsert = {
		api_id: apiId,
		description: JSON.stringify(appDescription)
	};
	
	try {
		const result = await sqlFactory.runQuery(request, queryString, descriptionToInsert);
		return result;
	} catch (error) {
		console.log(["Couldn't create app description with log: ", error]);
		return error;
	}
}


exports.updateApplicationDescription = async (descriptionData, apiId, request) => {
	const queryString = "UPDATE descriptions SET ? where api_id = ?";
	const descriptionToInsert = {
		api_id: apiId,
		description: JSON.stringify(descriptionData)
	};
	const parametersList = [descriptionToInsert, apiId];
	
	await sqlFactory.runQuery(request, queryString, parametersList);
}


exports.deleteDescriptionByApiId = async (requestHandler, apiId) => {
	const queryString = "DELETE from descriptions WHERE api_id = ?";
	
	try {
		const result = await sqlFactory.runQuery(requestHandler, queryString, apiId);
		return result;
	} catch (error) {
		console.log(["Couldn't delete app description with log: ", error]);
		return error;
	}
}













exports.getApiDescriptionById = (apiId, requestHandler) => {
	const queryString = "SELECT description FROM descriptions WHERE api_id = ?";
	return new Promise((resolve, reject) => {
		requestHandler.getConnection((error, connection) => {
			connection.query(
				queryString,
				apiId,
				(queryError, result) => {
					if (queryError) {
						reject(queryError);
					}
					resolve(result[0]);
				}
			)
		});
	})
}

function _executeQueryAndReturn(
	requestHandler,
	responseHandler,
	queryString,
	parametersList = [],
	shouldParse = false
) {
	requestHandler.getConnection((error, connection) => {
		connection.query(
			queryString,
			parametersList,
			(queryError, result) => {
				if (queryError) {
					console.log(queryError);
					return responseHandler.status(400).json(queryError);
				}
				if (shouldParse) {
					const parsedDescriptions = result.map((currentDescription) => ({
						id: currentDescription.id,
						api_id: currentDescription.api_id,
						mapping: JSON.parse(currentDescription.mapping)
					}));
					return responseHandler.json(parsedDescriptions);
				}
				return responseHandler.send(result);
			})
	})
}
