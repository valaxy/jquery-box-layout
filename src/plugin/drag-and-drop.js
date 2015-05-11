define(function (require) {
	var SimpleView = require('../view/simple-view')
	var Rect = require('./rect')
	var $ = require('jquery')
	var NAMESPACE = require('../view/jquery-event-namespace')

	var initDropArea = function () {
		var root = this._options.root.toTreeNode()
		var rects = this._rects = []
		root.postorderWalk(function (node) {
			var view = node.value()
			if (view instanceof SimpleView) {
				rects.push(new Rect(
					view.$dom()[0].getBoundingClientRect(),
					view
				))
			}
		})
	}


	var onDragStart = function (e) {
		initDropArea.call(this)
		var $ghostLayer = $(this._options.ghostLayer)
		var $ghost = this._$ghost = $('<div>').addClass('ghost').css({
			position: 'absolute'
		})

		this._fromView = findSimpleView.call(this, findSimpleDom(e.currentTarget))
		this._currentRect = null
		this._currentPosition = null
		$ghostLayer.append($ghost)


		$(document).on('mousemove' + NAMESPACE, onMove.bind(this))
	}

	var onDragStop = function () {
		$(document).off('mousemove' + NAMESPACE)
		this._$ghost.remove()

		if (this._currentRect && this._currentPosition) {
			var fromView = this._fromView
			var toView = this._currentRect.view
			var position = this._currentPosition

			fromView.removeNonredundant()
			toView.split(fromView, position, {flex: '1'}, {flex: '1'})
		}
	}


	var findSimpleDom = function (dom) {
		while (true) {
			if ($(dom).hasClass('simple')) {
				return dom
			}
			dom = dom.parentNode
		}
	}

	var findSimpleView = function (dom) { // todo, 可能有性能问题, 但是没有更好的设计模式来解决这样的引用
		var root = this._options.root
		var find = null
		root.toTreeNode().postorderWalk(function (node) {
			var view = node.value()
			if (view instanceof SimpleView && view.$dom()[0] === dom) {
				find = view
				return true
			}
		})
		return find
	}

	var onMove = function (e) {
		var position = {
			left: e.clientX,
			top : e.clientY
		}
		//console.log(position)


		var me = this
		this._rects.forEach(function (rect) {
			var direction = rect.in(position)
			if (direction) {
				if (rect != me._currentRect || me._currentPosition != direction) {
					me._currentRect = rect
					me._currentPosition = direction
					//console.log(rect, position, direction)

					switch (direction) {
						case 'left':
							me._$ghost.css({
								left  : rect.left,
								top   : rect.top,
								height: rect.height,
								width : rect.width / 2
							})
							break
						case 'top':
							me._$ghost.css({
								left  : rect.left,
								top   : rect.top,
								height: rect.height / 2,
								width : rect.width
							})
							break
						case 'bottom':
							me._$ghost.css({
								left  : rect.left,
								top   : rect.top + rect.height / 2,
								height: rect.height / 2,
								width : rect.width
							})
							break
						case 'right':
							me._$ghost.css({
								left  : rect.left + rect.width / 2,
								top   : rect.top,
								height: rect.height,
								width : rect.width / 2
							})
							break
					}
				}
				return
			}
		})

	}


	/** options:
	 **     root:
	 **     handler:
	 **     ghostLayer: selector of ghost layer
	 ** events:
	 ** selectors:
	 **     .ghost: selector about ghost of where to drop
	 **
	 */
	var DragAndDrop = function (options) {
		options.handler = '.simple' + (options.handler ? ' ' + options.handler : '')
		options.ghostLayer = options.ghostLayer || 'body'
		this._options = options

		this._fromView = null         // drag start view
		this._rects = null            // drop area
		this._$ghost = null           // ghost rect
		this._currentRect = null      // rect
		this._currentPosition = null  // postion

		this.init()
	}


	DragAndDrop.prototype.init = function () {
		var root = this._options.root
		var handler = this._options.handler

		root.$dom().on('mousedown' + NAMESPACE, handler, onDragStart.bind(this))
		$(document).on('mouseup' + NAMESPACE, onDragStop.bind(this))
	}

	DragAndDrop.prototype.dispose = function () {
		var root = this._options.root

		root.$dom().off('mousedown' + NAMESPACE)
		$(document).off('mouseup' + NAMESPACE)
	}

	return DragAndDrop
})

//root.toTreeNode().postorderWalk((function (node) {
//	var view = node.value()
//	if (view instanceof SimpleView) {
//		view.$dom().off('mousedown', function () {
//			this._fromView = view
//			dragstart.call(me)
//		})
//	}
//}).bind(this))