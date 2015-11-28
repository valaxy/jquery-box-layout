define(function (require) {
	var LinearLayout = require('src/view/linear-layout')
	var SimpleView = require('src/view/simple-view')
	var $ = require('jquery')


	QUnit.module('submodule: insertion')

	QUnit.test('addViewAt', function (assert) {
		var l = new LinearLayout({direction: 'column'})
		var s = new SimpleView({selector: $('<div>')})
		assert.equal(s.parent(), null)
		assert.equal(l.length(), 0)

		// after add
		l.addViewAt(0, s)
		assert.equal(s.parent(), l)
		assert.equal(l.length(), 1)
	})
})