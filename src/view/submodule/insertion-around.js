define(function () {

	return function (View, SimpleView, LinearLayout) {
		/** Create a parent layout replacing `this` and append both of `this` and `adder`, the `adder` will at `position` of parent
		 ** adder:        the new added view
		 ** position:     'top' | 'bottom' | 'left' | 'right'
		 ** adderOptions: new options of adder
		 ** thisOptions:  new options of this
		 ** return: this
		 */
		View.prototype.split = function (adder, position, adderOptions, thisOptions) {
			if (adder.parent()) {
				adder.remove()
			}

			// init paras
			var type = (position == 'left' || position == 'right') ? 'horizontal' : 'vertical'
			var isVertical = type == 'vertical'
			position = position || (isVertical ? 'bottom' : 'right')


			// split it
			if (!this.parent()) { // root element
				var wrap = new View.LinearLayout({
					direction       : isVertical ? 'column' : 'row',
					resizeableAfter : true,  // todo
					resizeableBefore: true
				})
				var $parent = this._$dom.parent()
				this._$dom.detach()

				// root element no need to remove from layout
				adder.setConfig(adderOptions)
				this.setConfig(thisOptions)
				if (position == 'top' || position == 'left') {
					wrap.appendView(adder)
					wrap.appendView(this)
				} else {
					wrap.appendView(this)
					wrap.appendView(adder)
				}
				$parent.append(wrap._$dom)
			} else {
				var parent = this.parent()
				var index = parent.indexOfView(this)
				var oldOptions = this.getConfig()
				this.remove()
				var wrap = new LinearLayout({
					direction       : isVertical ? 'column' : 'row',
					resizeableAfter : true, // todo
					resizeableBefore: true
				})

				adder.setConfig(adderOptions)
				this.setConfig(thisOptions)
				if (position == 'top' || position == 'left') {
					wrap.appendView(adder)
					wrap.appendView(this)
				} else {
					wrap.appendView(this)
					wrap.appendView(adder)
				}

				wrap.setConfig(oldOptions)
				parent.addViewAt(index, wrap)
			}
			return this
		}


		/** Wrap by `wrapper`
		 ** options: options of this as child of wrapper
		 ** return: this
		 */
		View.prototype.wrap = function (wrapper, options) {
			if (!(wrapper instanceof View.LinearLayout) || !(wrapper.isIsolate())) {
				throw new Error('wrapper should be LinearLayout and empty and no parent')
			}

			if (this.parent()) {
				var thisParent = this.parent()
				var index = thisParent.indexOfView(this)
				var originalOptions = this.getConfig()
				thisParent.removeViewAt(index)
				wrapper.setConfig(originalOptions)
				thisParent.addViewAt(index, wrapper)
			} else {
				var $root = this.$dom().parent() // $root is not in any SimpleView/LinearLayout
				this.$dom().detach()
				$root.append(wrapper.$dom())
			}

			this.setConfig(options)
			wrapper.appendView(this)
			return this
		}


		/** Replace this with another `view` which uses options of this
		 ** return: this
		 **/
		View.prototype.replaceWith = function (view) {
			if (this.parent()) {
				var parent = this.parent()
				var index = parent.indexOfView(this)
				parent.removeViewAt(index)
				view.setConfig(this.getConfig())
				parent.addViewAt(index, view)
			} else { // root
				this._$dom.replaceWith(view._$dom)
			}
			return this
		}

	}
})