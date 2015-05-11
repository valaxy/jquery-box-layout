define(function (require) {
	var $ = require('jquery')
	var View = require('./view')
	var help = require('../help/help')
	var OrderedNode = require('array-ordered-node')

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

	SimpleView.prototype.toTreeNode = function () {
		return new OrderedNode(this)
	}


	SimpleView.prototype.isIsolate = function () {
		return !this.parent()
	}

	SimpleView.prototype.removeNonredundant = function () {
		var me = this
		var parent
		while (true) {
			parent = me.parent()
			me.remove()
			if (parent.length() != 0) {
				break
			}
			me = parent
		}
		return this
	}

	return SimpleView
})
