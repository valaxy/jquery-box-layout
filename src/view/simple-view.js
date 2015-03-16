define(function (require) {
	var $ = require('jquery')
	var View = require('./view')

	var SimpleView = function (options) {
		options.flex = String(options.flex)
		this._options = options
		this._$dom = $(options.selector).detach()

		// make css API
		this._$dom.addClass('simple').addClass('view')
		View.call(this, options)
	}

	SimpleView.prototype = new View


	/** Get json data */
	SimpleView.prototype.toJSON = function () {
		return {
			_schema: this._options._schema,
			flex: this.flex(),
			selector: this._options.selector,
			className: this._options.className
		}
	}

	return SimpleView
})
