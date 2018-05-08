var syncrequest = require('sync-request');
var ClientProxyService = require('./ClientProxyService');

class DistributionService {
    constructor(host,port) {
        this.host = host;
        this.port = port;
    }

    lookup(serviceName,objectInterface) { 

         let postData =  {'serviceName':serviceName};
                
         let res = syncrequest('POST', 'http://'+this.host+':'+this.port+''+'/lookup', {
             json: postData,
         });
         let serviceData = JSON.parse(res.getBody('utf8'));
         console.log('[DistributionService] serviceData:', serviceData);

         
         let objectProxy = ClientProxyService.getObjectProxy(serviceData.serviceName, serviceData.host, serviceData.port, serviceData.protocol, serviceData.objectID, serviceData.invokerID,objectInterface);
         return objectProxy;
    }
}
module.exports = DistributionService