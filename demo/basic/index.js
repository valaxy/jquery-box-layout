define(function (require, exports) {

	var boxLayout = require('../../src/box-layout');

	exports.init = function () {

		var $dom = boxLayout.init({
			_schema: 'linear',
			size: 'auto',
			isHor: false,
			isPer: false,
			boxes: [{
				_schema: 'box',
				size: 100,
				domSelector: '.box0'
			}, {
				_schema: 'linear',
				isHor: true,
				size: 'auto',
				isPer: false,
				boxes: [{
					_schema: 'linear',
					isHor: false,
					size: 300,
					isPer: true,
					boxes: [{
						_schema: 'box',
						size: 50,
						domSelector: '.box1'
					}, {
						_schema: 'box',
						size: 'auto',
						domSelector: '.box2'
					}]
				}, {
					_schema: 'box',
					size: 'auto',
					domSelector: '.box3'
				}]
			}]
		})

		$('.everything').append($dom)
	}
})