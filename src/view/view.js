define(function (require) {

	/** Base class of SimpleView & LinearLayout
	 ** Do not instance from this Class
	 */
	var View = function (options) {
		options = options || {}
		if (options.className) {
			this._$dom.addClass(options.className)
		}
	}

	var extend = function (Class) {
		var v = new View
		delete v._$dom
		Class.prototype = v
		return Class
	}


	/** options:
	 **     direction: 'row' | 'column'
	 */
	var LinearLayout = function (options) {
		this._options = options
		this._$dom = $('<div></div>')
		this._views = []
		this._resizeables = []


		// make css api
		this._$dom.addClass('linear').addClass('view')
		this.direction(options.direction)
		options.flex && this.flex(options.flex)
		View.call(this, options)
	}


	/** options:
	 **     selector: css selector | jquery object
	 */
	var SimpleView = function (options) {
		this._options = options
		this._$dom = $(options.selector).detach()

		// make css API
		this._$dom.addClass('simple').addClass('view')
		options.flex && this.flex(options.flex)
		View.call(this, options)
	}


	View.SimpleView = extend(SimpleView)
	View.LinearLayout = extend(LinearLayout)


	require('./manipulation/removal')(View)
	require('./manipulation/insertion')(View)
	require('./manipulation/insertion-around')(View)
	require('./manipulation/css')(View)


	View.prototype.$dom = function () {
		return this._$dom
	}


	/** Parent
	 */
	View.prototype.parent = function () {
		return this._parent
	}




	/** Get the original config, if it removed from LinearLayout, it will be saved
	 */
	View.prototype.getConfig = function () {
		return {
			flex: this.flex()
		}
	}


	return View
})