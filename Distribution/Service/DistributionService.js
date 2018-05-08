var ServerRequestHandler = require('./ServerRequestHandler');
var AOR = require('./../Common/AOR');
var syncrequest = require('sync-request');

class DistributionService {
    constructor(host,port) {
        this.host = host;
        this.port = port;
        this.server = new ServerRequestHandler('localhost',4000);
        this.server.run();
    }

    bind(serviceName, objectInstance){
        let ids = this.server.addService(objectInstance);
        let aor = new AOR(ids.invokerID,ids.objectID);
        let postData = aor;
        postData['serviceName'] = serviceName;
        console.log('[Service]Registry bind ', postData);
        var res = syncrequest('POST', 'http://'+this.host+':'+this.port+''+'/bind', {
            json: postData,
        });
        
    }
    
    
}
module.exports = DistributionService