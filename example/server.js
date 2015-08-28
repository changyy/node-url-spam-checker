var sys = require('sys');
var url_spam_checker = require('..');

url_spam_checker.createServer(null, 8000, sys.log, sys.log);
