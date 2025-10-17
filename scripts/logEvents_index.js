// index.js
import { logEvents } from './logEvents.js';
import { EventEmitter } from 'events';

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on('log', (msg) => logEvents(msg));

setTimeout(() => {
  myEmitter.emit('log', 'Log event emitted');
}, 2000);

// import { format } from 'date-fns';
// import { v4 as uuid } from 'uuid';

// console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'));
// console.log(uuid());


// npm i <dep-name> --> installs libary as normal depedency. For e.g.: axios,express, mongoose
// npm i <dep-name> -D --> installs libary as 'dev' depedency For e.g.: jest, nodemon, eslint