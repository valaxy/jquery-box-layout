define(function (require) {
	var LinearLayout = require('src/view/linear-layout')
	var SimpleView = require('src/view/simple-view')
	var $ = require('jquery')

	QUnit.module('property', {
		beforeEach: function () {

		}
	})

	QUnit.test('toJSON()', function (assert) {
		var s = new SimpleView({
			selector: '.xx'
		})
		assert.deepEqual(s.toJSON(), {
			_schema  : 'simple',
			selector : '.xx',
			className: '',
			plugins  : {}
		})
	})

	QUnit.test('SimpleView#toTreeNode()', function (assert) {
		var s = new SimpleView({selector: $('<div>')})
		var node = s.toTreeNode()
		assert.equal(s, node.value)
	})


	QUnit.test('LinearLayout#toTreeNode()', function (assert) {
		var l = new LinearLayout({direction: 'row'})
		var node = l.toTreeNode()
		assert.equal(l, node.value)
		assert.equal(node.childrenCount(), 0)

		// add one
		var s1 = new SimpleView({selector: $('<div>')})
		l.appendView(s1)
		var node = l.toTreeNode()
		assert.equal(node.childrenCount(), 1)


		// add two
		var s2 = new SimpleView({selector: $('<div>')})
		l.appendView(s2)
		var node = l.toTreeNode()
		assert.equal(node.childrenCount(), 2)
	})
})