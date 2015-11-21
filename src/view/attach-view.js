define(function (require) {
	var StateMachine = require('state-machine')
	var $ = require('jquery')

	var HANDLER_SIZE = '20px'
	var DOM_SIZE = '200px'

	/**
	 * - selector
	 * - direction: left | top | right | bottom
	 * @constructor
	 */
	var AttachView = function (options) {
		this._$dom = $(options.selector)
		this._currentPosition = options.direction
		this._init()
	}

	AttachView.prototype._init = function () {
		var me = this
		var $wrap = $('body')
		var $hideHandler = $('<div></div>').css({
			position: 'absolute',
			left: 0,
			top: 0,
			right: 0,
			bottom: 0,
			width: 'auto',
			height: 'auto',
			'z-index': 999
		})


		this._$dom.css({
			position: 'absolute',
			left: 0,
			top: 0,
			right: 0,
			bottom: 0,
			height: 'auto',
			width: 'auto'
		}).hide()


		// init css
		switch (this._currentPosition) {
			case 'left':
				$hideHandler.css({
					width: HANDLER_SIZE,
					right: 'auto'
				})
				this._$dom.css({
					left: '-' + DOM_SIZE,
					right: 'auto',
					width: DOM_SIZE
				})
				break
			case 'top':
				$hideHandler.css({
					height: HANDLER_SIZE,
					bottom: 'auto'
				})
				this._$dom.css({
					top: '-' + DOM_SIZE,
					bottom: 'auto',
					height: DOM_SIZE
				})
				break
			case 'right':
				this._$dom.css({
					right: '-' + DOM_SIZE,
					left: 'auto',
					width: DOM_SIZE
				})
				$hideHandler.css({
					width: HANDLER_SIZE,
					left: 'auto'
				})
				break
			case 'bottom':
				this._$dom.css({
					bottom: '-' + DOM_SIZE,
					top: 'auto',
					height: DOM_SIZE
				})
				$hideHandler.css({
					height: HANDLER_SIZE,
					top: 'auto'
				})
				break
		}
		$hideHandler.appendTo($wrap)


		var onLefthoverMousemove = function () {
			me._fsm.open()
		}

		var onDomMouseout = function () {
			me._fsm.close()
		}

		// 这个FSM还是有点问题的
		var fsm = this._fsm = StateMachine.create({
			initial: 'hide',
			events: [
				{name: 'open', from: 'hide', to: 'show'},
				{name: 'close', from: 'show', to: 'hide'}
			],
			callbacks: {
				onenterhide: function () {
					$hideHandler.on('mousemove', onLefthoverMousemove)
				},
				onleavehide: function () {
					$hideHandler.off('mousemove', onLefthoverMousemove)
					return StateMachine.ASYNC
				},
				onentershow: function () {
					me._$dom.on('mouseout', onDomMouseout)
				},
				onleaveshow: function () {
					me._$dom.off('mouseout', onDomMouseout)
					return StateMachine.ASYNC
				},
				onbeforeopen: this._open.bind(this),
				onbeforeclose: this._close.bind(this)
			}
		})

	}


	AttachView.prototype._open = function () {
		var me = this
		var animateConfig = {}
		animateConfig[this._currentPosition] = 0
		me._$dom.show()
		this._$dom.animate(animateConfig, function () {
			me._fsm.transition()
		})
	}

	AttachView.prototype._close = function () {
		var me = this
		var animateConfig = {}
		animateConfig[this._currentPosition] = '-' + DOM_SIZE
		this._$dom.animate(animateConfig, function () {
			me._$dom.hide()
			me._fsm.transition()
		})
	}

	return AttachView
})