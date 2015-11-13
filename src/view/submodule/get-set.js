define(function (require) {
	var OrderedNode = require('cjs!algorithm-data-structure/tree/ordered/array-ordered-node')

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
	}
})