exports.get_url_resource = handle_url_resource;
exports.exmaple_fetch_url_resource = example_get_joewein_resource_part1;

function handle_url_resource(array_of_fetch_func, callback) {
	var fetch_funcs = [];
	if (array_of_fetch_func instanceof Array) {
		for(var i=0, cnt=array_of_fetch_func.length ; i<cnt ; ++i) {
			if (typeof(array_of_fetch_func[i] === 'function'))
				fetch_funcs.push(array_of_fetch_func[i]);
		}
	} else if (typeof(array_of_fetch_func) === 'function') {
		fetch_funcs.push(array_of_fetch_func);
	} else {
		fetch_funcs.push(example_get_joewein_resource_part1);
		fetch_funcs.push(example_get_joewein_resource_part2);
	}
	var async = require('async');
	async.parallel(fetch_funcs, function(error, data){ 
		var ret = [];
		for (var i=0, cnt=data.length ; i<cnt ; ++i) {
			if (!ret.length)
				ret = data[i];
			else
				ret = ret.concat(data[i]);
		}
		callback(ret);
	});
}

function example_get_joewein_resource_part1(cb) {
	var request = require('request');
	request('http://www.joewein.net/dl/bl/dom-bl-base.txt', function(error, response, body) {
		var ret = [];
		if (!error && response.statusCode == 200) {
			var lines = body.split("\n");
			for (var i=0, cnt = lines.length ; i<cnt ; ++i) {
				if (lines[i].length == 0)
					continue;
				var strip_index = lines[i].indexOf(';');
				if (strip_index > 0)
					ret.push(lines[i].substring(0, strip_index));
				else
					ret.push(lines[i]);
			}
		}
		cb(null, ret);
	});
}

function example_get_joewein_resource_part2(cb) {
	var request = require('request');
	request('http://www.joewein.net/dl/bl/dom-bl.txt', function(error, response, body) {
		var ret = [];
		if (!error && response.statusCode == 200) {
			var lines = body.split("\n");
			for (var i=0, cnt = lines.length ; i<cnt ; ++i) {
				if (lines[i].length == 0)
					continue;
				var strip_index = lines[i].indexOf(';');
				if (strip_index > 0)
					ret.push(lines[i].substring(0, strip_index));
				else
					ret.push(lines[i]);
			}
		}
		cb(null, ret);
	});
}
