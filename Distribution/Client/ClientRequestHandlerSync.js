var syncrequest = require('sync-request');
class ClientRequestHandlerSync {
    
    constructor(host, port){
        this.host = host;
        this.port = port;
    }
    
    
    send(msgMarshalled){
        // console.log('[ClientRequestHandler] host:', this.host,' Port: ', this.port);
        let postData = {'message':msgMarshalled};
        
        
        var res = syncrequest('POST', 'http://'+this.host+':'+this.port+''+'/execute', {
            json: postData,
        });
        var result = JSON.parse(res.getBody('utf8'));
        // console.log('[ClientRequestHandler] result:', result);
        return result;
    }
}
module.exports = ClientRequestHandlerSync
