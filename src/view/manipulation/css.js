define(function () {
	return function (View, SimpleView, LinearLayout) {

		/** Get or Set the css value of `flex`
		 ** value: any valid css flex value
		 */
		View.prototype.flex = function (value) {
			if (value !== undefined) {
				this._$dom.css('flex', value)
				return this
			} else {
				return this._$dom.css('flex')
			}
		}


		/** Get or Set the css value of `flex-direction`
		 ** value: row || column
		 */
		LinearLayout.prototype.direction = function (value) {
			if (value) {
				this._$dom.css('flex-direction', value).attr('data-direction', value)
				return this
			} else {
				return this._$dom.css('flex-direction')
			}
		}

	}
})