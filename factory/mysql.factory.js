exports.runQuery = (requestHandler, queryString, parametersList = []) => {
  return new Promise ((resolve, reject) => {
    requestHandler.getConnection((connectionError, connection) => {
      if (connectionError) {reject(connectionError)}
      connection.query(queryString, parametersList, (queryError, result) => {
        (queryError)
          ? reject(queryError)
          : resolve(result);
      });
    });
  })
}