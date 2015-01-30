define(function (require) {
	var $ = require('jquery')

	var LinearLayout = function (options) {
		this._$dom = $('<div></div>')
		this._$dom.addClass('linear')
		this._views = []
		this._$dom.css('-webkit-box-orient', options.orient)
	}

	LinearLayout.prototype.orient = function () {
		return this._$dom.css('-webkit-box-orient')
	}

	LinearLayout.prototype.appendView = function (view, config) {
		view._$dom.css({
			'-webkit-box-flex': config.flex + ''
		})
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