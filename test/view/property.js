define(function (require) {
	var LinearLayout = require('src/view/linear-layout')
	var SimpleView = require('src/view/simple-view')
	var $ = require('jquery'),
	    u = require('./utility')

	QUnit.module('submodule: property')

	QUnit.test('SimpleView#toJSON()', function (assert) {
		// default
		var cls = u.createDom()
		var s = new SimpleView({selector: cls}) // @日志, 如果selector不存在则flex也会失效, 所以实例化的时候要加保护
		assert.deepEqual(s.toJSON(), {
			_schema  : 'simple',
			className: '',
			flex     : '1 0 0px',
			selector : cls,
			plugins  : {}
		})

		// all
		cls = u.createDom()
		s = new SimpleView({
			selector : cls,
			className: 'xyz',
			flex     : '1 0 100px',
			plugins  : {a: {x: 1}, b: {}}
		})
		assert.deepEqual(s.toJSON(), {
			_schema  : 'simple',
			className: 'xyz',
			flex     : '1 0 100px',
			selector : cls,
			plugins  : {a: {x: 1}, b: {}}
		})
	})


	QUnit.test('LinearLayout#toJSON()', function (assert) {
		// default
		var l = new LinearLayout({direction: 'row'})
		assert.deepEqual(l.toJSON(), {
			_schema  : 'linear',
			direction: 'row',
			className: '',
			flex     : '1 0 0px',
			plugins  : {},
			views    : []
		})

		// all
		l = new LinearLayout({
			direction: 'column',
			className: 'xyz',
			flex     : '10 4 10px',
			plugins  : {a: {x: 1}, b: {}}
		})
		var cls = u.createDom()
		l.appendView(new SimpleView({selector: cls}))
		assert.deepEqual(l.toJSON(), {
			_schema  : 'linear',
			direction: 'column',
			className: 'xyz',
			flex     : '10 4 10px',
			plugins  : {a: {x: 1}, b: {}},
			views    : [{
				_schema  : 'simple',
				className: '',
				flex     : '1 0 0px',
				selector : cls,
				plugins  : {}
			}]
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