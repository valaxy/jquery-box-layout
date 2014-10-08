define(function (require, exports) {
	var BaseView = require('./base-view');

	var Box = function (options) {
		options.$dom = $(options.domSelector).detach();
		options.$dom.addClass('box');
		BaseView.call(this, options);
	};

	Box.prototype = new BaseView;

	return Box;
});