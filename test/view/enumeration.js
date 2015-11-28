define(function (require) {
	var LinearLayout = require('src/view/linear-layout')
	var SimpleView = require('src/view/simple-view')
	var $ = require('jquery')


	var getEnumArray = function (linear) {
		var ary = []
		linear.eachSimpleView(function (view) {
			ary.push(view)
		})
		return ary
	}

	var getEnumArray2 = function (linear) {
		var ary = []
		linear.eachView(function (view) {
			ary.push(view)
		})
		return ary
	}

	var createSimpleView = function () {
		return new SimpleView({selector: $('<div>')})
	}

	QUnit.module('submodule: enumeration')

	QUnit.test('eachSimpleView()', function (assert) {
		var l = new LinearLayout({direction: 'row'})

		// empty
		assert.deepEqual(getEnumArray(l), [])

		// add one
		var s1 = createSimpleView()
		l.appendView(s1)
		assert.deepEqual(getEnumArray(l), [s1])
	})

	QUnit.test('eachView()', function (assert) {
		var l = new LinearLayout({direction: 'row'})

		// empty
		assert.deepEqual(getEnumArray2(l), [l])

		// add one
		var s1 = createSimpleView()
		l.appendView(s1)
		assert.deepEqual(getEnumArray2(l), [s1, l])
	})
})