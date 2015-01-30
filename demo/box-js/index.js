define(function (require, exports) {
	var LinearLayout = require('src/view/linear-layout')
	var View = require('src/view/view')
	var $ = require('jquery')

	exports.init = function () {
		var v1 = new View({
			selector: '.v1'
		})
		var v2 = new View({
			selector: '.v2'
		})
		var linear = new LinearLayout({
			orient: 'horizontal'
		})
		linear.appendView(v1, {
			flex: '1'
		})
		linear.appendView(v2, {
			flex: '2'
		})

		$('.everything').append(linear._$dom)
	}
})