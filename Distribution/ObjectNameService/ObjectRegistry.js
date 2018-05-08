class ObjectRegistry {
    constructor(serviceName,host,port,protocol,objectID,invokerID) {
        this.serviceName = serviceName;
        this.host = host; 
        this.port = port;    
        this.protocol = protocol;    
        this.objectID = objectID;
        this.invokerID = invokerID;
    }
  }
  module.exports = ObjectRegistry