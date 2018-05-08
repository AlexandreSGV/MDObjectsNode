var Marshaller = require('./../Common/Marshaller');
const {Message, Header, Body, ReplyBody, ReplyHeader, RequestHeader, RequestBody } = require('./../Common/Message');
var uniqueInvokerID = (function() {
    var invId = 0; 
    return function() { return invId++; };  
 })();

 var uniqueObjectID = (function() {
    var objId = 0; 
    return function() { return objId++; };  
 })();

var objectsList = [];

class Invoker {   

    
    constructor() {
        this.invokerID = uniqueInvokerID();        
    }
    invoke(message){
        let objectID = message.body.reqHeader.objectID;
        let operation = message.body.reqHeader.operation;
        console.log('[Invoker]run oepration :', operation, 'objectID :',objectID);
        
        
        let calculadora = findObjectByKey(objectsList, 'objectID', objectID).objectInstance;
        console.log('[Invoker] invoke message', message);

        let parameters = message.body.reqBody.parameters;
        console.log('[Invoker] operation ',operation, 'parameters ', parameters);

        var result = calculadora[operation].apply(calculadora[operation], Array.prototype.slice.call(parameters, 0) );
        console.log('[Invoker] result ',result);

        
        let msgHeader = new Header("MIOP",0,false, 0, 0);
        let repHeader = new ReplyHeader("",0,0);
        let repBody = new ReplyBody(result);
        let msgBody = new Body(null, null, repHeader, repBody);
        let msgToBeMarshalled = new Message(msgHeader, msgBody);
        let msgMarshalled = Marshaller.marshall(msgToBeMarshalled);


        return msgMarshalled;
    }
    addObjectReference(objectInstance){
        let objectID = uniqueObjectID();
        objectsList.push({'objectInstance':objectInstance, 'objectID': objectID});
        return objectID;
    }
}
module.exports = Invoker

function findObjectByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
}