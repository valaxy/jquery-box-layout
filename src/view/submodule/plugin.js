define(function (require) {
	var pluginManager = require('../../plugin/plugin-manager').default()

	return function (View) {

		View.prototype._initPlugins = function (pluginOptions) {
			this._pluginOptions = pluginOptions || {}
			this._callPlugins('onInit')
		}


		View.prototype._callPlugins = function (handler /* reset */) {
			var rest = Array.prototype.slice.call(arguments, 1)
			pluginManager.forEach(function (name, plugin) {
				var option = this.pluginOption(name)
				var args = [].concat(rest) // @log, need copy to use because of forEach
				args.splice(0, 0, option)
				plugin[handler] && plugin[handler].apply(this, args) // todo, 判断会有性能损失
			}.bind(this))
		}


		/** Get or Set plugin option, option will merge to exist option
		 ** name: plugin name
		 ** option: option of plugin
		 */
		View.prototype.pluginOption = function (name, option) {
			if (option === undefined) {
				return this._pluginOptions[name]
			} else {
				var plugin = pluginManager.get(name)
				var oldOptions = this._pluginOptions[name]
				var newOptions = Object.assign({}, oldOptions, option)
				this._pluginOptions[name] = newOptions
				plugin.onChange(this, oldOptions, newOptions)
			}
		}
	}
})