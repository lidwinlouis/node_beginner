
const {format} = require ('date-fns');
const { v4 : uuid } = require('uuid');

console.log("Using date-fns format() - ", format(new Date(), 'dd-MM-yyyy\tHH:mm:ss'));
console.log(uuid());