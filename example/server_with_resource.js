var sys = require('sys');
var url_spam_checker = require('..');

url_spam_checker.createServer([
	function handle_resource(callback){
		var ret = [];
		ret.push('tw.yahoo.com');
		ret.push('www.google.com.tw');
		callback(null, ret);
	}
], 8000, sys.log, sys.log);
