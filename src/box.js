define(function (require) {
	var BaseView = require('./base-view')

	var Box = function (type, parent, options) {
		var $dom = $(options.domSelector).detach().addClass('box')
		this._init(type, parent, $dom)
	}

	Box.prototype = new BaseView

	return Box
})