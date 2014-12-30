define(function (require, exports) {

	var LinearLayout = require('./linear-layout')

	exports.init = function (options) {
		options.parent = null
		var root = new LinearLayout(options)
		return root.$dom
	}

})