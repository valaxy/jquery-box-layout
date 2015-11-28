define(function (require) {
	var LinearLayout = require('src/view/linear-layout')
	var SimpleView = require('src/view/simple-view')
	var $ = require('jquery')

	QUnit.module('submodule: search')


	QUnit.test('LinearLayout#findViewByDom()', function (assert) {
		var l1 = new LinearLayout({direction: 'row'})
		var l2 = new LinearLayout({direction: 'row'})
		var s1Dom = $('<div>')
		var s2Dom = $('<div>')
		var s3Dom = $('<div>')
		var s4Dom = $('<div>')
		var s5Dom = $('<div>')
		var s1 = new SimpleView({selector: s1Dom})
		var s2 = new SimpleView({selector: s2Dom})
		var s3 = new SimpleView({selector: s3Dom})
		var s4 = new SimpleView({selector: s4Dom})
		var s5 = new SimpleView({selector: s5Dom})
		l1.appendView(s1)
		l1.appendView(l2)
		l1.appendView(s2)
		l2.appendView(s3)
		l2.appendView(s4)
		l2.appendView(s5)

		assert.equal(l1.findViewByDom(s1Dom), s1)
		assert.equal(l1.findViewByDom(s2Dom), s2)
		assert.equal(l1.findViewByDom(s3Dom), s3)
		assert.equal(l1.findViewByDom(s4Dom), s4)
		assert.equal(l1.findViewByDom(s5Dom), s5)
		assert.equal(l1.findViewByDom($('<div>')[0]), null)
	})

})