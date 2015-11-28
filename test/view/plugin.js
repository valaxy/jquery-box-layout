define(function (require) {
	var SimpleView    = require('src/view/simple-view'),
	    $             = require('jquery'),
	    pluginManager = require('src/plugin/plugin-manager').default()


	QUnit.module('submodule: plugin')

	QUnit.test('pluginOption()', function (assert) {
		var s = new SimpleView({selector: $('<div>')})
		assert.equal(s.pluginOption('resizable'), undefined)

		s.pluginOption('resizable', true)
		assert.deepEqual(s.pluginOption('resizable'), {})

		s.pluginOption('resizable', {a: 1})
		assert.deepEqual(s.pluginOption('resizable'), {a: 1})

		s.pluginOption('resizable', {b: 2})
		assert.deepEqual(s.pluginOption('resizable'), {a: 1, b: 2})
	})


	QUnit.test('onChange handler', function (assert) {
		var s = new SimpleView({selector: $('<div>')})
		var oldOptions = []
		var newOptions = []
		pluginManager.add('test', {
			onAdd   : function () {
			},
			onRemove: function () {
			},
			onChange: function (view, oldOption, newOption) {
				assert.equal(s, view)
				oldOptions.push(oldOption)
				newOptions.push(newOption)
			}
		})

		s.pluginOption('test', {a: 1})
		s.pluginOption('test', {a: 1, b: 2})

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


	QUnit.test('_callPlugin()', function (assert) {
		var s = new SimpleView({selector: $('<div>')})
		pluginManager.add('test', {
			onAdd   : function () {
			},
			onRemove: function () {
			},
			onChange: function (view, oldOption, newOption) {
			},
			onTest  : function (options, str1, str2) {
				assert.deepEqual(options, {x: 1})
				assert.equal(str1, 'aaa')
				assert.equal(str2, 'bbb')
			}
		})

		s.pluginOption('test', {x: 1})
		s._callPlugins('onTest', 'aaa', 'bbb')
		pluginManager.remove('test')
	})


})