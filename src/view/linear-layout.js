define(function (require) {
	var $ = require('jquery')
	var View = require('./view')
	var help = require('../help/help')
	var OrderedNode = require('array-ordered-node')


	var LinearLayout = View.LinearLayout

	View.createLinearLayout = function (options) {
		return new LinearLayout(options)
	}


	/** Direction: row || column
	 */
	LinearLayout.prototype.direction = function (direction) {
		if (direction) {
			this._$dom.css('flex-direction', direction).attr('data-direction', direction)
			return this
		} else {
			return this._$dom.css('flex-direction')
		}
	}


	/** Return (index+1)-th view
	 */
	LinearLayout.prototype.getViewAt = function (index) {
		return this._views[index]
	}


	/** @Deprecated */
	LinearLayout.prototype.findViewAt = function (view) {
		for (var i = 0; i < this._views.length; i++) {
			if (view == this._views[i]) {
				return i
			}
		}
		return -1
	}

	LinearLayout.prototype.indexOfView = function (view) {
		for (var i = 0; i < this._views.length; i++) {
			if (view == this._views[i]) {
				return i
			}
		}
		return -1
	}


	LinearLayout.prototype.length = function () {
		return this._views.length
	}


	/** Get the json data
	 **/
	LinearLayout.prototype.toJSON = function () {
		var views = []
		for (var i = 0; i < this._views.length; i++) {
			views.push(this._views[i].toJSON())
		}
		return help.removeUndefinedProperties($.extend({
			_schema  : this._options._schema,
			direction: this.direction(),
			className: this._options.className,
			views    : views
		}, this.getConfig()))
	}


	LinearLayout.prototype.toTreeNode = function () {
		var node = new OrderedNode(this)

		for (var i = 0; i < this._views.length; i++) {
			var child = this._views[i].toTreeNode()
			node.addChildLast(child)
		}

		return node
	}


	LinearLayout.prototype._findAncestor = function (direction) {
		var find = this
		while (true) {
			if (!find.parent()) {
				return find
			} else if (find.direction() == direction) {
				return find
			}

			find = find.parent()
		}
	}


	LinearLayout.prototype.isRoot = function () {
		return !this.parent()
	}

	/** No parent and child is a isolate LinearLayout
	 */
	LinearLayout.prototype.isIsolate = function () {
		return this.length() == 0 && !this.parent()
	}

	return LinearLayout
})
