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

	/** Split with a view
	 ** view:
	 ** position: 'left' | 'right'(default)
	 */
	View.prototype.splitHorizontal = function (view, position) {
		position = position || 'right'
		var parent = this.parent()
		var index = parent.findViewAt(this)
		var flex = view.flex2()
		parent.removeViewAt(index)

		var wrap = View.createLinearLayout({
			direction: 'row'
		})
		if (position == 'left') {
			wrap.appendView(view, {flex: '1'})
			wrap.appendView(this, {flex: '1'})
		} else {
			wrap.appendView(this, {flex: '1'})
			wrap.appendView(view, {flex: '1'})
		}
		parent.addViewAt(index, wrap, {flex: flex}) // todo: 应该使用原来的flex

	}


	/** Split with a view
	 ** view:
	 ** position: 'top' | 'bottom'(default)
	 */
	View.prototype.splitVertical = function (view, position) {
		position = position || 'bottom'
		var p = this.parent()
		var index = p.findViewAt(this)
		p.removeViewAt(index)

		var wrap = View.createLinearLayout({
			direction: 'column'
		})
		if (position == 'top') {
			wrap.appendView(view, {flex: '1'})
			wrap.appendView(this, {flex: '1'})
		} else {
			wrap.appendView(this, {flex: '1'})
			wrap.appendView(view, {flex: '1'})
		}
		p.addViewAt(index, wrap, {flex: '1'})
	}

	return View
})