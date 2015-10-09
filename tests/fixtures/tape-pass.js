var test = require('tape');
 
test('some test', function(t) {
	t.plan(2);
	
	t.equal(3, 3);
	t.equal(typeof Date.now, 'function');
});
