#!/usr/bin/env node

var Promise = require('bluebird');
var yargs = require('yargs');
var str = require('string-to-stream');

var runner = require('../');

runner(yargs.argv)
	.then(function(result) {
		str(result.stdout)
			.pipe(process.stdout);
	})
	.catch(function(err) {
		console.log(err);
	});


