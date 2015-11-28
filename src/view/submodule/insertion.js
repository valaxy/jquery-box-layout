define(function () {
	return function (View, SimpleView, LinearLayout) {

		/** Add view at last
		 **     view: LinearLayout or SimpleView
		 */
		LinearLayout.prototype.appendView = function (view) {
			this.addViewAt(this._views.length, view)
		}


		/** Add view at first
		 **     view: LinearLayout or SimpleView
		 */
		LinearLayout.prototype.prependView = function (view) {
			this.addViewAt(0, view)
		}


		/** Add view at specify position
		 **     index: position number
		 **     view: LinearLayout or SimpleView
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
			view._callPlugins('onAdd', this, index, view)
		}


		//---------------------------------------------------------
		// Advanced API
		//---------------------------------------------------------

		/** Add view at edge
		 ** position: 'left' | 'right' | 'top' | 'bottom'
		 ** options: flex, only use when reorder
		 */
		LinearLayout.prototype.addViewAtEdge = function (view, position, options) {
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
				var wrap = new LinearLayout($.extend(options, {
					direction: direction
				}))
				for (var i = 0; i < views.length; i++) {
					wrap.appendView(views[i]) // add original views as children
				}
				this.direction(direction == 'row' ? 'column' : 'row')
				this.appendView(wrap)
			}
			shouldAppend ? this.appendView(view) : this.prependView(view)
			return this
		}

	}
})
