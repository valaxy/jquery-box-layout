define(function (require) {
	var DockView = require('src/dock-layout/dock-view')
	var $ = require('jquery')

	QUnit.module('dock-view')

	QUnit.test('constructor', function (assert) {
		var $dom = $('<div>')
		var d = new DockView({
			dom      : $dom[0],
			direction: 'top'
		})
		assert.equal(d.dom(), $dom[0])
		assert.equal(d.direction(), 'top')
	})
})