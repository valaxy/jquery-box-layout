define(function (require, exports) {
	var LinearLayout = require('src/view/linear-layout')
	var View = require('src/view/view')
	var $ = require('jquery')
	require('jquery-ui')

	exports.init = function () {
		var v1 = new View({
			selector: '.v1'
		})
		var v2 = new View({
			selector: '.v2'
		})
		var linear = new LinearLayout({
			direction: 'row'
		})
		linear.appendView(v1, {
			flex: '1'
		})
		linear.appendView(v2, {
			flex: '2' // 1296
		})
		$('.everything').append(linear._$dom)

		var $v1 = v1._$dom
		var $v2 = v2._$dom

		// resize
		var a
		var b
		v1._$dom.resizable({
			handles: 'e',
			animate: false,
			start: function () {
				a = Number($v1.css('flex-grow'))
				b = Number($v2.css('flex-grow'))
				console.log(a)
				console.log(b)
			},
			resize: function (e, ui) {
				var flex = (a * b * ui.size.width) / ((a + b) * ui.originalSize.width - a * ui.size.width)
				console.log(flex)
				console.log(ui.originalSize, ui.size)
				$v1.css('flex', '' + flex)
				$v1.css('width', 'auto')
			}
		})
	}
})