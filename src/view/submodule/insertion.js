define(function (require) {
	var Resizeable = require('../../plugin/resizable')
	var help = require('../../help/help')

	return function (View) {

		/** Add view at last
		 ** view: LinearLayout or SimpleView
		 */
		View.LinearLayout.prototype.appendView = function (view) {
			this.addViewAt(this._views.length, view)
		}


		/** Add view at first
		 ** view: LinearLayout or SimpleView
		 */
		View.LinearLayout.prototype.prependView = function (view) {
			this.addViewAt(0, view)
		}


		/** Add view at specify position
		 ** index: position number
		 ** view: LinearLayout or SimpleView
		 */
		View.LinearLayout.prototype.addViewAt = function (index, view) {
			view._parent = this
			var prevIndex = index - 1
			var nextIndex = index
			var prev = index > 0 ? this._views[prevIndex] : null // prev is before the `view` after adding
			var next = this._views[nextIndex]                    //  next is after the `view` after addding


			// must delete first then insert
			if (prev && next) {
				this._resizeables.splice(prevIndex, 1)[0].off()
			}

			// insert resizeable after prev
			if (prev) {
				var resizeable = new Resizeable(prev._$dom, view._$dom, this.direction())
				if (prev._options.resizeableAfter && view._options.resizeableBefore) {
					resizeable.on()
				}
				this._resizeables.splice(prevIndex, 0, resizeable)
			}


			// insert resizeable before next
			if (next) {
				var resizeable = new Resizeable(view._$dom, next._$dom, this.direction())
				if (view._options.resizeableAfter && next._options.resizeableBefore) {
					resizeable.on()
				}
				this._resizeables.splice(nextIndex, 0, resizeable)
			}


			// insert dom
			if (prev) {
				prev._$dom.after(view._$dom)
			} else if (next) {
				next._$dom.before(view._$dom)
			} else {
				this._$dom.append(view._$dom)
			}

			// insert finally
			this._views.splice(index, 0, view)
		}


		//---------------------------------------------------------
		// Advanced API
		//---------------------------------------------------------

		/** Add view at edge
		 ** position: 'left' | 'right' | 'top' | 'bottom'
		 */
		View.LinearLayout.prototype.addViewAtEdge = function (view, position) {
			var positionConfig = {
				bottom: 'row',
				top   : 'row',
				left  : 'column',
				right : 'column'
			}

			var direction = positionConfig[position]
			var shouldAppend = position == 'bottom' || position == 'right'
			if (this.direction() == direction) { // if direction not match then reorder
				var views = this.empty()
				var wrap = new View.LinearLayout({
					direction: direction,
					flex     : '1 1 0'// todo, 这里的flex是多少?, 这里要调整算法
				})
				for (var i = 0; i < views.length; i++) {
					wrap.appendView(views[i]) // add original views as children
				}
				this.direction(direction == 'row' ? 'column' : 'row')
				this.appendView(wrap)
			}
			shouldAppend ? this.appendView(view) : this.prependView(view)
		}

	}
})


//options = $.extend({
//	resizeableBefore: true, // todo, 有时这些选项不会生效, 因为依赖项还没被加到view里来
//	resizeableAfter : true
//}, options)
//view._$dom.css({flex: options.flex})