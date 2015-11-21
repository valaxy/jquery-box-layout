define(function (require) {
	var DockLayout = require('src/dock-layout'),
	    $          = require('jquery')

	QUnit.module('dock-layout')


	QUnit.test('addView()/views()/removeView()', function (assert) {
		var layout = new DockLayout
		assert.deepEqual(layout.views(), [])

		// add 1
		var d1 = layout.addView({
			direciton: 'left',
			dom      : $('<div>')
		})
		assert.deepEqual(layout.views(), [d1])

		// add 2
		var d2 = layout.addView({
			direciton: 'top',
			dom      : $('<div>')
		})
		assert.deepEqual(layout.views(), [d1, d2])

		// add 3
		var d3 = layout.addView({
			direciton: 'top',
			dom      : $('<div>')
		})
		assert.deepEqual(layout.views(), [d1, d2, d3])

		// remove
		assert.deepEqual(layout.removeView(d2), d2)
		assert.deepEqual(layout.views(), [d1, d3])
	})
})