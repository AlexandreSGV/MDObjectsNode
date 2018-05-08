// var Header = require('./Header');
// var Body = require('./Body');
// var ReplyBody = require('./ReplyBody');
// var ReplyHeader = require('./ReplyHeader');
// var RequestHeader = require('./RequestHeader');
// var RequestBody = require('./RequestBody');

class Header {
    
    constructor(magic, version, byteOrder, messageType, messageSize) {
        this.magic = magic;
        this.version = version;
        this.byteOrder = byteOrder;
        this.messageType = messageType;
        this.messageSize = messageSize;
    }
}
class Body {
    
    constructor(reqHeader, reqBody, repHeader, repBody) {
        this.reqHeader = reqHeader;
        this.reqBody = reqBody;
        this.repHeader = repHeader;
        this.repBody = repBody;
    }
}
class ReplyBody {
    
    constructor(operationResult) {
        this.operationResult = operationResult;
    }
}

class ReplyHeader {
    
    constructor(serviceContext, requestId,replyStatus) {
        this.serviceContext = serviceContext;
        this.requestId = requestId;
        this.replyStatus = replyStatus;
    }
}

class RequestBody {
    
    constructor(parameters) {
        this.parameters = parameters;
    }
}

class RequestHeader {
    
    constructor(context, requestId, responseExpected, objectID, invokerID, operation) {
        this.context = context;
        this.requestId = requestId;
        this.responseExpected = responseExpected;
        this.objectID = objectID;
        this.invokerID = invokerID;
        this.operation = operation;
    }
}

class Message {
    
    constructor(header, body) {
        this.header = header;
        this.body = body;
    }
}
module.exports = {Message, Header, Body, ReplyBody, ReplyHeader, RequestHeader, RequestBody}
