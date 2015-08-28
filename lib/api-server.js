var api_server = require('./api-server/');

module.exports = api_server.createServer;
module.exports.createServer = function createServer(BFObj, port, status_cb, request_cb) {
	return new api_server.createServer(BFObj, port, status_cb, request_cb);
}
