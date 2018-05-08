// var AOR = require('./../Common/AOR');
// var ServerRequestHandler = require('./ServerRequestHandler');
// var Registry = require('./Registry');
var DistributionService = require('./Distribution/Service/DistributionService');
var CalculatorImpl = require('./Apps/CalculatorImpl');
var SciCalculatorImpl = require('./Apps/SciCalculatorImpl');




let distributionService = new DistributionService('localhost',3000);


let calculadora = new CalculatorImpl();
distributionService.bind('Calculator', calculadora);

let sciCalculatorImpl = new SciCalculatorImpl();
distributionService.bind('SciCalculator', sciCalculatorImpl);

