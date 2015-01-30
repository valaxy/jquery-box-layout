define(function (require, exports) {
	var LinearLayout = require('./linear-layout')
	var View = require('./view')

	var createView = function (config) {
		if (config._schema == 'view') {
			return new View({
				selector: config.selector
			})
		} else { // linear-layout
			return new LinearLayout({
				orient: config.orient
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
		config.flex = 1 // must be
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