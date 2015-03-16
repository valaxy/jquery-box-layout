define(function (require) {
	var LinearLayout = require('src/view/linear-layout')
	var SimpleView = require('src/view/simple-view')
	var $ = require('jquery')

	module('SimpleView')

	test('constructor()|toJSON()', function (assert) {
		var linear = new LinearLayout({
			_schema: 'linear',
			direction: 'column',
			views: []
		})
		var s1 = new SimpleView({
			_schema: 'simple',
			selector: '.test-box-1',
			className: 'my-box'
		})
		var s2 = new SimpleView({
			_schema: 'simple',
			selector: '.test-box-2',
			className: 'my-box'
		})
		linear.appendView(s1, {
			flex: '1'
		})
		linear.appendView(s2, {
			flex: '100px'
		})
		$('.test-area').append(linear._$dom)


		// test
		assert.deepEqual(s1.toJSON(), {
			_schema: 'simple',
			flex: '1',
			selector: '.test-box-1',
			className: 'my-box'
		})
		assert.deepEqual(s2.toJSON(), {
			_schema: 'simple',
			flex: '100px',
			selector: '.test-box-2',
			className: 'my-box'
		})

	})
})