define(function (require) {
	require('jquery-ui')


	var Resizable = function ($dom1, $dom2, direction) {
		var flex1
		var flex2
		if (direction == 'row') {
			$dom1.resizable({
				handles: 'e',
				animate: false,
				start: function () {
					flex1 = Number($dom1.css('flex-grow'))
					flex2 = Number($dom2.css('flex-grow'))
				},
				resize: function (e, ui) {
					var flex = (flex1 * flex2 * ui.size.width) /
						((flex1 + flex2) * ui.originalSize.width - flex1 * ui.size.width)
					$dom1.css('flex', '' + flex)
					$dom1.css('width', '') // clear the size
				}
			})
		} else { // column
			$dom1.resizable({
				handles: 's',
				animate: false,
				start: function () {
					flex1 = Number($dom1.css('flex-grow'))
					flex2 = Number($dom2.css('flex-grow'))
				},
				resize: function (e, ui) {
					var flex = (flex1 * flex2 * ui.size.height) /
						((flex1 + flex2) * ui.originalSize.height - flex1 * ui.size.height)
					$dom1.css('flex', '' + flex)
					$dom1.css('height', '') // clear the width
				}
			})
		}
	}

	return Resizable
})