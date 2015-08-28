var 
	sys = require('sys'),
	path = require('path'),
	url_spam_checker = require(path.join(__dirname, '..', 'url-spam-checker'))
;

url_spam_checker.createServer([
	function handle_resource(callback){
		var ret = [];
		ret.push('tw.yahoo.com');
		ret.push('www.google.com.tw');
		callback(null, ret);
	}
], 8000, sys.log, sys.log);
