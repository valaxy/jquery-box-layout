define(function (require) {
	var $ = require('jquery')
	var View = require('./view')

	var SimpleView = function (options) {
		this._$dom = $(options.selector).detach()

		// make css API
		this._$dom.addClass('view')
	}

	SimpleView.prototype = new View

	return SimpleView
})