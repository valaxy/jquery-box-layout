define(function (require, exports) {
	var LinearLayout = require('src/view/linear-layout')
	var SimpleView = require('src/view/simple-view')
	var $ = require('jquery')
	var Chance = require('chance')
	require('jquery-ui')


	var random = new Chance
	var id = 0
	var createSimple = function () {
		return new SimpleView({
			selector: $('<div></div>').text(id++)
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
		var v1 = createSimple()
		var v2 = createSimple()
		var v3 = createSimple()


		var root = new LinearLayout({direction: 'row'})
		root.appendView(v1, {flex: '1'})
		root.appendView(v3, {flex: '0 100px'})
		root.appendView(v2, {flex: '2'})
		$('.main').append(root._$dom)


		$('.remove').click(function () {
			root.removeViewAt(1)
		})


		$('.splitRootAtTop').click(function () {
			root.split(createSimple(), 'top', {flex: '1'})
		})


		$('.addViewAtLeft').click(function () {
			root.addViewAtEdge(createSimple(), 'left', {
				flex: '1'
			})
			root = getRoot(root)
		})

		$('.addViewAtTop').click(function () {
			root.addViewAtEdge(createSimple(), 'top', {
				flex: '1'
			})
			root = getRoot(root)
		})


		$('.addViewAtRight').click(function () {
			root.addViewAtEdge(createSimple(), 'right', {
				flex: '1'
			})
			root = getRoot(root)
		})

		$('.addViewAtBottom').click(function () {
			root.addViewAtEdge(createSimple(), 'bottom', {
				flex: '1'
			})
			root = getRoot(root)
		})


		$('.replaceWithRoot').click(function () {
			var v = createSimple()
			root.replaceWith(v)
			root = v
		})
	}
})