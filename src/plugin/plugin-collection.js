define(function (require) {
	var resizablePlugin = require('./resizeable/index')

	return {
		get: function (pluginName) {
			switch (pluginName) {
				case 'resizable':
					return resizablePlugin
				default:
					throw new Error('plugin of ' + pluginName + ' not exist')
			}
		}
	}
})