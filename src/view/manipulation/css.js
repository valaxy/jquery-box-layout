define(function (require) {
	return function (View) {

		/** Get or Set the css value of flex
		 */
		View.prototype.flex = function (value) {
			if (value !== undefined) {
				this._$dom.css('flex', value)
				return this
			} else {
				return this._$dom.css('flex')
			}
		}


		/** Direction: row || column
		 */
		View.LinearLayout.prototype.direction = function (direction) {
			if (direction) {
				this._$dom.css('flex-direction', direction).attr('data-direction', direction)
				return this
			} else {
				return this._$dom.css('flex-direction')
			}
		}

	}
})