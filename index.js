var Promise = require('bluebird');

var exec = require('child_process').exec;




var generateArgString = function(argv) {
	return Object.keys(argv).reduce(function(prevResult, key) {
		var value = argv[key];

		return prevResult + ' --' + key + '"' + value + '"';
	}, '');
};


var skipArgMap = {
	'$0': true,
	'_': true
};
var getArgvOnlyNamedParameters = function(argv) {
	var result = {};
	Object.keys(argv).forEach(function(key) {
		var value = argv[key];
		if(!skipArgMap[key]) {
			argv[key] = value;
		}
	});

	return result;
};





module.exports = function runner(argv) {
	return new Promise(function(resolve, reject) {
		var anonArgString = argv._.join(' ');
		var namedArgString = generateArgString(getArgvOnlyNamedParameters(argv));

		var command = 'babel-tape-runner ' + anonArgString + ' ' +  namedArgString;
		//console.log('tacky-tape-runner command: ' + command);

		var child = exec(command, function(err, stdout, stderr) {
			//console.log('stdout', stdout, 'e', err, 'stderr', stderr);
			resolve({
				stdout: stdout,
				stderr: stderr,
				error: err
			});
		});

		// Get around having to do `; exit 0;` in user script commands
		// by always `exit 0` (no error). This should be the job of the reporter
		child.on('exit', function(exitCode) {
			process.exitCode = 0;
		});
	});
};
