var tape = require('tape');

var path = require('path');
var exec = require('child_process').exec;

let test = function(name, argString, expectedExitCode) {
	tape(name, function(t) {
		t.plan(1);

		var pathToRunnerCli = path.join(__dirname, '../bin/safe-tape-runner');
		var child = exec('node ' + pathToRunnerCli + ' ' + argString, function(err, stdout, stderr) {
			//console.log('stdout', stdout, 'e', err, 'stderr', stderr);
		});

		// Get around having to do `; exit 0;` in user script commands
		// by always `exit 0` (no error). This should be the job of the reporter
		child.on('exit', function(exitCode) {
			t.equal(exitCode, expectedExitCode);
		});
	});
};


test(
	'Should handle when all tape tests pass',
	path.join(__dirname, './fixtures/tape-pass.js'),
	0
);
test(
	'Should handle when all tape tests fail',
	path.join(__dirname, './fixtures/tape-fail.js'),
	0
);

test(
	'Should `exit 1` with failing tests when piping to a reporter',
	path.join(__dirname, './fixtures/tape-fail.js | tap-spec'),
	1
);
