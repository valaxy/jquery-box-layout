define(function (require) {
	var $ = require('jquery')

	/** Base class of SimpleView & LinearLayout
	 ** Do not instance from this Class
	 */
	var View = function () {
		// do nothing
	}


	var initView = function (options) {
		options.className = options.className || ''
		options.plugins = options.plugins || {}
		this._options = options

		// className
		this._$dom.addClass(options.className)
		this._initPlugins(options.plugins)
	}

	//Object.Assign(View.prototype, EventEmitter.prototype)

	/** options:
	 **     direction: 'row' | 'column'
	 **     -------------
	 **     [className]:
	 **     -------------
	 **     flex:
	 **     [resizeableBefore]:
	 **     [resizeableAfter]:
	 *     **     className: class of dom
	 **     plugins:   map Object
	 */
	var LinearLayout = function (options) {
		options = options || {}
		options._schema = 'linear'
		if (!options.direction) throw new Error('direction must be exist in LinearLayout')

		this._views = []
		this._resizeables = []

		this._$dom = $('<flex-view></flex-view>').addClass('linear').addClass('view') // make css api
		this.direction(options.direction) // direction
		options.flex && this.flex(options.flex) // flex

		initView.call(this, options)
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
		options._schema = 'simple'
		if (!options.selector) throw new Error('selector must be exist')

		this._$dom = $(options.selector).detach().addClass('simple').addClass('view') // make css API
		options.flex && this.flex(options.flex) // flex

		initView.call(this, options)
	}


	var extend = function (Class) {
		Class.prototype = new View()
		return Class
	}

	View.SimpleView = extend(SimpleView)
	View.LinearLayout = extend(LinearLayout)

	require('./submodule/private')(View, View.SimpleView, View.LinearLayout)
	require('./submodule/removal')(View, View.SimpleView, View.LinearLayout)
	require('./submodule/insertion')(View, View.SimpleView, View.LinearLayout)
	require('./submodule/insertion-around')(View, View.SimpleView, View.LinearLayout)
	require('./submodule/css')(View, View.SimpleView, View.LinearLayout)
	require('./submodule/property')(View, View.SimpleView, View.LinearLayout)
	require('./submodule/enumeration')(View, View.SimpleView, View.LinearLayout)
	require('./submodule/search')(View, View.SimpleView, View.LinearLayout)
	require('./submodule/plugin')(View, View.SimpleView, View.LinearLayout)

	return View
})