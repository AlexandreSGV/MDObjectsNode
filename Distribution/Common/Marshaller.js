class Marshaller {
    
    
    static marshall(msgToBeMarshalled){
        // console.log('[marshall] : ', msgToBeMarshalled);
        return JSON.stringify(msgToBeMarshalled);
    }

    static unmarshall(msgToBeUnmarshalled){
        // console.log('[unmarshall] : ', msgToBeUnmarshalled);
        return JSON.parse(msgToBeUnmarshalled);
    }
  }
  module.exports = Marshaller