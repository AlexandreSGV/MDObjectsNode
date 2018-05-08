var ISciCalculator = require('./Interfaces/ISciCalculator');
var DistributionService = require('./Distribution/Client/DistributionService');

let distributionService = new DistributionService('localhost',3000);

let iSciCalculadora = new ISciCalculator();
let sciCalculadora = distributionService.lookup('SciCalculator',iSciCalculadora);  

for (let i = 0; i < 1000; i++) {
    console.log('[MainClient] pow(2) : ', sciCalculadora.pow(2));
    console.log('[MainClient] sqrt(9) : ', sciCalculadora.sqrt(9));    
} 