define(function (require) {
	var BaseView = require('./base-view')
	var $ = require('jquery')

	var Box = function (type, parent, options) {
		var $dom = $(options.domSelector).detach().addClass('box')
		this._init(type, parent, $dom)
	}

	$.extend(Box.prototype, BaseView.prototype)

	return Box
})