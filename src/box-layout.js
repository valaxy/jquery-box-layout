define(function (require, exports) {

	var LinearLayout = require('./linear-layout')

	/**
	 * - at least has a auto
	 * - others are %
	 * - or others are number
	 * @param options
	 * @returns {BaseView.$dom|*}
	 */
	exports.init = function (options) {
		var root = new LinearLayout(1, {
			_isHor: true,
			margin1: 0,
			margin2: 0
		}, options)
		return root.$dom
	}

})