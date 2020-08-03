
exports.map = (appDescription, dataFromApi) => {
  const assignableTypes = ['property', 'array'];
  const initialDescriptionKeys = Object.keys(appDescription);

  const mappingIteration = (mappedObject, descriptionKey, descriptionObject, rawDataOverride = null) => {
    const rawData = rawDataOverride || dataFromApi;
    const isAssignable = assignableTypes.includes(descriptionObject.type);
    
    if (isAssignable) {
      mappedObject[descriptionKey] = getNestedProperty(rawData, descriptionObject.mapping);
      return mappedObject[descriptionKey];
    }

    if (descriptionObject.type === 'object') {
      const newDescriptionKeys = Object.keys(descriptionObject.description);
      newDescriptionKeys.forEach((newKey) => {
        mappedObject[newKey] = mappingIteration({}, newKey, descriptionObject.description[newKey]);
      })
    }

    if (descriptionObject.type === 'object_array') {
      mappedObject = [];
      const rawDataObjects = getNestedProperty(rawData, descriptionObject.mapping);
      rawDataObjects.forEach((rawDataObject) => {
        const descriptionEntries = Object.entries(descriptionObject.description);
        const objectToInsert = {};
        descriptionEntries.forEach(([entryName, entryDescription]) => {
          if (entryName !== 'add') {
            const sliceUpToIndex = entryDescription.mapping.indexOf(descriptionObject.mapping[descriptionObject.mapping.length - 1]) + 1;
            entryDescription.mapping = entryDescription.mapping.slice(sliceUpToIndex);
            objectToInsert[entryName] = mappingIteration({}, entryName, entryDescription, rawDataObject);
          }
        })
        mappedObject.push(objectToInsert);
      })
    }

    return mappedObject;
  }


  return initialDescriptionKeys.reduce((mappedObject, currentKey) => {
    mappedObject[currentKey] = mappingIteration({}, currentKey, appDescription[currentKey]);
    return mappedObject;
  }, {})
}

function getNestedProperty (descriptionObject, mapToProperty) {
  return mapToProperty.reduce((reducedObject, currentStep) => {
    return (reducedObject[currentStep]);
  },
  descriptionObject);
}