define(function (require, exports) {

	var LinearLayout = require('./linear-layout')

	exports.init = function (options) {
		var root = new LinearLayout(1, {
			_isHor: true,
			margin1: 0,
			margin2: 0
		}, options)
		return root.$dom
	}

})