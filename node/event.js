//例子1
var fs = require("fs");
fs.readFile('text.txt',
function(err, data) {
    if (err) return console.error(err);
    console.log(data.toString());
    console.log("end");
    console.log("***********************");
});
//例子2
var events = require("events");
var eventEmitter = new events.EventEmitter();
var connectHandler = function connected() {
    console.log("connnect successfully !");
    eventEmitter.emit("after_connect");
}
eventEmitter.on("connected", connectHandler);
eventEmitter.on('after_connect',
function() {
    console.log("after connect");
});
eventEmitter.emit("connected");
console.log("event emitter end");