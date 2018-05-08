
var querystring = require('querystring');
var Invocation = require('./Invocation');
var Requestor = require('./Requestor');
var http = require('http');

exports.getObjectProxy = function(serviceName, host, port, protocol, objectID, invokerID, objectInterface) {
    // console.log('[ClientProxyService] ',serviceName, host, port, objectID);
    

    console.log('[ClientProxyService] antes callback ...');
    return new Proxy(objectInterface, {
        get: function(target, name, receiver) {
            if (name in target.__proto__) { // assume methods live on the prototype
                return function(...args) {
                    var methodName = name;
                    let invocation = new Invocation(objectID,invokerID, host, port, methodName,args); 
                    // console.log('[ClientProxyService] invocation : ',invocation);
                    let result = Requestor.invoke(invocation);
                    
                    return result;
                };
            } else { // assume instance vars like on the target
                return Reflect.get(target, name, receiver);
            }
        }
    });
    // console.log('[ClientProxyService] após callback ...');
    // return proxy;
}