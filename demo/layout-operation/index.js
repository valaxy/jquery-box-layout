define(function (require, exports) {
	var LinearLayout = require('src/view/linear-layout')
	var SimpleView = require('src/view/simple-view')
	var $ = require('jquery')
	var DragAndDrop = require('src/plugin/drag-and-drop')
	require('jquery-ui')


	var targetView
	var chooseView = function (view) {
		if (targetView) {
			targetView.$dom().removeClass('select')
		}
		targetView = view
		view.$dom().addClass('select')
		if (view instanceof  LinearLayout) {
			$('.info .current span').text('select LinearLayout')
		} else {
			$('.info .current span').text('select SimpleView')
		}

	}

	var id = 0

	var createSimple = function (options) {
		options = options || {}
		options.flex = options.flex == undefined ? '1' : options.flex
		var view = new SimpleView({
			selector        : $('<div><p>' + (id++) + '</p></div>'),
			flex            : options.flex,
			resizeableBefore: true,
			resizeableAfter : true
		})
		view.$dom().on('click', function (e) {
			chooseView(view)
			return false
		})
		if (!targetView) {
			chooseView(view)
		}
		return view
	}

	var createLinear = function (direction) {
		var view = new LinearLayout({
			direction: direction,
			flex     : '1'
		})
		bindLinear(view)
		return view
	}

	var bindLinear = function (view) {
		view.$dom().on('click', function (e) {
			chooseView(view)
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
		var v1 = createSimple({flex: '1'})
		var v2 = createSimple({flex: '2'})
		var v3 = createSimple({flex: '2'})

		var root = createLinear('row')
		root.appendView(v1)
		root.appendView(v2)
		root.appendView(v3)
		$('.main').append(root._$dom)

		//new DragAndDrop({
		//	root: root
		//})

		$('.remove').click(function () {
			root.removeViewAt(1)
		})


		//
		// split
		//
		$('.splitAtTop').click(function () {
			targetView.split(createSimple(), 'top', {flex: '1'}, {flex: '1'})
			bindLinear(targetView.parent())
		})

		$('.splitAtRight').click(function () {
			targetView.split(createSimple(), 'right', {flex: '1'}, {flex: '1'})
			bindLinear(targetView.parent())
		})

		$('.splitAtBottom').click(function () {
			targetView.split(createSimple(), 'bottom', {flex: '1'}, {flex: '1'})
			bindLinear(targetView.parent())
		})

		$('.splitAtLeft').click(function () {
			targetView.split(createSimple(), 'left', {flex: '1'}, {flex: '1'})
			bindLinear(targetView.parent())
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


		//
		// wrap
		//
		$('.wrapCurrentWithColumn').click(function () {
			targetView.wrap(createLinear('column'), {
				flex: 1
			})
		})
		$('.wrapCurrentWithRow').click(function () {
			targetView.wrap(createLinear('row'), {
				flex: 1
			})
		})
		$('.wrapRoot').click(function () {
			root.wrap(createLinear('row'), {
				flex: 1
			})
		})


		//
		// remove
		//
		$('.removeCurrent').click(function () {
			targetView.remove()
		})

	}
})