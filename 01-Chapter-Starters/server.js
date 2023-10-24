const os = require('os');
const path = require('path');
//const math = require('./math');
//OR
const {add, subtract, multiply, divide, random} = require('./math');


//console.log(global);
console.log('__dirname - ',__dirname);
console.log('__filename - ', __filename);
console.log('=======================================================');


console.log('os.homedir() - ', os.homedir());
console.log('os.hostname() - ' ,os.hostname());
console.log('os.platform() - ' , os.platform());
console.log('=======================================================');

console.log('path.dirname(__filename) - ' , path.dirname(__filename));
console.log('path.basename(__filename) - ' , path.basename(__filename));
console.log('path.extname(__filename) - ' , path.extname(__filename));

console.log('=======================================================');

console.log("math.add(42,6) - ",add(42,6));
console.log("math.subtract(42,6) - ",subtract(42,6));
console.log("math.multiply(42,6) - ",multiply(42,6));
console.log("math.divide(42,6) - ",divide(42,6));

