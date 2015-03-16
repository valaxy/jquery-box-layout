define(function (require) {
	var LinearLayout = require('src/view/linear-layout')
	var $ = require('jquery')

	module('LinearLayout')

	test('constructor()|toJSON()', function (assert) {
		var l1 = new LinearLayout({
			_schema: 'linear',
			direction: 'row',
			className: 'my-linear-1',
			views: []
		})
		var l2 = new LinearLayout({
			_schema: 'linear',
			direction: 'column',
			className: 'my-linear-2',
			views: []
		})
		l1.appendView(l2, {
			flex: '10'
		})
		$('.test-area').append(l1._$dom)

		// test
		assert.deepEqual(l1.toJSON(), {
			_schema: 'linear',
			direction: 'row',
			className: 'my-linear-1',
			flex: 'auto',
			views: [{
				_schema: 'linear',
				direction: 'column',
				className: 'my-linear-2',
				flex: '10',
				views: []
			}]
		})

	})
})