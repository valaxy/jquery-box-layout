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


	View.prototype.$dom = function () {
		return this._$dom
	}


	/** Get the flex-value in css */
	View.prototype.flex = function () {
		var flexBasis = this._$dom.css('flex-basis')
		var flexGrow = this._$dom.css('flex-grow')
		return flexGrow != '0' ? flexGrow : flexBasis
	}


	View.prototype.isFlexInParent = function () {

	}

	return View
})