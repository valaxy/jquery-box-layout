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


		//var $v1 = v1._$dom
		//var $v2 = v2._$dom

		//// resize
		//var a
		//var b
		//v1._$dom.resizable({
		//	handles: 'e',
		//	animate: false,
		//	start: function () {
		//		a = Number($v1.css('flex-grow'))
		//		b = Number($v2.css('flex-grow'))
		//		console.log(a)
		//		console.log(b)
		//	},
		//	resize: function (e, ui) {
		//		var flex = (a * b * ui.size.width) / ((a + b) * ui.originalSize.width - a * ui.size.width)
		//		console.log(flex)
		//		console.log(ui.originalSize, ui.size)
		//		$v1.css('flex', '' + flex)
		//		$v1.css('width', 'auto')
		//	}
		//})
	}
})