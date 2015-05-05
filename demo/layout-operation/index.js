define(function (require, exports) {
	var LinearLayout = require('src/view/linear-layout')
	var SimpleView = require('src/view/simple-view')
	var $ = require('jquery')
	var Chance = require('chance')
	require('jquery-ui')


	var random = new Chance
	var id = 0
	var targetView
	var createSimple = function () {
		var view = new SimpleView({
			selector: $('<div></div>').text(id++)
		})
		view.$dom().on('click', function () {
			targetView = view
			$('.info .current span').text(view.$dom().text())
		})
		if (!targetView) {
			targetView = view
			$('.info .current span').text(view.$dom().text())
		}
		return view
	}

	var createLinear = function () {
		var view = new LinearLayout({
			direction: 'row'
		})
		return view
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
		root.appendView(v2, {flex: '0 100px', resizeableBefore: true})
		root.appendView(v3, {flex: '2', resizeableBefore: true})
		$('.main').append(root._$dom)


		$('.remove').click(function () {
			root.removeViewAt(1)
		})


		//
		// split
		//
		$('.splitRootAtTop').click(function () {
			root.split(createSimple(), 'top', {flex: '1'})
			root = root.parent()
		})

		$('.splitRootAtRight').click(function () {
			root.split(createSimple(), 'right', {flex: '1'})
			root = root.parent()
		})

		$('.splitRootAtBottom').click(function () {
			root.split(createSimple(), 'bottom', {flex: '1'})
			root = root.parent()
		})

		$('.splitRootAtLeft').click(function () {
			root.split(createSimple(), 'left', {flex: '1'})
			root = root.parent()
		})


		//
		// addViewAtEdge
		//
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

		$('.replaceWithFirst').click(function () {
			var v = createSimple()
			v1.replaceWith(v)
			v1 = v
		})


		window.wrapCurrentSimple = function () {
			targetView.wrap(createLinear())
		}
	}
})