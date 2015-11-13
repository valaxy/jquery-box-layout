define(function (require) {
	var $ = require('jquery')
	var View = require('./view')
	var help = require('../help/help')
	var OrderedNode = require('cjs!algorithm-data-structure/tree/ordered/array-ordered-node')

	var SimpleView = View.SimpleView


	/** Initialize function
	 ** options:
	 */
	View.createSimpleView = function (options) {
		return new SimpleView(options)
	}

	/** Get json data */
	SimpleView.prototype.toJSON = function () {
		return help.removeUndefinedProperties($.extend({
			_schema  : this._options._schema,
			selector : this._options.selector,
			className: this._options.className
		}, this.getConfig()))
	}




	SimpleView.prototype.isIsolate = function () {
		return !this.parent()
	}


	return SimpleView
})
