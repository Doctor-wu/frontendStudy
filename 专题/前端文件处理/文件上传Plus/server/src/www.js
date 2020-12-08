"use strict";
exports.__esModule = true;
var app_1 = require("./app");
var http_1 = require("http");
var port = process.env.PORT || 8000;
var server = http_1["default"].createServer(app_1["default"]);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
function onError(error) {
    console.error(error);
}
function onListening() {
    console.log('Listening on ' + port);
}
//# sourceMappingURL=www.js.map