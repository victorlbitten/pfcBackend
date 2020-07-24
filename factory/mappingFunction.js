exports.map = (apiReturn, mappingProperties) => {
  return mapApiToApp(mappingProperties, apiReturn);
  
  function mapApiToApp(mappingProperties, apiReturn) {
    const mappingKeys = Object.keys(mappingProperties);
    const mappingValues = Object.values(mappingProperties);
    return mappingKeys.reduce((returnVariable, key, index) => {
      const mapRoute = mappingValues[index];
      if (!Array.isArray(mapRoute)) {
        if (mapRoute.dataRoute) {
          const routeToArray = mapRoute.dataRoute;
          const listOfItemsToMap = (routeToArray[0] === "")
            ? apiReturn
            : routeToArray.reduce((list, route) => list[route], apiReturn);
          returnVariable[key] = listOfItemsToMap.map((item) => mapApiToApp(mapRoute.mappingRules, item));
        } else {
          returnVariable[key] = mapApiToApp(mapRoute, apiReturn);
        }
      }
      else {
        returnVariable[key] = mapRoute.reduce((returnObject, point) => {
          return returnObject[point];
        }, apiReturn)
      }
      return returnVariable;
    }, {})
  }
}