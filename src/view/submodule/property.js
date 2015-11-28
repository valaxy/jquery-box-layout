define(function (require) {
	var OrderedNode = require('cjs!algorithm-data-structure/tree/ordered/array-ordered-node')
	var help = require('../../help/help')

	return function (View, SimpleView, LinearLayout) {

		/** Document Object Model */
		View.prototype.$dom = function () {
			return this._$dom
		}


		/** Parent View */
		View.prototype.parent = function () {
			return this._parent
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


		// flex
		View.prototype._config = function (options) {
			if (options.flex !== undefined) {
				this.flex(options.flex)
			}
		}

		/** Return json data */
		SimpleView.prototype.toJSON = function () {
			return help.removeUndefinedProperties({
				_schema  : this._schema,
				className: this._className,
				flex     : this.flex(),
				selector : this._selector,
				plugins  : this._pluginOptions
			})
		}


		/** Return json data */
		LinearLayout.prototype.toJSON = function () {
			return help.removeUndefinedProperties({
				_schema  : this._schema,
				className: this._className,
				flex     : this.flex(),
				direction: this.direction(),
				plugins  : this._pluginOptions,
				views    : this._views.map(function (view) {
					return view.toJSON()
				})
			})
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
