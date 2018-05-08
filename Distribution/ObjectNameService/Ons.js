var ObjectRegistry = require('./ObjectRegistry');

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;


var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.post('/bind', function(req, res){
    console.log('[ONS] bin req.body',req.body);
    let serviceName = req.body.serviceName;
    let host = req.body.host;
    let port = req.body.port;
    let protocol = req.body.protocol;
    let objectID = req.body.objectID;
    let invokerID = req.body.invokerID;
    let registry = new ObjectRegistry(serviceName, host, port,protocol, objectID, invokerID);
    addToObjectRegistryTable(registry);
    res.status(200).send('Sucess bind: '+ serviceName);
});

app.post('/lookup', function(req, res){
    let serviceName = req.body.serviceName;
    console.log('[ONS][lookup] serviceName ' + serviceName);
    registry = findToObjectRegistryTable(serviceName);
    res.json(registry);
    res.end();
});

// app.get('/lookup', function(req, res){
//     let serviceName = req.param('serviceName');
//     console.log('[ONS][lookup] serviceName ' + serviceName);
//     registry = findToObjectRegistryTable(serviceName);
//     res.json(registry);
//     res.end();
// });


http.listen(port, function(){
  console.log('listening on *:' + port);
});


function addToObjectRegistryTable(registry) {

    var fs = require('fs');
    
    fs.readFile('ObjectRegistryTable.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log("ERROR: "+err);
        } else {
            
            obj = JSON.parse(data); 
            obj.table.push(registry); 
            json = JSON.stringify(obj); 
            fs.writeFile('ObjectRegistryTable.json', json, 'utf8',function(error) {
                if(error) { 
                  console.log('[File Save]: ' + err);                    
                } else {
                  console.log('[File Save]: success');                    
                }
              }); 
    }});
}

function findToObjectRegistryTable(serviceName) {
    var fs = require('fs');
    
    
    var data = fs.readFileSync('ObjectRegistryTable.json', 'utf8'); 
    obj = JSON.parse(data); 
    registry =  findObjectByKey(obj.table, 'serviceName', serviceName);
            
    return registry;
}
    

function findObjectByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
}