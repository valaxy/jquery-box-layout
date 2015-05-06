define(function () {
	//
	// This is base class of SimpleView & LinearLayout
	//
	var View = function (options) {
		options = options || {}
		if (options.className) {
			this._$dom.addClass(options.className)
		}
	}

	View.extend = function (Class) {
		var v = new View
		delete v._$dom
		Class.prototype = v
	}


	View.prototype.$dom = function () {
		return this._$dom
	}


	/** Get the flex-value in css
	 ** @Deprecated
	 */
	View.prototype.flex = function () {
		var flexBasis = this._$dom.css('flex-basis')
		var flexGrow = this._$dom.css('flex-grow')
		return flexGrow != '0' ? flexGrow : flexBasis
	}


	View.prototype.flex2 = function () {
		return this._$dom.css('flex')
	}


	View.prototype.parent = function () {
		return this._parent
	}


	/** Split this with `view` which will at `position`
	 ** view: the new added view
	 ** position: 'top' | 'bottom' | 'left' | 'right'
	 ** options:
	 ** return: this
	 */
	View.prototype.split = function (view, position, options) {
		// init paras
		var type = position == 'left' || position == 'right' ? 'horizontal' : 'vertical'
		var isVertical = type == 'vertical'

		// split it
		position = position || (isVertical ? 'bottom' : 'right')
		if (!this.parent()) { // root element
			var wrap = View.createLinearLayout({
				direction: isVertical ? 'column' : 'row'
			})
			var mark = this._$dom.parent()
			this._$dom.detach()

			if (position == 'top' || position == 'left') {
				wrap.appendView(view, options) // todo: 为什么$.wrap()有问题
				wrap.appendView(this, {flex: '1'})
			} else {
				wrap.appendView(this, {flex: '1'})
				wrap.appendView(view, options)
			}
			mark.append(wrap._$dom)
		} else {
			var parent = this.parent()
			var index = parent.findViewAt(this)
			parent.removeViewAt(index)

			var wrap = View.createLinearLayout({
				direction: isVertical ? 'column' : 'row'
			})

			if (position == 'top' || position == 'left') {
				wrap.appendView(view, options)
				wrap.appendView(this, {flex: '1'})
			} else {
				wrap.appendView(this, {flex: '1'})
				wrap.appendView(view, options)
			}
			parent.addViewAt(index, wrap, {flex: '1'}) // todo: check here, use 原来的 flex
		}
		return this
	}


	/** Replace this with another `view`, use original options
	 ** return: this
	 **/
	View.prototype.replaceWith = function (view) {
		var oldFlex = this.flex2()
		if (this.parent()) {
			var parent = this.parent()
			var index = parent.indexOfView(this)
			parent.removeViewAt(index)
			parent.addViewAt(index, view, {
				flex: oldFlex
			})
		} else {
			this._$dom.replaceWith(view._$dom)
		}
		return this
	}


	/** Get the original config, if it removed from LinearLayout, it will be saved
	 */
	View.prototype.getConfig = function () {
		return {
			flex: this.flex2()
		}
	}


	/** Wrap by `wrapper`
	 ** options: options of this as child of wrapper
	 ** return: this
	 */
	View.prototype.wrap = function (wrapper, options) {
		if (!(wrapper instanceof View.LinearLayout) || !(wrapper.length() == 0) || wrapper.parent()) {
			throw new Error('wrapper should be LinearLayout and empty and no parent')
		}

		if (this.parent()) {
			var thisParent = this.parent()
			var index = thisParent.indexOfView(this)
			var originalOptions = this.getConfig()
			thisParent.removeViewAt(index)
			thisParent.addViewAt(index, wrapper, originalOptions)
		} else {
			var $root = this.$dom().parent() // $root is not in any SimpleView/LinearLyaout
			this.$dom().detach()
			$root.append(wrapper.$dom())
		}

		wrapper.appendView(this, options)
		return this
	}

	return View
})