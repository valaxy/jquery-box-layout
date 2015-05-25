define(function (require, exports) {
	var treeLayout = require('src/view/tree-layout')
	var DragAndDrop = require('src/plugin/drag-and-drop')

	exports.init = function () {
		var root = treeLayout.init({
			_schema  : 'linear',
			direction: 'column',
			className: 'everything',
			views    : [{
				_schema : 'simple',
				flex    : '2.01',
				selector: '.box0'
			}, {
				_schema         : 'linear',
				direction       : 'row',
				flex            : '8',
				resizeableBefore: false,
				views           : [{
					_schema  : 'linear',
					direction: 'row',
					flex     : '5',
					views    : [{
						_schema : 'simple',
						flex    : '1',
						selector: '.box5'
					}, {
						_schema : 'simple',
						flex    : '1',
						selector: '.box8'
					}]
				}, {
					_schema  : 'linear',
					direction: 'column',
					flex     : '0 200px',
					views    : [{
						_schema : 'simple',
						flex    : '1',
						selector: '.box1'
					}, {
						_schema : 'simple',
						flex    : '1',
						selector: '.box2'
					}]
				}, {
					_schema : 'simple',
					flex    : '5',
					selector: '.box3'
				}, {
					_schema : 'simple',
					flex    : '1',
					selector: '.box4'
				}, {
					_schema : 'simple',
					flex    : '0 100px',
					selector: '.box6'
				}]
			}, {
				_schema         : 'simple',
				flex            : '0 40px',
				selector        : '.box7',
				resizeableBefore: false
			}]
		})
		$('body').append(root.$dom())

		new DragAndDrop({
			root      : root,
			ghostLayer: 'body'
		})


		console.log(root.findViewByDom($('.box3')))

		// toXXX
		//console.log(root.toJSON())
		//console.log(root.toTreeNode())

		//// record and recover
		//var data = root.toJSON()
		//var root2 = treeLayout.init(data)
		//root.$dom().remove()
		//$('body').append(root2.$dom())
		//
		//// bind event
		//root2.$dom().on('resizestop', function () {
		//	console.log(root2.toJSON())
		//})
	}
})