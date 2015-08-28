var
	vows = require("vows"),
	assert = require("assert")
;

var suite = vows.describe("url-spam-checker");
suite.addBatch(
	{
		"url_check": function() {
			var
				path = require('path'),
				url_check = require( path.join(__dirname, '..', 'lib/url-check') ),
				bf = require('bloomfilter')
			;
			var data = [
				'yahoo.com',
				'google.com.tw',
			];
			var bloom = new bf.BloomFilter(
				data.length * 256 , 
				8
			);
			assert.equal( url_check.check_domain(bloom, 'yahoo.com'), null );
			for (var i=0, cnt=data.length; i<cnt ; ++i)
				bloom.add(data[i]);
			assert.equal( url_check.check_domain(bloom, 'yahoo.com') != null, true );
			assert.equal( url_check.check_domain(bloom, 'yahoo.com'), 'yahoo.com' );
			assert.equal( url_check.check_domain(bloom, 'tw.yahoo.com'), 'yahoo.com' );
			assert.equal( url_check.check_domain(bloom, 'yahoo.com.tw'), null );
			assert.equal( url_check.check_domain(bloom, 'google.com'), null );
			assert.equal( url_check.check_domain(bloom, 'google.com.tw'), 'google.com.tw');
			assert.equal( url_check.check_domain(bloom, 'www.google.com.tw'), 'google.com.tw');
			assert.equal( url_check.check_domain(bloom, 'faebook.com'), null );
		},
		"server": function() {
			var server_port = 54321;
			var url_spam_checker = require('..');
			url_spam_checker.createServer([
				function(cb) {
					cb(null, [
						'yahoo.com',
						'google.com.tw',
					]);
				}
			], server_port, function(data){
				if (data.indexOf('pattern loaded:') >=0) {
				} else if (data.indexOf('Service Running at') >= 0 && data.indexOf(''+server_port) > 0) {
					var async = require('async');
					async.parallel([
						function(cb) {
							var request = require('request');
							request('http://localhost:'+server_port+'/?url=tw.yahoo.com', function (error, response, body) {
								assert.equal(response.statusCode, 200);
								cb(null);
							});
						},
						function(cb) {
							var request = require('request');
							request('http://localhost:'+server_port+'/?url=yahoo.com', function (error, response, body) {
								assert.equal(response.statusCode, 200);
								cb(null);
							});
						},
						function(cb) {
							var request = require('request');
							request('http://localhost:'+server_port+'/?url=yahoo.com.tw', function (error, response, body) {
								assert.equal(response.statusCode, 404);
								cb(null);
							});
						}
					], function (error, data) {
						url_spam_checker.api_server_instance.close();
					});
				} else {
					assert.equal(data, null);
				}
			});
		}
	}
);
suite.export(module);
