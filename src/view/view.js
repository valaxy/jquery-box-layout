define(function (require) {
	var $ = require('jquery')

	var View = function (options) {
		this._$dom = $(options.selector)
		this._$dom.addClass('view')
	}

	return View
})