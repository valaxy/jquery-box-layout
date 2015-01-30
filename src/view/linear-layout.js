define(function (require) {
	var $ = require('jquery')
	var Resizeable = require('../plugin/resizable')

	var LinearLayout = function (options) {
		this._$dom = $('<div></div>')
		this._views = []
		this._$dom.css('flex-direction', options.direction)


		// make css api
		this._$dom.addClass('linear').addClass('view')
		this._$dom.attr('data-direction', options.direction)
	}


	LinearLayout.prototype.direction = function () {
		return this._$dom.css('flex-direction')
	}


	LinearLayout.prototype.appendView = function (view, config) {
		view._$dom.css({
			'flex': config.flex + ''
		})
		if (this._views.length > 0) {
			new Resizeable(this._views[this._views.length - 1]._$dom, view._$dom, this.direction())
		}

		this._$dom.append(view._$dom)
		this._views.push(view)
	}

	LinearLayout.prototype.updateView = function (view, config) {

	}

	LinearLayout.prototype.removeViewAt = function (i) {
		this._boxes[i].$dom.remove()
		this._boxes.splice(i, 1)

	}

	LinearLayout.prototype._check = function () {

	}

	return LinearLayout
})