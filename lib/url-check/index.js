var url = require('url');

exports.check_hostname = check_hostname;
exports.check_domain = check_domain;

function check_hostname(BloomFilterObject, raw) {
	var raw_obj = url.parse(raw);
	var hostname = raw_obj.hostname || raw;
	if (BloomFilterObject.test(hostname))
		return hostname;
	return null;
}

function check_domain(BloomFilterObject, raw) {
	var raw_obj = url.parse(raw);
	var hostname = raw_obj.hostname || raw;
	if (BloomFilterObject.test(hostname))
		return hostname;
	var at = 0;
	while(hostname.length > 0 && (at = hostname.indexOf('.')) > 0 && hostname.indexOf('.', at + 1) > 0 ) {
		hostname = hostname.substring(at + 1);
		if (BloomFilterObject.test(hostname))
			return hostname;
	}
	return null;
}
