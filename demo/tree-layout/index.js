define(function (require, exports) {
	var treeLayout = require('../../src/view/tree-layout')

	exports.init = function () {
		var root = treeLayout.init({
			_schema: 'linear',
			direction: 'column',
			className: 'everything',
			views: [{
				_schema: 'simple',
				flex: '2',
				selector: '.box0'
			}, {
				_schema: 'linear',
				direction: 'row',
				flex: '8',
				views: [{
					_schema: 'linear',
					direction: 'column',
					flex: '2',
					views: [{
						_schema: 'simple',
						flex: '1',
						selector: '.box1'
					}, {
						_schema: 'simple',
						flex: '1',
						selector: '.box2'
					}]
				}, {
					_schema: 'simple',
					flex: '5',
					selector: '.box3'
				}, {
					_schema: 'simple',
					flex: '1',
					selector: '.box4'
				}, {
					_schema: 'simple',
					flex: '100px',
					selector: '.box5'
				}, {
					_schema: 'simple',
					flex: '150px',
					selector: '.box8'
				}, {
					_schema: 'simple',
					flex: '1',
					selector: '.box6'
				}]
			}, {
				_schema: 'simple',
				flex: '40px',
				selector: '.box7'
			}]
		})
		$('body').append(root.$dom())

		// record and recover
		var data = root.toJSON()
		var root2 = treeLayout.init(data)
		root.$dom().remove()
		$('body').append(root2.$dom())

		// bind event
		root2.$dom().on('resizestop', function () {
			console.log(root2.toJSON())
		})
	}
})