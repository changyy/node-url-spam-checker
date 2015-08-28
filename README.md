URL SPAM CHECKER
================

Simple URL checker

Usage
-----
	$ vim test.js
	var sys = require('sys');
	var url_checker = require('url-spam-checker');
	url_spam_checker.createServer([
		function handle_resource(callback){
			var ret = [];
			ret.push('yahoo.com');
			ret.push('www.google.com.tw');
			callback(null, ret);
		}
	], 8000, sys.log, sys.log);

	$ nodejs test.js

	$ curl http://localhost:8000/?url=http://yahoo.com
	$ curl http://localhost:8000/?url=http://tw.yahoo.com
