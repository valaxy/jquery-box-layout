define(function (require) {
	var $ = require('jquery')
	var Resizeable = require('../../plugin/resizable')
	var help = require('../../help/help')

	return function (View) {

		/** Add view at last
		 ** view: LinearLayout or SimpleView
		 ** options:
		 **     flex: css `flex`
		 **     resizeableBefore: true or false between `view` and the one before `view`
		 **                       ignore when 0 view
		 */
		View.LinearLayout.prototype.appendView = function (view, options) {
			this.addViewAt(this._views.length, view, options)
		}


		/** Add view at first
		 ** view: LinearLayout or SimpleView
		 ** options:
		 **     flex: css `flex`
		 **     resizeableAfter: true or false between `view` and the one after `view`
		 **                      ignore when 0 view
		 */
		View.LinearLayout.prototype.prependView = function (view, options) {
			this.addViewAt(0, view, options)
		}


		/** Add view at specify position
		 ** index: position
		 ** view: LinearLayout or SimpleView
		 ** options:
		 **     flex: css `flex`
		 **     resizeableBefore: boolean(true)
		 **     resizeableAfter: boolean(true)
		 */
		View.LinearLayout.prototype.addViewAt = function (index, view, options) {
			options = $.extend({
				resizeableBefore: true, // todo, 有时这些选项不会生效, 因为依赖项还没被加到view里来
				resizeableAfter : true
			}, options)
			view._$dom.css({flex: options.flex})
			view._parent = this


			// final prev and next view
			var prev = index > 0 ? this._views[index - 1] : null
			var next = this._views[index]


			// insert after prev
			if (prev) {
				// must delete first then insert, cannot happen at the same time
				next && this._resizeables.splice(index - 1, 1)[0].off()
				var resizeable = new Resizeable(prev._$dom, view._$dom, this.direction())
				if (options.resizeableBefore) {
					resizeable.on()
				}
				this._resizeables.splice(index - 1, 0, resizeable)
			}


			// insert before next
			if (next) {
				var resizeable = new Resizeable(view._$dom, next._$dom, this.direction())
				if (options.resizeableAfter) {
					resizeable.on()
				}
				this._resizeables.splice(index, 0, resizeable)
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
		 ** options:
		 **     flex: css `flex`
		 */
		View.LinearLayout.prototype.addViewAtEdge = function (view, position, options) {
			var positionConfig = {
				bottom: 'row',
				top   : 'row',
				left  : 'column',
				right : 'column'
			}

			var direction = positionConfig[position]
			var shouldAppend = position == 'bottom' || position == 'right'
			if (this.direction() == direction) { // direction no match
				var views = this.empty()
				var wrap = new LinearLayout({
					direction: direction
				})
				for (var i = 0; i < views.length; i++) {
					wrap.appendView(views[i], views[i].getConfig()) // add original views as children
				}
				this.direction(direction == 'row' ? 'column' : 'row')
				this.appendView(wrap, {flex: '1'}) // todo, 这里参数这样配合适吗
			}
			shouldAppend ? this.appendView(view, options) : this.prependView(view, options)
		}

	}
})