define(function (require) {
	var $ = require('jquery')

	/** Base class of SimpleView & LinearLayout
	 ** Do not instance from this Class
	 */
	var View = function () {
		// do nothing
	}


	var initView = function (options) {
		this._className = options.className || ''
		this.flex(options.flex || '1 0 0')
		this._initPlugins(options.plugins)
		this._$dom.addClass(this._className)
	}


	/** options:
	 **     direction:   'row' | 'column'
	 **     [className]: class add to dom
	 **     [flex]:      default is 1 0 0px
	 **     [plugins]:   options
	 */
	var LinearLayout = function (options) {
		options = options || {}
		if (!options.direction) throw new Error('direction must be exist in LinearLayout')

		this._schema = 'linear'
		this._views = []
		this._$dom = $('<flex-view></flex-view>').addClass('linear').addClass('view') // make css api
		this.direction(options.direction) // direction

		initView.call(this, options)
	}


	/** options:
	 **     selector:    css selector | jquery object | dom object
	 **     [className]: class add to dom
	 **     [flex]:      default is 1 0 0px
	 **     [plugins]:   options
	 */
	var SimpleView = function (options) {
		options = options || {}
		if (!$(options.selector).length) throw new Error('dom of selector must be exist in SimpleView')

		this._schema = 'simple'
		this._selector = options.selector
		this._$dom = $(this._selector).detach().addClass('simple').addClass('view') // make css API

		initView.call(this, options)
	}


	var extend = function (Class) {
		Class.prototype = new View()
		return Class
	}

	View.SimpleView = extend(SimpleView)
	View.LinearLayout = extend(LinearLayout)

	require('./submodule/private')(View, SimpleView, LinearLayout)
	require('./submodule/removal')(View, SimpleView, LinearLayout)
	require('./submodule/insertion')(View, SimpleView, LinearLayout)
	require('./submodule/insertion-around')(SimpleView, LinearLayout)
	require('./submodule/css')(View, SimpleView, LinearLayout)
	require('./submodule/property')(View, SimpleView, LinearLayout)
	require('./submodule/enumeration')(View, SimpleView, LinearLayout)
	require('./submodule/search')(View, SimpleView, LinearLayout)
	require('./submodule/plugin')(View, SimpleView, LinearLayout)

	return View
})


//Object.Assign(View.prototype, EventEmitter.prototype)