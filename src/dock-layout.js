define(function (require) {
	var DockView = require('./dock-layout/dock-view')
	var _ = require('underscore')

	/**
	 * options:
	 *      domSize:         '200px'(default)
	 */
	var DockLayout = function (options) {
		options = options || {}
		options.domSize = options.domSize ? options.domSize : '200px'
		this._options = options

		this._views = []
		this._showView = null
		this._$wraps = {
			left  : null,
			top   : null,
			right : null,
			bottom: null
		}

		for (var direction in this._views) {
			this._addWrap(direction)
		}

	}


	Object.assign(DockLayout.prototype, {
		_addWrap: function (direction) {
			var $wrap = $('<div>').css({
				position: 'absolute',
				display : 'none',
				left    : 0,
				top     : 0,
				right   : 0,
				bottom  : 0,
				height  : 'auto',
				width   : 'auto'
			}).addClass('wrap').attr('data-direction', direction)

			switch (direction) {
				case 'left':
					$wrap.css({right: 'auto', width: this._options.domSize})
					break
				case 'top':
					$wrap.css({bottom: 'auto', height: this._options.domSize})
					break
				case 'right':
					$wrap.css({left: 'auto', width: this._options.domSize})
					break
				case 'bottom':
					$wrap.css({top: 'auto', height: this._options.domSize})
					break
			}

			this._$wraps[direction] = $wrap
		},


		/**
		 * Get all dock views
		 */
		views: function () {
			return this._views
		},

		/**
		 * Add a new Dock view
		 * @param options
		 *      dom:        Selector | Dom
		 *      direction: 'left' | 'top' | 'right' | 'bottom'
		 */
		addView: function (options) {
			var views = this._views
			var doms = _.map(views, function (view) {
				return view.dom
			})
			if (_.indexOf(doms, options.dom) >= 0) {
				throw new Error('view exists')
			}
			var dockView = new DockView(options)
			this._views.push(dockView)
			return dockView
		},

		/**
		 * Remove a Dock view
		 * @param view
		 */
		removeView: function (view) {
			var views = this._views
			var index = _.indexOf(views, view)
			if (index < 0) {
				throw new Error('view not exists')
			}
			return views.splice(index, 1)[0]
		},

		show: function (view) {

		},

		hide: function () {

		}
	})

	return DockLayout
})

//*      popTriggerSize: '20px'(default)
