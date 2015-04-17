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


	/** Get the flex-value in css */
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


	///** Split with a view
	// ** view:
	// ** position: 'left' | 'right'(default)
	// */
	//View.prototype.splitHorizontal = function (view, position) {
	//	position = position || 'right'
	//	var parent = this.parent()
	//	var index = parent.findViewAt(this)
	//	var flex = view.flex2()
	//	parent.removeViewAt(index)
	//
	//	var wrap = View.createLinearLayout({
	//		direction: 'row'
	//	})
	//	if (position == 'left') {
	//		wrap.appendView(view, {flex: '1'})
	//		wrap.appendView(this, {flex: '1'})
	//	} else {
	//		wrap.appendView(this, {flex: '1'})
	//		wrap.appendView(view, {flex: '1'})
	//	}
	//	parent.addViewAt(index, wrap, {flex: flex}) // todo: check here, use 原来的 flex
	//
	//}
	//
	//
	//
	//View.prototype.splitVertical = function (view, position) {
	//	position = position || 'bottom'
	//	if (!this.parent()) { // root element
	//		var wrap = View.createLinearLayout({
	//			direction: 'column'
	//		})
	//		var mark = this._$dom.parent()
	//		this._$dom.detach()
	//
	//		if (position == 'top') {
	//			wrap.appendView(view, {flex: '1'}) // todo: 为什么wrap不能用
	//			wrap.appendView(this, {flex: '1'})
	//		} else {
	//			wrap.appendView(this, {flex: '1'})
	//			mark.append(wrap._$dom)
	//			wrap.appendView(view, {flex: '1'})
	//		}
	//	} else {
	//		var parent = this.parent()
	//		var index = parent.findViewAt(this)
	//		parent.removeViewAt(index)
	//
	//		var wrap = View.createLinearLayout({
	//			direction: 'column'
	//		})
	//
	//		if (position == 'top') {
	//			wrap.appendView(view, {flex: '1'})
	//			wrap.appendView(this, {flex: '1'})
	//		} else {
	//			wrap.appendView(this, {flex: '1'})
	//			wrap.appendView(view, {flex: '1'})
	//		}
	//		parent.addViewAt(index, wrap, {flex: '1'})
	//	}
	//}


	/** Split this with `view` which will at `position`
	 ** view: the new added view
	 ** position: 'top' | 'bottom' | 'left' | 'right'
	 ** options:
	 **     flex: css
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
			parent.addViewAt(index, wrap, {flex: '1'})
		}
	}

	return View
})