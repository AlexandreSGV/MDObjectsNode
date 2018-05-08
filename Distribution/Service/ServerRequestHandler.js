var Invoker = require('./Invoker');
var Marshaller = require('./../Common/Marshaller');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 4000;
var bodyParser = require('body-parser');
var invokers = []

class ServerRequestHandler {
    constructor() {
    }

    run (){

        app.use(bodyParser.json()); // support json encoded bodies
        app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

        app.post('/execute', function(req, res){
            console.log(req.body);

            let message = Marshaller.unmarshall(req.body.message);

            let invokerID = message.body.reqHeader.invokerID;
            let invoker = findObjectByKey(invokers,'invokerID',invokerID);
            let replyMessage = invoker.invoke(message);

            res.json(replyMessage);
            res.end();
        });


        http.listen(port, function(){
        console.log('listening on *:' + port);
        });
    }

    addService(objectInstance){
        let invoker = new Invoker();
        let objectID = invoker.addObjectReference(objectInstance);
        invokers.push(invoker);
        console.log({'invokerID' : invoker.invokerID , 'objectID' : objectID});
        return {'invokerID' : invoker.invokerID , 'objectID' : objectID};
    }
   

}
module.exports = ServerRequestHandler

function findObjectByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
}