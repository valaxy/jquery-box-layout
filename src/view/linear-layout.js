define(function (require) {
	var $ = require('jquery')
	var Resizeable = require('../plugin/resizable')
	var View = require('./view')

	var LinearLayout = function (options) {
		this._$dom = $('<div></div>')
		this._views = []
		this._resizeables = []
		this._$dom.css('flex-direction', options.direction)

		// make css api
		this._$dom.addClass('linear').addClass('view')
		this._$dom.attr('data-direction', options.direction)
		View.call(this, options)
	}


	LinearLayout.prototype = new View

	LinearLayout.prototype.direction = function () {
		return this._$dom.css('flex-direction')
	}


	LinearLayout.prototype.appendView = function (view, config) {
		this.addViewAt(this._views.length, view, config)
	}

	LinearLayout.prototype.addViewAt = function (i, view, config) {
		if (typeof config.flex == 'string') {
			view._$dom.css({
				'flex-basis': config.flex
			})
		} else {
			view._$dom.css({
				'flex': String(config.flex)
			})
		}


		// insert prev - current plugin
		var prev = i > 0 ? this._views[i - 1] : null
		if (prev) {
			// must delete first then insert, cannot happen at the same time
			this._resizeables.length >= i && this._resizeables.splice(i - 1, 1)[0].off()
			var resizeable = new Resizeable(prev._$dom, view._$dom, this.direction())
			this._resizeables.splice(i - 1, 0, resizeable)
		}


		// insert current - next plugin
		var next = this._views[i]
		if (next) {
			var resizeable = new Resizeable(view._$dom, next._$dom, this.direction())
			this._resizeables.splice(i, 0, resizeable)
		}


		// insert dom
		if (prev) {
			prev._$dom.after(view._$dom)
		} else if (next) {
			next._$dom.before(view._$dom)
		} else {
			this._$dom.append(view._$dom)
		}

		// insert finally
		this._views.splice(i, 0, view)
	}


	LinearLayout.prototype.removeViewAt = function (i) {
		this._views.splice(i, 1)[0]._$dom.remove()
		if (i > 0) {
			this._resizeables.splice(i - 1, 1)[0].off()
		}
		var prev = this._views[i - 1]
		var next = this._views[i]
		if (prev && next) {
			var plugin = new Resizeable(prev._$dom, next._$dom, this.direction())
			this._resizeables.splice(i - 1, 0, plugin)
		}
	}

	return LinearLayout
})