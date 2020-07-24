// MAPEAMENTO SIMPLES - queremos mapear uma propriedade para outra, modificando ou mantendo o nome
// Resposta da API
  const user = {
    data: {
      name: 'Victor',
      age: 27
    }
  };
// Formato desejado
  const user = {
    userName: 'Victor',
    userAge: 27
  }
// Mapeamento
  const mapping = {
    "userName": ["user", "data", "name"],
    "userAge": ["user", "age"]
  }


  

// MAPEAMENTO CROSS-ORIGIN - combinar dados de diferentes chaves em uma nova
// Resposta da API
  const sensorInfo = {
    plant: {
      id: 3,
      name: 'Usina Pedra Negra',
      city: 'Belo horizonte',
      status: 2
    },
    sensor: {
      id: 48,
      name: 'NTC-10k',
      measure: {
        id: 3,
        meas_name: 'Temperature',
        range: [20, 80]
      },
    },
    last_hundred_measures: [1,2,3,4]
  }
// Formato desejado
  const essencialSensorInfoWithMeasures = {
    plant_name: 'Usina Pedra Negra',
    sensor: {
      id: 48,
      name: 'NTC-10k',
      measuring: 'Temperature',
      measures: [1,2,3,4]
    }
  }

// Mapeamento
  const mapping = {
    "plant_name": ["plant", "name"],
    "sensor": {
      "id": ["sensor", "id"],
      "name": ["sensor", "name"],
      "measuring": ["sensor", "meas_name"],
      "measures": ["last_hundred_measures"]
    }
  }

// MAPEAMENTO DE OBJETOS EM ARRAYS - O retorno da api é uma lista de objetos e queremos selecionar certas propriedades
// Retorno da API
  const sensorInfo = {
    plant: {
      id: 3,
      name: 'Usina Pedra Negra',
      city: 'Belo horizonte',
      status: 2
    },
    sensor: {
      id: 48,
      name: 'NTC-10k',
      measure: {
        id: 3,
        meas_name: 'Temperature',
        range: [20, 80]
      },
      last_hundred_measures: [
        {
          value: 27.6,
          timestamp: 1583409722,
          meas_quality: 1,
          prev_diff: true
        }
      ]
    }
  }
// Formato desejado
  const essencialSensorInfoWithMeasures = {
    plant_name: 'Usina Pedra Negra',
    sensor: {
      id: 48,
      name: 'NTC-10k',
      measuring: 'Temperature',
      measures: [
        {
          meas_value: 27.6,
          meas_timestamp: 1583409722
        }
      ]
    }
  }
// Mapeamento
  const mapping = {
    "plant_name": ["plant", "name"],
    "sensor": {
      "id": ["sensor", "id"],
      "name": ["sensor", "name"],
      "measuring": ["sensor", "meas_name"],
      "measures": {
        "dataRoute": ["measures"],
        "mappingRules": {
          "meas_value": ["value"],
          "meas_timestamp": ["timestamp"]
        },
        "filterBy": [
          "prev_diff === true",
          "mes_quality > 0"
        ]
      }
    }
  }

  const newMapping = {
    "userName": {
      "mapping": ["path1, path2"],
      "type": "property",
      "filters": []
    },
    "array": {
      "mapping": ["path1"],
      "type": "array",
      "filters": {}
    },
    "object": {
      "mapping": {
        "property1": {
          "mapping": ["path1"],
          "type": "property"
        },
        "property2": {
          "mapping": ["path2"],
          "type": "array"
        }
      },
      "type": "object"
    },
    "array_of_objects": {
      "mapping": {
        "property1": {
          "mapping": ["path1"],
          "type": "property"
        },
        "property2": {
          "mapping": ["path2"],
          "type": "array"
        }
      },
      "type": "object_array"
    }
  }

  const apiDescription = {
    "path1": {
      "type": {"adf": "int"}
    },
    "path3": {
      "type": "array"
    },
    "path2": {
      "type": "object",
      "properties": {
        "prop1": {
          "type": "property"
        },
        "prop2": {
          "type": "array"
        },
        "prop3": {
          "type": "object",
          "properties": [{
            "prop1": {
              "type": "property"
            }
          }]
        }
      }
    },
    "path4": {
      "type": "object_array",
      "properties": {
        "prop1": {
          "type": "array"
        },
        "prop2": {
          "type": "object",
          "properties": {
            "prop1": "property",
            "prop2": "array"
          }
        }
      }
    }
  }


  const mappingOnNewFormat = {
    "plant_name": {
      "type": "property",
      "mapping": ["plant", "name"]
    },
    "sensor": {
      "type": "object",
      "mapping": {
        "id": {
          "type": "property",
          "mapping": ["sensor", "id"]
        },
        "name": {
          "type": "property",
          "mapping": ["sensor", "name"]
        },
        "measuring": {
          "type": "property",
          "mapping": ["sensor", "meas_name"]
        },
        "measures": {
          "type": "object_array",
          "mapping": {
            "meas_value": {
              "type": "property",
              "mapping": ["measures", "value"]
            },
            "meas_timestamp": {
              "type": "property",
              "mapping": ["measures", "timestamp"]
            }
          }
        }
      }
    }
  }