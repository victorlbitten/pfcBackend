const sqlFactory = require('../factory/mysql.factory');
// const opcClient = require('node-opcua');
const { OPCUAClient, MessageSecurityMode, SecurityPolicy, AttributeIds } = require('node-opcua');


exports.connectionTest = async (request, response) => {
  const connectionStrategy = {
    initialDelay: 1000,
    maxRetry: 1
  };
  const options = {
    applicationName: "MyClient",
    connectionStrategy: connectionStrategy,
    securityMode: MessageSecurityMode.None,
    securityPolicy: SecurityPolicy.None,
    endpoint_must_exist: false
  };
  const endPoint = "opc.tcp://localhost:4840/";
  const client = OPCUAClient.create(options);

  try {
    await client.connect(endPoint);
    const session = await client.createSession();
    console.log('session created');
    const dummyValue = 0;
    const nodeToRead = {
      nodeId: "ns=1;i=2345",
      attributeId: AttributeIds.Value
    };
    const dataValue = await session.read(nodeToRead, dummyValue);
    response.send(dataValue);
  } catch (error) {
    console.log(error);
  }
}

exports.readFromOpcServer = async (opcEndpoint, nodeToRead) => {
  const connectionStrategy = {
    initialDelay: 1000,
    maxRetry: 1
  };
  const options = {
    applicationName: "MyClient",
    connectionStrategy: connectionStrategy,
    securityMode: MessageSecurityMode.None,
    securityPolicy: SecurityPolicy.None,
    endpoint_must_exist: false
  };
  // const endPoint = "opc.tcp://localhost:4840/";
  const client = OPCUAClient.create(options);

  try {
    await client.connect(opcEndpoint);
    const session = await client.createSession();
    console.log('session created');
    const dummyValue = 0;
    const nodeToRead = {
      nodeId: nodeToRead,
      attributeId: AttributeIds.Value
    };
    const dataValue = await session.read(nodeToRead, dummyValue);
    return dataValue;
  } catch (error) {
    console.log(error);
  }
}
