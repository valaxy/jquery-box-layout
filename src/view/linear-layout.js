define(function (require) {
	var $ = require('jquery')
	var Resizeable = require('../plugin/resizable')
	var View = require('./view')
	var help = require('../help/help')


	/** options:
	 **     direction: 'row' | 'column'
	 */
	var LinearLayout = function (options) {
		options.flex = String(options.flex)
		this._options = options
		this._$dom = $('<div></div>')
		this._views = []
		this._resizeables = []
		this._$dom.css('flex-direction', options.direction)

		// make css api
		this._$dom.addClass('linear').addClass('view')
		this._$dom.attr('data-direction', options.direction)
		View.call(this, options)
	}


	View.extend(LinearLayout)

	View.createLinearLayout = function (options) {
		return new LinearLayout(options)
	}

	LinearLayout.prototype.direction = function () {
		return this._$dom.css('flex-direction')
	}


	/** Return (index+1)-th view */
	LinearLayout.prototype.getViewAt = function (index) {
		return this._views[index]
	}


	/** Add view at last
	 ** view: LinearLayout or SimpleView
	 ** options:
	 **     flex: css `flex`
	 */
	LinearLayout.prototype.appendView = function (view, options) {
		this.addViewAt(this._views.length, view, options)
	}


	/** Add view at first
	 ** view: LinearLayout or SimpleView
	 ** options:
	 **     flex: css `flex`
	 */
	LinearLayout.prototype.prependView = function (view, options) {
		this.addViewAt(0, view, options)
	}


	/** Add view at specify position
	 ** index: position
	 ** view: LinearLayout or SimpleView
	 ** options:
	 **     flex: css `flex`
	 */
	LinearLayout.prototype.addViewAt = function (index, view, options) {
		view._$dom.css({
			flex: options.flex
		})
		view._parent = this

		// insert prev - current plugin
		var prev = index > 0 ? this._views[index - 1] : null
		if (prev) {
			// must delete first then insert, cannot happen at the same time
			this._resizeables.length >= index && this._resizeables.splice(index - 1, 1)[0].off()
			var resizeable = new Resizeable(prev._$dom, view._$dom, this.direction())
			this._resizeables.splice(index - 1, 0, resizeable)
		}


		// insert current - next plugin
		var next = this._views[index]
		if (next) {
			var resizeable = new Resizeable(view._$dom, next._$dom, this.direction())
			this._resizeables.splice(index, 0, resizeable)
		}


		// insert dom
		if (prev) {
			prev._$dom.after(view._$dom)
		} else if (next) {
			next._$dom.before(view._$dom)
		} else {
			//console.log(this._$dom[0]), view._$dom[0]
			this._$dom.append(view._$dom)
		}

		// insert finally
		this._views.splice(index, 0, view)
	}


	/** Remote view At position `index`:
	 ** index: the position
	 */
	LinearLayout.prototype.removeViewAt = function (index) {
		var view = this._views.splice(index, 1)[0]
		view._$dom.remove()
		view._parent = null

		if (index > 0) {
			this._resizeables.splice(index - 1, 1)[0].off()
		}
		var prev = this._views[index - 1]
		var next = this._views[index]
		if (prev && next) {
			var plugin = new Resizeable(prev._$dom, next._$dom, this.direction())
			this._resizeables.splice(index - 1, 0, plugin)
		}
	}


	LinearLayout.prototype.removeView = function (view) {
		for (var i = 0; i < this._views.length; i++) {
			if (view == this._views[i]) {
				this.removeViewAt(i)
				break
			}
		}
	}


	LinearLayout.prototype.findViewAt = function (view) {
		for (var i = 0; i < this._views.length; i++) {
			if (view == this._views[i]) {
				return i
			}
		}
		return -1
	}


	LinearLayout.prototype.length = function () {
		return this._views.length
	}


	/** Get the json data */
	LinearLayout.prototype.toJSON = function () {
		var views = []
		for (var i = 0; i < this._views.length; i++) {
			views.push(this._views[i].toJSON())
		}
		return help.removeUndefinedProperties({
			_schema: this._options._schema,
			flex: this.flex(),
			direction: this.direction(),
			className: this._options.className,
			views: views
		})
	}


	//---------------------------------------------------------
	// Advanced API
	//---------------------------------------------------------


	LinearLayout.prototype._findAncestor = function (direction) {
		var find = this
		while (true) {
			if (!find.parent()) {
				return find
			} else if (find.direction() == direction) {
				return find
			}

			find = find.parent()
		}
	}


	/** Add view at edge
	 ** direction: 'left' | 'right' | 'top' | 'bottom'
	 ** options:
	 **     flex: css `flex`
	 */
	LinearLayout.prototype.addViewAtEdge = function (view, position, options) {
		if (position == 'bottom') {
			if (this.direction() == 'row') {
				var ancestor = this._findAncestor('column')
				if (ancestor.direction() == 'column') {
					ancestor.appendView(view, options)
				} else {
					ancestor.splitVertical(view, 'bottom')
				}
			} else {
				this.appendView(view, options)
			}
		} else if (position == 'top') {

		} else if (position == 'left') {

		} else if (position == 'right') {

		}
	}

	return LinearLayout
})