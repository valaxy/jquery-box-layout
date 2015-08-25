define(function (require) {
	var $ = require('jquery')

	/** Base class of SimpleView & LinearLayout
	 ** Do not instance from this Class
	 */
	var View = function (options) {
		options.resizeableBefore = !!options.resizeableBefore
		options.resizeableAfter = !!options.resizeableAfter
		if (options.className) {
			this._$dom.addClass(options.className)
		}
		this._options = options // else
	}

	var extend = function (Class) {
		var v = new View({})
		delete v._$dom
		delete v._options
		Class.prototype = v
		return Class
	}


	/** options:
	 **     direction: 'row' | 'column'
	 **     -------------
	 **     [className]:
	 **     -------------
	 **     flex:
	 **     [resizeableBefore]:
	 **     [resizeableAfter]:
	 */
	var LinearLayout = function (options) {
		options = options || {}
		if (!options.direction) {
			throw new Error('direction must be exist')
		}
		this._views = []
		this._resizeables = []

		this._$dom = $('<div></div>').addClass('linear').addClass('view') // make css api
		this.direction(options.direction) // direction
		options.flex && this.flex(options.flex) // flex

		View.call(this, options)
	}


	/** options:
	 **     selector: css selector | jquery object
	 **     -------------
	 **     [className]:
	 **     -------------
	 **     [flex]:             default is auto
	 **     [resizeableBefore]: default is false, true or false between `view` and the one before `view`
	 **                         ignore when 0 view
	 **     [resizeableAfter]:  default is false, true or false between `view` and the one after `view`
	 **                         ignore when 0 view
	 */
	var SimpleView = function (options) {
		options = options || {}
		if (!options.selector) {
			throw new Error('selector must be exist')
		}

		this._$dom = $(options.selector).detach().addClass('simple').addClass('view') // make css API
		options.flex && this.flex(options.flex) // flex

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
			flex            : this.flex(),
			resizeableBefore: this._options.resizeableBefore,
			resizeableAfter : this._options.resizeableAfter
		}
	}


	View.prototype.setConfig = function (options) {
		options = options || {}
		if (options.flex !== undefined) {
			this.flex(options.flex)
		}
		if (options.resizeableBefore !== undefined) {

		}
		if (options.resizeableAfter !== undefined) {

		}
	}


	return View
})