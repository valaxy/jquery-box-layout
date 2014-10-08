define(function (require, exports) {

	var LinearLayout = require('../../src/linear-layout');

	exports.init = function () {

		var rootLayout = new LinearLayout({
			parent: null,
			_schema: 'linear',
			isHor: false,
			boxes: [
				{
					_schema: 'box',
					size: 100,
					domSelector: '.box0'
				},
				{
					_schema: 'linear',
					isHor: true,
					size: 'auto',
					boxes: [
						{
							_schema: 'linear',
							isHor: false,
							size: 300,
							boxes: [
								{
									_schema: 'box',
									size: 200,
									domSelector: '.box1'
								},
								{
									_schema: 'box',
									size: 'auto',
									domSelector: '.box2'
								}
							]
						},
						{
							_schema: 'box',
							size: 'auto',
							domSelector: '.box3'
						}
					]
				}
			]
		});

		$('.everything').append(rootLayout.$dom);

	}
});