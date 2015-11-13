define(function (require) {
	var Resizeable = require('../../plugin/resizable')

	return function (View, SimpleView, LinearLayout) {

		/** Remove this from parent
		 ** return: this
		 */
		View.prototype.remove = function () {
			if (!this.parent()) {
				throw new Error('Can not remove root, because root has no parent')
			}

			this.parent().removeView(this)
			return this
		}


		/** Remove this from parent with nonredundant mode
		 ** return this
		 */
		View.prototype.removeNonredundant = function () {
			var me = this
			var parent

			// down
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


		/** Keep nonredundant from bottom to up
		 */
		View.prototype.keepUpNonredundant = function () {
			while (true) {
				var parent = this.parent()
				if (parent.isRoot()) {
					break
				}

				var pp = parent.parent()
				if (pp.length() == 1) {
					pp.direction(parent.detach().direction())
				} else {
					break
				}
			}
			return this
		}


		/** Remove parent but no ancestry of parent
		 ** return this
		 */
		LinearLayout.prototype.detach = function () { // todo, 名称带有歧义
			if (!this.isRoot()) {
				var parent = this.parent()
				var index = this.parent().indexOfView(this)
				this.remove()

				var len = this.length()
				for (var i = 0; i < len; i++) {
					var position = index + i
					var child = this.getViewAt(0)
					child.remove()
					parent.addViewAt(position, child)
				}
			} else {
				this.empty()
			}

			return this
		}


		/** Remove view At position `index`
		 ** index: the position
		 ** return: the removed view
		 */
		LinearLayout.prototype.removeViewAt = function (index) {
			if (index < 0 || index >= this.length()) {
				throw new Error('`index` is out of range, 0 <= index < length()')
			}


			// @日志: 注意各种引用顺序
			if (index < this.length() - 1) { // remove resizeable between prev and view
				this._resizeables.splice(index, 1)[0].off()
			}

			if (index > 0) { // remove resizeable between prev and view
				var test = this._resizeables.splice(index - 1, 1)[0]
				test.off()

			}


			var view = this._views.splice(index, 1)[0]
			view._$dom.detach()
			view._parent = null

			var prev = this._views[index - 1]
			var next = this._views[index]
			if (prev && next) {
				var plugin = new Resizeable(prev._$dom, next._$dom, this.direction()).on()
				this._resizeables.splice(index - 1, 0, plugin)
			}
			return view
		}


		/** Remove `view`
		 ** return: the removed view
		 */
		LinearLayout.prototype.removeView = function (view) {
			for (var i = 0; i < this._views.length; i++) {
				if (view == this._views[i]) {
					return this.removeViewAt(i)
				}
			}

			throw new Error('`view` is not at this')
		}


		/** Remove all child views
		 ** return: a Array of children in positive sequence
		 */
		LinearLayout.prototype.empty = function () {
			var children = []
			for (var i = this._views.length - 1; i >= 0; i--) {
				children.push(this.removeViewAt(i))
			}
			return children.reverse()
		}


	}
})