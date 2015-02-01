define(function (require) {
	require('jquery-ui')

	var getFlex = function ($dom) {
		var value = $dom.css('flex-basis')
		if (value == '') {
			return Number($dom.css('flex-grow'))
		} else {
			return value
		}
	}

	var Resizable = function ($dom1, $dom2, direction) {
		var flex1 = getFlex($dom1)
		var flex2 = getFlex($dom2)
		var sizeProperty = direction == 'row' ? 'width' : 'height'
		var maxSizeProperty = direction == 'row' ? 'maxWidth' : 'maxHeight'
		var handles = direction == 'row' ? 'e' : 's'

		var size1
		var size2
		$dom1.resizable({
			handles: handles,
			animate: false,
			start: function () {
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
					var newFlex1 = ui.size[sizeProperty] / (size1 + size2) * (flex1 + flex2)
					var newFlex2 = flex1 + flex2 - newFlex1
					$dom1.css('flex-grow', newFlex1)
					$dom2.css('flex-grow', newFlex2)
					$dom1.css(sizeProperty, '') // clear the jquery-ui size setter
				})
			} else { // flex, fix
				$dom1.on('resize', function (e, ui) {
					var newFlex1 = flex1 + flex1 / size1 * (ui.size[sizeProperty] - size1)
					var newFlex2 = size1 + size2 - ui.size[sizeProperty]
					$dom1.css('flex-grow', newFlex1)
					$dom2.css('flex-basis', newFlex2)
					$dom1.css(sizeProperty, '') // clear the jquery-ui size setter
				})
			}
		} else {
			if (typeof flex2 == 'number') { // fix, flex
				$dom1.on('resize', function (e, ui) {
					var newFlex1 = ui.size[sizeProperty]
					var newFlex2 = flex2 - flex2 / size2 * (ui.size[sizeProperty] - size1)
					$dom1.css('flex-basis', newFlex1)
					$dom2.css('flex-grow', newFlex2)
					$dom1.css(sizeProperty, '') // clear the jquery-ui size setter
				})
			} else { // fix, fix
				$dom1.on('resize', function (e, ui) {
					var newFlex1 = ui.size[sizeProperty]
					var newFlex2 = (size1 + size2 - newFlex1) + 'px'
					$dom1.css('flex-basis', newFlex1)
					$dom2.css('flex-basis', newFlex2)
					$dom1.css(sizeProperty, '') // clear the jquery-ui size setter
				})
			}
		}
	}

	return Resizable
})