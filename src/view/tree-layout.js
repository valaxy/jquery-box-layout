define(function (require, exports) {
	var LinearLayout = require('./linear-layout')
	var SimpleView = require('./simple-view')

	var createView = function (config) {
		if (config._schema == 'view') {
			return new SimpleView({
				selector: config.selector
			})
		} else { // linear-layout
			return new LinearLayout({
				direction: config.direction
			})
		}
	}


	var processLinaerLayout = function (linear, config) {
		for (var i in config.views) {
			var viewConfig = config.views[i]
			var view = createView(viewConfig)
			linear.appendView(view, {
				flex: viewConfig.flex
			})

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
		return linear._$dom
	}


	/**
	 * get the config json
	 */
	exports.config = function () {

	}
})