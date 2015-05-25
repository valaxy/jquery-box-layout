define(function (require) {
	var $ = require('jquery')
	var View = require('./view')
	var help = require('../help/help')
	var OrderedNode = require('array-ordered-node')


	var LinearLayout = View.LinearLayout

	View.createLinearLayout = function (options) {
		return new LinearLayout(options)
	}


	/** Return (index+1)-th view
	 */
	LinearLayout.prototype.getViewAt = function (index) {
		return this._views[index]
	}


	/** Find view which has $dom or null if not find */
	LinearLayout.prototype.findViewByDom = function ($dom) {
		var find = null
		var dom = $dom[0]
		this.toTreeNode().preorderWalk(function (node) {
			if (node.value().$dom()[0] === dom) {
				find = node.value()
				return true
			}
		})
		return find
	}


	/** Return Index */
	LinearLayout.prototype.indexOfView = function (view) {
		for (var i = 0; i < this._views.length; i++) {
			if (view == this._views[i]) {
				return i
			}
		}
		return -1
	}


	/** Count of children */
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
