const parser = require('xml2json');

const dataToReturn = {
    user:{
      name: 'Victor',
      age: 27
  }
}

exports.getXml = (request, response) => {
  response.send(parser.toXml(dataToReturn));
}

exports.getJson = (request, response) => {
  response.send(dataToReturn);
}

