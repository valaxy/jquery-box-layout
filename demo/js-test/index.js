define(function (require, exports) {
	var LinearLayout = require('src/view/linear-layout')
	var SimpleView = require('src/view/simple-view')
	var $ = require('jquery')
	require('jquery-ui')


	exports.init = function () {
		var v1 = new SimpleView({
			selector: '.v1'
		})
		var v2 = new SimpleView({
			selector: '.v2'
		})
		var v3 = new SimpleView({
			selector: '.v3'
		})

		var linear = new LinearLayout({
			direction: 'row'
		})
		linear.appendView(v1, {
			flex: 1
		})
		linear.appendView(v3, {
			flex: '100px'
		})
		linear.appendView(v2, {
			flex: 2 // 1296
		})
		$('.everything').append(linear._$dom)


		setTimeout(function () {
			linear.removeViewAt(1)
		}, 2000)
	}
})