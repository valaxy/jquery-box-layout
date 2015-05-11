define(function (require) {
	var SimpleView = require('../view/simple-view')
	var Rect = require('./rect')
	var $ = require('jquery')

	var dragstart = function () {
		this._initRectArea()
		var $ghostLayer = $(this._options.ghostLayer)
		var $ghost = this._$ghost = $('<div>').addClass('ghost').css({
			position: 'absolute'
		})
		this._currentRect = null
		this._direction = null
		$ghostLayer.append($ghost)


		this._onMouseMove = onMouseMove.bind(this)
		$(document).on('mousemove', this._onMouseMove)
	}

	var onMouseUp = function () {
		$(document).off('mousemove', this._onMouseMove)
		this._$ghost.remove()

		if (this._currentRect && this._direction) {
			var fromView = this._fromView
			var toView = this._currentRect.view
			var position = this._direction

			toView.split(fromView, position, {flex: '1'}, {flex: '1'})
		}
	}

	var onMouseMove = function (e) {
		var position = {
			left: e.clientX,
			top : e.clientY
		}
		//console.log(position)


		var me = this
		this._rects.forEach(function (rect) {
			var direction = rect.in(position)
			if (direction) {
				if (rect != me._currentRect || me._direction != direction) {
					me._currentRect = rect
					me._direction = direction
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
	 **     ghostLayer:
	 ** events:
	 ** selectors:
	 **     .ghost: selector about ghost of where to drop
	 **
	 */
	var DragAndDrop = function (options) {
		options.handler = (options.handler ? options.handler + ' ' : '') + '.simple'
		this._options = options

		this._fromView = null // start drag view

		this._init()
	}


	DragAndDrop.prototype._initRectArea = function () {
		var root = this._options.root
		var rootNode = root.toTreeNode()
		var rects = this._rects = []
		rootNode.postorderWalk(function (node) {
			if (node.value() instanceof SimpleView) {
				rects.push(new Rect(
					node.value().$dom()[0].getBoundingClientRect(),
					node.value()
				))
			}
		})
	}


	DragAndDrop.prototype._init = function () {
		var root = this._options.root
		var handler = this._options.handler
		//this._onMouseDown = dragstart.bind(this)
		this._onMouseUp = onMouseUp.bind(this)


		var me = this
		root.toTreeNode().postorderWalk(function (node) {
			var view = node.value()
			if (view instanceof SimpleView) {
				view.$dom().on('mousedown', function () {
					me._fromView = view
					dragstart.call(me)
				})
			}
		})

		//root.$dom().on('mousedown', handler, this._onMouseDown)
		$(document).on('mouseup', this._onMouseUp)
	}

	DragAndDrop.prototype._dispose = function () {
		var root = this._options.root
		var handler = this._options.handler


		root.toTreeNode().postorderWalk((function (node) {
			var view = node.value()
			if (view instanceof SimpleView) {
				view.$dom().off('mousedown', function () {
					this._fromView = view
					dragstart.call(me)
				})
			}
		}).bind(this))


		root.$dom().on('mousedown', handler, this._onMouseDown)
	}


	return DragAndDrop
})