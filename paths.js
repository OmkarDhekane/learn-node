// how node is different from vanilla JS
    // node is a JAVASCRIPT RUNTIME
    // node runs on server and not the browser
    // console is in terminal window
    // there is global obj (instead of window object). some props of both overlapp

console.log("Hello World!")
console.log(global)

const os = require('os');
const path = require('path');
const {add} = require('./math')


console.log(os.type())
console.log(os.version())
console.log(os.homedir())

console.log(__dirname)
console.log(__filename)

console.log(path.dirname(__filename))
console.log(path.basename(__filename))
console.log(path.extname(__filename))


console.log(path.parse(__filename))

console.log(add(2,4))