define(function (require, exports) {
	var LinearLayout = require('./linear-layout')
	var SimpleView = require('./simple-view')

	var createView = function (config) {
		if (config._schema == 'simple') {
			return new SimpleView(config)
		} else { // linear-layout
			return new LinearLayout(config)
		}
	}


	var processLinaerLayout = function (linear, config) {
		for (var i in config.views) {
			var viewConfig = config.views[i]
			var view = createView(viewConfig)
			linear.appendView(view)

			// recrusly
			if (viewConfig._schema == 'linear') {
				processLinaerLayout(view, viewConfig)
			}
		}
	}


	exports.init = function (config) {
		var linear = createView(config)
		if (config._schema == 'linear') {
			processLinaerLayout(linear, config)
		}
		return linear
	}


	/**
	 * get the config json
	 */
	exports.config = function () {

	}
})