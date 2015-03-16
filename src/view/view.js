define(function () {
	//
	// This is base class of SimpleView & LinearLayout
	//
	var View = function (options) {
		options = options || {}
		if (options.className) {
			this._$dom.addClass(options.className)
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