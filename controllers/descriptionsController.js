const sqlFactory = require('../factory/mysql.factory');

exports.createAppDescriptionByApiId = async (appDescription, apiId, request) => {
	const queryString = "INSERT INTO descriptions SET ?";
	const descriptionToInsert = {
		api_id: apiId,
		description: JSON.stringify(appDescription.description),
		is_json: appDescription.is_json
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
		description: JSON.stringify(descriptionData.description),
		is_json: descriptionData.is_json
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

exports.appExpectsJson = async (request, apiId) => {
  const queryString = "SELECT is_json FROM descriptions WHERE api_id = ?";

  try {
    const apiReturnsInJson = await sqlFactory.runQuery(request, queryString, apiId);
    return Boolean(apiReturnsInJson[0].is_json);
  } catch (error) {
    console.log("Couldn't load API return format");
  }
}
