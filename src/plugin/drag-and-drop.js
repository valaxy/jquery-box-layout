define(function (require) {

	//----------------------------------------------------------------------
	// drag a box to another box
	//----------------------------------------------------------------------

	var SimpleView = require('../view/simple-view')
	var Rect = require('./rect')
	var $ = require('jquery')
	var NAMESPACE = '.valaxy/linear-layout'


	// calculate all the rect can be dropped
	var initDropRect = function () {
		var root = this._options.root.toTreeNode()
		var rects = this._rects = []
		var me = this
		root.postorderWalk(function (node) {
			var view = node.value
			if (view instanceof SimpleView) {
				var r = new Rect(view)
				rects.push(r)
				if (view == me._fromView) {
					me._fromRect = r
				}
			}
		})
	}


	var findSimpleViewDom = function (dom) {
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
			var view = node.value
			if (view instanceof SimpleView && view.$dom()[0] === dom) {
				find = view
				return true
			}
		})
		return find
	}


	var onDragStart = function (e) {
		this._fromView = findSimpleView.call(this, findSimpleViewDom(e.currentTarget)) // find view from bottom to top of tree
		initDropRect.call(this)
		var $ghostLayer = $(this._options.ghostLayer)
		var $ghost = this._$ghost = $('<div>').addClass('ghost').css({
			position: 'absolute'
		})

		this._currentRect = null
		this._currentPosition = null
		$ghostLayer.append($ghost)


		$(document).on('mousemove' + NAMESPACE, onMove.bind(this))
		$(document).on('mouseup' + NAMESPACE, onDragStop.bind(this))
	}

	var onDragStop = function () {
		$(document).off('mousemove' + NAMESPACE)
		$(document).off('mouseup' + NAMESPACE)
		this._$ghost.remove()

		if (this._currentRect && this._currentPosition) {
			var fromView = this._fromView
			var toView = this._currentRect.view
			var position = this._currentPosition

			fromView.removeNonredundant()
			toView.split(fromView, position, {flex: '1 1 0'}, {flex: '1 1 0'})

			toView.keepUpNonredundant()
		}
	}


	var onMove = function (e) {
		var position = {
			left: e.clientX,
			top : e.clientY
		}
		getSelection().removeAllRanges() // forbidden selection

		var me = this
		this._rects.forEach(function (rect) {
			var direction = rect.in(position)
			if (direction) {
				if (rect == me._fromRect) { // drag in original rect
					me._currentRect = null
					me._currentPosition = null

					me._$ghost.hide()
				} else if (rect != me._currentRect || me._currentPosition != direction) {
					me._currentRect = rect
					me._currentPosition = direction

					me._$ghost.show()
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
		}.bind(this))

	}


	/** options:
	 **     root: the root view to hold drag-and-drop interact logic
	 **     [handler]: a selector of where can be dragged
	 **     [ghostLayer]: selector of ghost layer
	 ** events:
	 ** selectors:
	 **     .ghost: selector about ghost of where to drop
	 **
	 */
	var DragAndDrop = function (options) {
		options.handler = '.simple' + (options.handler ? ' ' + options.handler : '')
		options.ghostLayer = options.ghostLayer || 'body' // where to add ghost
		this._options = options

		this._$ghost = null           // ghost rect
		this._rects = null            // drop areas
		this._fromView = null         // drag start view
		this._fromRect = null         // drag start rect
		this._currentRect = null      // rect
		this._currentPosition = null  // position

		this.init()
	}


	DragAndDrop.prototype.init = function () {
		var root = this._options.root
		var handler = this._options.handler

		root.$dom().on('mousedown' + NAMESPACE, handler, onDragStart.bind(this))
	}

	DragAndDrop.prototype.dispose = function () {
		var root = this._options.root

		root.$dom().off('mousedown' + NAMESPACE)
		$(document).off('mousemove' + NAMESPACE)
		$(document).off('mouseup' + NAMESPACE)
	}

	return DragAndDrop
})
