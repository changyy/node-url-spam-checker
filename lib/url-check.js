var url_checker = require('./url-check/');

module.exports = url_checker.check_hostname;
module.exports.check_hostname = function check_hostname(BloomFilterObject, url) {
	return url_checker.check_hostname(BloomFilterObject, url);
}
