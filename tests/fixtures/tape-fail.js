var test = require('tape');
 
test('some test', function(t) {
	t.plan(2);
	
	t.equal(3, 4);
	t.equal('foo', 'bar');
});
