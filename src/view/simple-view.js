define(function (require) {
	var $ = require('jquery')
	var View = require('./view')
	var help = require('../help/help')

	/** options:
	 **     selector: css selector | jquery object
	 */
	var SimpleView = function (options) {
		this._options = options
		this._$dom = $(options.selector).detach()

		// make css API
		this._$dom.addClass('simple').addClass('view')
		View.call(this, options)
	}

	View.extend(SimpleView)


	/** Get json data */
	SimpleView.prototype.toJSON = function () {
		return help.removeUndefinedProperties({
			_schema: this._options._schema,
			flex: this.flex(),
			selector: this._options.selector,
			className: this._options.className
		})
	}

	return SimpleView
})
