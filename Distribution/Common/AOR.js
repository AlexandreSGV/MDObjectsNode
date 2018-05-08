
class AOR {
    constructor(invokerID,objectID) {
        this.host = 'localhost'; 
        this.port = 4000;
        this.invokerID = invokerID;
        this.protocol = 'miop';
        this.objectID = objectID;
    }
  }
  module.exports = AOR