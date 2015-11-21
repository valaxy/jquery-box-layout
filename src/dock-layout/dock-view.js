define(function (require) {
	var $ = require('jquery')

	/**
	 * constructor
	 *      dom:        Selector | Dom
	 *      direction: 'left' | 'top' | 'right' | 'bottom'
	 */
	var DockView = function (options) {
		this._dom = $(options.dom)[0]
		this._direction = options.direction
	}

	Object.assign(DockView.prototype, {
		dom: function () {
			return this._dom
		},

		direction: function () {
			return this._direction
		}
	})

	return DockView
})