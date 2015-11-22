define(function (require) {
	require('jquery-ui/resizable')

	var getFlex = function ($dom) {
		var value = $dom.css('flex-grow')
		if (value != '0') {
			return Number(value)
		} else {
			return $dom.css('flex-basis')
		}
	}

	/** Events:
	 **     - resize-stop: resize stop */
	var Resizable = function ($dom1, $dom2, direction) {
		this._$dom1 = $dom1
		this._$dom2 = $dom2
		this._currentPosition = direction
		this._on = false
	}


	Resizable.prototype.on = function () {
		this._on = true
		var $dom1     = this._$dom1,
		    $dom2     = this._$dom2,
		    direction = this._currentPosition
		var flex1 = getFlex($dom1)
		var flex2 = getFlex($dom2)
		var sizeProperty = direction == 'row' ? 'width' : 'height'
		var maxSizeProperty = direction == 'row' ? 'maxWidth' : 'maxHeight'
		var handles = direction == 'row' ? 'e' : 's'
		var size1
		var size2

		$dom1.resizable({
			handles  : handles,
			animate  : false,
			minWidth : 40, // todo, 还需要锁定下一个窗格的大小
			minHeight: 40,
			start    : function () {
				size1 = $dom1[sizeProperty]()
				size2 = $dom2[sizeProperty]()
				flex1 = Number($dom1.css('flex-grow'))
				flex2 = Number($dom2.css('flex-grow'))
				$dom1.resizable('option', maxSizeProperty, size1 + size2)
			}
		})
		if (typeof flex1 == 'number') {
			if (typeof flex2 == 'number') { // flex, flex
				$dom1.on('resize', function (e, ui) {
					if (e.target != $dom1[0]) { // fuck it, jquery-ui event will bubble up, so judge to process
						return
					}
					var newFlex1 = ui.size[sizeProperty] / (size1 + size2) * (flex1 + flex2)
					var newFlex2 = flex1 + flex2 - newFlex1
					$dom1.css('flex-grow', newFlex1)
					$dom2.css('flex-grow', newFlex2)
					$dom1.css(sizeProperty, '') // clear the jquery-ui size setter
				})
			} else { // flex, fix
				$dom1.on('resize', function (e, ui) {
					if (e.target != $dom1[0]) {
						return
					}
					var newFlex1 = flex1 * (ui.size[sizeProperty] / size1)
					var newFlex2 = size1 + size2 - ui.size[sizeProperty] + 'px'
					$dom1.css('flex-grow', newFlex1)
					$dom2.css('flex-basis', newFlex2)
					$dom1.css(sizeProperty, '') // clear the jquery-ui size setter
				})
			}
		} else {
			if (typeof flex2 == 'number') { // fix, flex
				$dom1.on('resize', function (e, ui) {
					if (e.target != $dom1[0]) {
						return
					}
					var newFlex1 = ui.size[sizeProperty] + 'px'
					var newFlex2 = flex2 * (size1 + size2 - ui.size[sizeProperty]) / size2
					$dom1.css('flex-basis', newFlex1)
					$dom2.css('flex-grow', newFlex2)
					$dom1.css(sizeProperty, '') // clear the jquery-ui size setter
				})
			} else { // fix, fix
				$dom1.on('resize', function (e, ui) {
					if (e.target != $dom1[0]) {
						return
					}
					var newFlex1 = ui.size[sizeProperty] + 'px'
					var newFlex2 = (size1 + size2 - ui.size[sizeProperty]) + 'px'
					$dom1.css('flex-basis', newFlex1)
					$dom2.css('flex-basis', newFlex2)
					$dom1.css(sizeProperty, '') // clear the jquery-ui size setter
				})
			}
		}
		return this
	}


	Resizable.prototype.off = function () {
		if (this._on) {
			// log: This is a bug about jquery-ui.resizable, but I don't report, because the bug system of jquery-ui is really annoying
			// below is a temporary fix
			var oldFind = $.prototype.find
			$.prototype.find = function (selector) {
				if (selector == '.ui-resizable-handle') {
					arguments[0] = '>.ui-resizable-handle'
				}
				return oldFind.apply(this, arguments)
			}

			this._$dom1.resizable('destroy')

			$.prototype.find = oldFind
		}
		return this
	}

	return Resizable
})