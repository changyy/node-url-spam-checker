var 
	sys = require('sys'),
	path = require('path'),
	url_spam_checker = require(path.join(__dirname, '..', 'url-spam-checker'))
;

url_spam_checker.createServer(null, 8000, sys.log, sys.log);
