var ClientRequestHandlerSync = require('./ClientRequestHandlerSync');
var Marshaller = require('./../Common/Marshaller');
const {Message, Header, Body, ReplyBody, ReplyHeader, RequestHeader, RequestBody } = require('./../Common/Message');

exports.invoke = function(invocation){
        
        // console.log('[Requestor] invoke Host: ',invocation.host, ' Port : ',invocation.port);
        let crh = new ClientRequestHandlerSync(invocation.host, invocation.port);
        // creating message
        let msgHeader = new Header("MIOP",0,false, 0, 0);
        let reqHeader = new RequestHeader("",0,true,invocation.objectID, invocation.invokerID ,invocation.operationName);
        let reqBody = new RequestBody(invocation.parameters);
        let msgBody = new Body(reqHeader, reqBody, null, null);
        let msgToBeMarshalled = new Message(msgHeader, msgBody);
        
        // Marshalling message
        let msgMarshalled = Marshaller.marshall(msgToBeMarshalled);
        
        // sending message to the service server and wait response. [Synchronous]
        let responseMarshalled = crh.send(msgMarshalled);
        
        // Unmarshalling message
        let responseUnmarshalled = Marshaller.unmarshall(responseMarshalled);
        let operationResult = responseUnmarshalled.body.repBody.operationResult;
        // console.log('[Requestor] invoke operationResult: ',operationResult);
        return operationResult;
    
}
