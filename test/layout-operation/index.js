define(function (require, exports) {
	var LinearLayout = require('src/view/linear-layout')
	var SimpleView = require('src/view/simple-view')
	var $ = require('jquery')
	require('jquery-ui')


	var createView = function () {
		return new SimpleView({
			selector: $('<div>new view</div>')
		})
	}

	var getRoot = function (view) {
		while (true) {
			if (!view.parent()) {
				return view
			}
			view = view.parent()
		}
	}

	exports.init = function () {
		var v1 = new SimpleView({
			selector: '.v1' // css selector
		})
		var v2 = new SimpleView({
			selector: $('<div>1</div>') // jquery object
		})
		var v3 = new SimpleView({
			selector: $('<div>2</div>')
		})


		var linear = new LinearLayout({
			direction: 'row'
		})
		linear.appendView(v1, {
			flex: '1'
		})
		linear.appendView(v3, {
			flex: '0 100px'
		})
		linear.appendView(v2, {
			flex: '2'
		})
		$('.main').append(linear._$dom)


		$('.remove').click(function () {
			linear.removeViewAt(1)
		})

		$('.split').click(function () {
			var s = new SimpleView({
				selector: $('<div>我是新增的</div>')
			})
			v1.splitVertical(s, 'top')
		})


		$('.addViewAtLeft').click(function () {
			linear.addViewAtEdge(createView(), 'left', {
				flex: '1'
			})
			linear = getRoot(linear)
		})

		$('.addViewAtTop').click(function () {
			linear.addViewAtEdge(createView(), 'top', {
				flex: '1'
			})
			linear = getRoot(linear)
		})


		$('.addViewAtRight').click(function () {
			linear.addViewAtEdge(createView(), 'right', {
				flex: '1'
			})
			linear = getRoot(linear)
		})

		$('.addViewAtBottom').click(function () {
			linear.addViewAtEdge(createView(), 'bottom', {
				flex: '1'
			})
			linear = getRoot(linear)
		})
	}
})