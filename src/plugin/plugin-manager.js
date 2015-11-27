define(function (require) {

	var PluginManager = function () {
		this._plugins = { // default plugins
			resizable: require('./resizeable/index'),
			draggable: require('./draggable/index')
		}
	}

	Object.assign(PluginManager.prototype, {
		get: function (name) {
			var plugin = this._plugins[name]
			if (!plugin) throw new Error('plugin of ' + name + ' not exist')
			return plugin
		},

		add: function (name, plugin) {
			if (this.has(name)) throw new Error('plugin of ' + name + ' exist')
			if (!plugin.onAdd) throw new Error('plugin must has onAdd function')
			if (!plugin.onAdd) throw new Error('plugin must has onRemove function')
			if (!plugin.onAdd) throw new Error('plugin must has onChange function')
			this._plugins[name] = plugin
		},

		remove: function (name) {
			delete this._plugins[name]
		},

		has: function (name) {
			return name in this._plugins
		}
	})


	var d = new PluginManager
	PluginManager.default = function () {
		return d
	}

	return PluginManager
})