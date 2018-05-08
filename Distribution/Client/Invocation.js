class Invocation {
    
    constructor(objectID, invokerID, host, port,operationName,parameters) {
        this.objectID = objectID;
        this.invokerID = invokerID;
        this.host = host;
        this.port = port;
        this.operationName = operationName;
        this.parameters = parameters;
    }
  }
  module.exports = Invocation