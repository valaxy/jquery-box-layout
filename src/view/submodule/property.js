define(function (require) {
	var OrderedNode = require('cjs!algorithm-data-structure/tree/ordered/array-ordered-node')
	var help = require('../../help/help')
	var _ = require('underscore')

	return function (View, SimpleView, LinearLayout) {

		/** Document Object Model */
		View.prototype.$dom = function () {
			return this._$dom
		}


		/** Parent View */
		View.prototype.parent = function () {
			return this._parent
		}


		/** Get the original config, if it removed from LinearLayout, it will be saved */
		View.prototype.getConfig = function () {
			return {
				flex            : this.flex(),
				resizeableBefore: this._options.resizeableBefore,
				resizeableAfter : this._options.resizeableAfter
			}
		}

		/** Set config */
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

		View.prototype.hasPlugin = function (name) {
			return true
		}

		/** Whether is isolate */
		SimpleView.prototype.isIsolate = function () {
			return !this.parent()
		}

		/** No parent and child is a isolate LinearLayout */
		LinearLayout.prototype.isIsolate = function () {
			return this.length() == 0 && !this.parent()
		}


		/** Whether is root */
		View.prototype.isRoot = function () {
			return !this.parent()
		}


		/** Each child of `this` convert to a tree node, and `this` is root */
		LinearLayout.prototype.toTreeNode = function () {
			var node = new OrderedNode
			node.value = this

			for (var i = 0; i < this._views.length; i++) {
				var child = this._views[i].toTreeNode()
				node.addChildLast(child)
			}

			return node
		}

		/** Convert to a node */
		SimpleView.prototype.toTreeNode = function () {
			var node = new OrderedNode
			node.value = this
			return node
		}


		/** Return json data */
		SimpleView.prototype.toJSON = function () {
			return help.removeUndefinedProperties($.extend({
				_schema  : this._options._schema,
				selector : this._options.selector,
				className: this._options.className
			}, this.getConfig()))
		}


		/** Return json data */
		LinearLayout.prototype.toJSON = function () {
			return help.removeUndefinedProperties($.extend({
				_schema  : this._options._schema,
				direction: this.direction(),
				className: this._options.className,
				views    : _.map(this._views, function (view) {
					return view.toJSON()
				})
			}, this.getConfig()))
		}


		/** Count of children */
		LinearLayout.prototype.length = function () {
			return this._views.length
		}


		/** Return (index+1)-th view */
		LinearLayout.prototype.getViewAt = function (index) {
			return this._views[index]
		}
	}
})