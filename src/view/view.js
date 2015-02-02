define(function (require) {

	var View = function (options) {
		// _$dom
		console.log(options)
		if (options && options.class) {
			this._$dom.addClass(options.class)
		}
	}

	View.extend = function (Class) {

	}

	View.prototype.flex = function () {

	}

	View.prototype.isFlexInParent = function () {

	}

	return View
})