define(function (require, exports) {
	var treeLayout = require('src/view/tree-layout')
	var DragAndDrop = require('src/plugin/drag-and-drop')

	exports.init = function () {
		var plugins = {
			resizable: true
		}

		var root = treeLayout.init({
			_schema  : 'linear',
			direction: 'column',
			className: 'everything',
			views    : [{
				_schema         : 'simple',
				flex            : '2.01',
				selector        : '.box0',
				resizeableBefore: true,
				resizeableAfter : true
			}, {
				_schema         : 'linear',
				direction       : 'row',
				flex            : '8',
				resizeableBefore: true,
				resizeableAfter : true,
				views           : [{
					_schema         : 'linear',
					direction       : 'row',
					flex            : '5',
					resizeableBefore: true,
					resizeableAfter : true,
					views           : [{
						_schema         : 'simple',
						flex            : '1',
						selector        : '.box5',
						resizeableBefore: true,
						resizeableAfter : true

					}, {
						_schema         : 'simple',
						flex            : '1',
						selector        : '.box8',
						resizeableBefore: true,
						resizeableAfter : true
					}]
				}, {
					_schema         : 'linear',
					direction       : 'column',
					flex            : '0 200px',
					resizeableBefore: true,
					resizeableAfter : true,
					views           : [{
						_schema         : 'simple',
						flex            : '1',
						selector        : '.box1',
						resizeableBefore: true,
						resizeableAfter : true
					}, {
						_schema         : 'simple',
						flex            : '1',
						selector        : '.box2',
						resizeableBefore: true,
						resizeableAfter : true
					}]
				}, {
					_schema : 'simple',
					flex    : '5',
					selector: '.box3',
					plugins : {resizable: true}
				}, {
					_schema : 'simple',
					flex    : '1',
					selector: '.box4',
					plugins : {resizable: true}
				}, {
					_schema : 'simple',
					flex    : '0 100px',
					selector: '.box6',
					plugins : {resizable: true}
				}]
			}, {
				_schema         : 'simple',
				flex            : '0 40px',
				selector        : '.box7',
				resizeableBefore: true,
				resizeableAfter : true
			}]
		})
		$('body').append(root.$dom())

		new DragAndDrop({
			root      : root,
			ghostLayer: 'body',
			handler   : 'p',
			onDragged : function () {
				console.info('drag')
			}
		})


		console.log(root.findViewByDom($('.box3')))

		// toXXX
		console.log(root.toJSON())
		//console.lo    g(root.toTreeNode())

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