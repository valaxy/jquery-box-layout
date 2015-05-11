define(function () {
	// O is at left and top
	var Rect = function (clientRect, view) {
		this.left = clientRect.left
		this.top = clientRect.top
		this.bottom = clientRect.top + clientRect.height
		this.right = clientRect.left + clientRect.width
		this.view = view
	}

	Rect.prototype = {
		get width() {
			return this.right - this.left
		},

		get height() {
			return this.bottom - this.top
		},

		isContain: function (position) {
			return this.left <= position.left && position.left <= this.right
				&& this.top <= position.top && position.top <= this.bottom
		},

		// top | left | right | bottom | null
		in: function (p) {
			if (!this.isContain(p)) {
				return null
			}
			var leftOrBottom = this.width * (p.top - this.top) >= this.height * (p.left - this.left)
			var leftOrTop = (p.top - this.top) * this.width + (p.left - this.left) * this.height <= this.height * this.width
			if (leftOrBottom) {
				if (leftOrTop) {
					return 'left'
				} else { // rightOrBottom
					return 'bottom'
				}
			} else { // rightOrTop
				if (leftOrTop) {
					return 'top'
				} else { // rightOrBottom
					return 'right'
				}
			}
		}
	}

	return Rect
})