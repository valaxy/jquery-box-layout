define(function (require) {
	var help = require('../../help/help')

	return function (View, SimpleView, LinearLayout) {


		/** Add view at last
		 **     view: LinearLayout or SimpleView
		 ** Event:
		 **     addView(index, view): trigger when add view
		 */
		View.LinearLayout.prototype.appendView = function (view) {
			this.addViewAt(this._views.length, view)
		}


		/** Add view at first
		 **     view: LinearLayout or SimpleView
		 ** Event:
		 **     addView(index, view): trigger when add view
		 */
		View.LinearLayout.prototype.prependView = function (view) {
			this.addViewAt(0, view)
		}


		// hook when add view
		LinearLayout.prototype._onAddView = function (index, view) {
			for (var pluginName in view._pluginHandlers) {
				var pluginOptions = view._options.plugins[pluginName]
				var plugin = view._pluginHandlers[pluginName]
				plugin.onAdd && plugin.onAdd.call(view, pluginOptions, this, index, view)
			}
		}

		/** Add view at specify position
		 **     index: position number
		 **     view: LinearLayout or SimpleView
		 ** Event:
		 **     addView(index, view): trigger when add view
		 */
		LinearLayout.prototype.addViewAt = function (index, view) {
			view._parent = this
			var prevIndex = index - 1
			var nextIndex = index
			var prev = this._views[prevIndex]  // prev is before the `view` after adding
			var next = this._views[nextIndex]  //  next is after the `view` after adding

			// insert dom
			if (prev) {
				prev.$dom().after(view.$dom())
			} else if (next) {
				next.$dom().before(view.$dom())
			} else { // only one in array
				this.$dom().append(view.$dom())
			}

			// insert view
			this._views.splice(index, 0, view)

			// plugin process
			this._onAddView(index, view)
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