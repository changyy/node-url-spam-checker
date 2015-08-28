var
	http = require('http'), 
	url = require('url'),
	url_check = require('../url-check/')
;

exports.createServer = create_http_server;

function create_http_server(BloomFilterObject, port, start_server_callback, request_log_callback) {
	var server_port = port || 8000;
	var server = http.createServer(function(request, response) {
		if (request_log_callback)
			request_log_callback('Request received.');
		var found = false;
		var urlObj = url.parse(request.url, true);
		if (urlObj.query["url"] && url_check.check_hostname(BloomFilterObject, urlObj.query["url"]) ) {
			response.writeHead(200, {"Content-Type": "text/plain"});
			response.write('FOUND');
			if (request_log_callback)
				request_log_callback('FOUND: '+urlObj.query["url"]);
		} else {
			response.writeHead(404, {"Content-Type": "text/plain"});
			response.write('NOT FOUND');
			if (request_log_callback)
				request_log_callback('NOT FOUND: '+urlObj.query["url"]);
		}
		response.end();
	}).listen(server_port, function(){
		if (start_server_callback)
			start_server_callback('Service Running at ' + (server_port) + ' Port');
	});
	return server;
}
