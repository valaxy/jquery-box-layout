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


		/** Get the original config, if it removed from LinearLayout, it will be saved
		 ** Or Set config
		 */
		View.prototype.config = function (options) {
			if (options) {
				if (options.flex !== undefined) {
					this.flex(options.flex)
				}
			} else {
				return {
					flex   : this.flex(), // todo, 移除flex
					plugins: this._options.plugins
				}
			}

		}

		/** Set plugin options todo 改成可以操纵插件的API, 改成merge形式
		 ** name: plugin name
		 ** options: new plugin options
		 */
		View.prototype.plugin = function (name, options) {
			if (true === options) {
				this._options.plugins[name] = {} // no params
			} else if (typeof options != 'object') {
				delete this._options.plugins[name] // todo, 可以在遍历的时候删除吗
			}
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
			}, this.config()))
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
			}, this.config()))
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