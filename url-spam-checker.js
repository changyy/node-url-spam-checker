(function(exports) {
	var
		api_server = require('./lib/api-server'), 
		url_resource = require('./lib/url-resource'),
		bf = require('bloomfilter')
	;
	exports.BloomFilterObject;
	exports.createServer = create_api_server;

	function create_api_server(url_resource_funcs, port, status_report_callback, request_report_callback) {
		url_resource(url_resource_funcs, function(data) {
			exports.BloomFilterObject = new bf.BloomFilter(
				data.length * 256 , 
				8
			);
			for (var i=0, cnt=data.length; i<cnt ; ++i)
				exports.BloomFilterObject.add(data[i]);
			if (status_report_callback)
				status_report_callback('pattern loaded: ' + data.length);
			exports.api_server_instance = api_server.createServer(exports.BloomFilterObject, port, status_report_callback, request_report_callback);
		});
	}
})(typeof exports !== "undefined" ? exports : this);
