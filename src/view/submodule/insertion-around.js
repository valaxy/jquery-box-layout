define(function (require) {
	var $ = require('jquery')

	return function (View, SimpleView, LinearLayout) {
		/** Create a parent layout replacing `this` and append both of `this` and `adder`, the `adder` will at `position` of parent
		 ** adder:       the new added view
		 ** position:    'top' | 'bottom' | 'left' | 'right'
		 ** wrapOptions: options of wrap view
		 ** return: this
		 */
		View.prototype.split = function (adder, position, wrapOptions) {
			if (this.isRoot()) throw new Error('Can not split root view')
			if (adder.parent()) { // todo, 添加守护函数
				adder.remove()
			}

			// init paras
			var type = (position == 'left' || position == 'right') ? 'horizontal' : 'vertical'
			var isVertical = type == 'vertical'
			position = position || (isVertical ? 'bottom' : 'right')

			var wrap = new LinearLayout($.extend(wrapOptions, {
				direction: isVertical ? 'column' : 'row'
			}))

			// split it
			var parent = this.parent()
			var index = parent.indexOfView(this)
			this.remove()

			if (position == 'top' || position == 'left') {
				wrap.appendView(adder)
				wrap.appendView(this)
			} else {
				wrap.appendView(this)
				wrap.appendView(adder)
			}

			parent.addViewAt(index, wrap)
			return this
		}


		/** Wrap by `wrapper`
		 ** return: this
		 */
		View.prototype.wrap = function (wrapper) {
			if (!(wrapper instanceof LinearLayout) || !(wrapper.isIsolate())) {
				throw new Error('wrapper should be LinearLayout and empty and no parent')
			}

			if (this.parent()) {
				this.replaceWith(wrapper)
			} else { // todo, need review
				var $root = this.$dom().parent() // $root is not in any SimpleView/LinearLayout
				this.$dom().detach()
				$root.append(wrapper.$dom())
			}

			wrapper.appendView(this)
			return this
		}


		/** Replace this with another `view`
		 ** return: this
		 **/
		View.prototype.replaceWith = function (view) {
			if (this.parent()) {
				var parent = this.parent()
				var index = parent.indexOfView(this)
				parent.removeViewAt(index)
				parent.addViewAt(index, view)
			} else { // root
				this._$dom.replaceWith(view._$dom)
			}
			return this
		}

	}
})


//// split it
//if (!this.parent()) { // root element
//	var $parent = this._$dom.parent()
//	this._$dom.detach()
//
//	// root element no need to remove from layout
//	if (position == 'top' || position == 'left') {
//		wrap.appendView(adder)
//		wrap.appendView(this)
//	} else {
//		wrap.appendView(this)
//		wrap.appendView(adder)
//	}
//	$parent.append(wrap._$dom)
//}