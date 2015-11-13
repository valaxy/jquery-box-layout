define(function (require) {
	var LinearLayout = require('src/view/linear-layout')
	var SimpleView = require('src/view/simple-view')
	var $ = require('jquery')

	QUnit.module('enumeration', {
		beforeEach: function () {

		}
	})

	QUnit.test('eachSimpleView()', function (assert) {
		var l = new LinearLayout({
			direction: 'row',
			flex     : ''
		})

		var getEnumArray = function (linear) {
			var ary = []
			linear.eachSimpleView(function (view) {
				ary.push(view)
			})
			return ary
		}

		var createSimpleView = function () {
			return new SimpleView({selector: $('<div>')})
		}

		// empty
		assert.deepEqual(getEnumArray(l), [])

		// add one
		var s1 = createSimpleView()
		l.appendView(s1)
		assert.deepEqual(getEnumArray(l), [s1])
	})
})