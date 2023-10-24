const logEntry = require('./logEvents');
const EventEmitter = require('events');

class MyEvents extends EventEmitter{}

const emitter = new MyEvents();
emitter.addListener('log', msg => logEntry(msg));

setTimeout(()=>{
    emitter.emit('log', 'Log entry made!');
},2000);
