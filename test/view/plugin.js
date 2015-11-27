define(function (require) {
	var SimpleView    = require('src/view/simple-view'),
	    $             = require('jquery'),
	    pluginManager = require('src/plugin/plugin-manager').default()


	QUnit.module('submodule: plugin')

	QUnit.test('plugin()', function (assert) {
		var s = new SimpleView({selector: $('<div>')})
		assert.equal(s.plugin('resizable'), undefined)

		s.plugin('resizable', true)
		assert.deepEqual(s.plugin('resizable'), {})

		s.plugin('resizable', {a: 1})
		assert.deepEqual(s.plugin('resizable'), {a: 1})

		s.plugin('resizable', {b: 2})
		assert.deepEqual(s.plugin('resizable'), {a: 1, b: 2})
	})


	QUnit.test('onChange', function (assert) {
		var s = new SimpleView({selector: $('<div>')})
		var oldOptions = []
		var newOptions = []
		pluginManager.add('test', {
			onAdd   : function () {
			},
			onRemove: function () {
			},
			onChange: function (oldOption, newOption) {
				oldOptions.push(oldOption)
				newOptions.push(newOption)
			}
		})

		s.plugin('test', {a: 1})
		s.plugin('test', {a: 1, b: 2})

		assert.deepEqual(oldOptions, [
			undefined,
			{a: 1}
		])
		assert.deepEqual(newOptions, [
			{a: 1},
			{a: 1, b: 2}
		])

		pluginManager.remove('test')
	})
})