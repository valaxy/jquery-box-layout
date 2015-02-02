define(function (require, exports) {
	var treeLayout = require('../../src/view/tree-layout')

	exports.init = function () {

		var $dom = treeLayout.init({
			_schema: 'linear',
			direction: 'column',
			class: 'everything',
			views: [{
				_schema: 'view',
				flex: 2,
				selector: '.box0'
			}, {
				_schema: 'linear',
				direction: 'row',
				flex: 8,
				views: [{
					_schema: 'linear',
					direction: 'column',
					flex: 2,
					views: [{
						_schema: 'view',
						flex: 1,
						selector: '.box1'
					}, {
						_schema: 'view',
						flex: 1,
						selector: '.box2'
					}]
				}, {
					_schema: 'view',
					flex: 5,
					selector: '.box3'
				}, {
					_schema: 'view',
					flex: 1,
					selector: '.box4'
				}, {
					_schema: 'view',
					flex: '100px',
					selector: '.box5'
				}, {
					_schema: 'view',
					flex: '150px',
					selector: '.box8'
				}, {
					_schema: 'view',
					flex: 1,
					selector: '.box6'
				}]
			}, {
				_schema: 'view',
				flex: '40px',
				selector: '.box7'
			}]
		})

		$('body').append($dom)
	}
})