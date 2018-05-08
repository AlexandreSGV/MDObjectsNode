var ICalculator = require('./Interfaces/ICalculator');
var DistributionService = require('./Distribution/Client/DistributionService');

let distributionService = new DistributionService('localhost',3000);

let iCalculadora = new ICalculator();
let calculadora = distributionService.lookup('Calculator',iCalculadora);  

for (let i = 0; i < 500; i++) {
    console.log('[MainClient] 1+2 : ', calculadora.add(1,2));
    console.log('[MainClient] 3-1 : ', calculadora.sub(3,1));
    console.log('[MainClient] 3*4 : ', calculadora.mult(3,4));
    console.log('[MainClient] 8/2 : ', calculadora.div(8,2));    
} 