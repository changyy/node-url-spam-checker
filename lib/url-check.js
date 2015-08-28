var url_checker = require(__dirname+'/url-check/');

module.exports = url_checker.check_domain;
module.exports.check_hostname = function check_hostname(BloomFilterObject, url) {
	return url_checker.check_hostname(BloomFilterObject, url);
}
module.exports.check_domain = function check_domain(BloomFilterObject, url) {
	return url_checker.check_domain(BloomFilterObject, url);
}
