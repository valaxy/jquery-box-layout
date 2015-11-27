define(function (require) {
	var pluginManager = require('../../plugin/plugin-manager').default()

	return function (View) {

		View.prototype._initPlugins = function (pluginOptions) {
			this._pluginOptions = pluginOptions || {}
		}


		/** Get or Set plugin options, options will merge to exist options
		 ** name: plugin name
		 ** options: options of plugin
		 */
		View.prototype.plugin = function (name, options) {
			if (options === undefined) {
				return this._pluginOptions[name]
			} else {
				var plugin = pluginManager.get(name)
				var oldOptions = this._pluginOptions[name]
				var newOptions = Object.assign({}, oldOptions, options)
				this._pluginOptions[name] = newOptions
				plugin.onChange(oldOptions, newOptions)
			}
		}
	}
})