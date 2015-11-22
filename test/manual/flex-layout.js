define(function (require) {
	var treeLayout = require('src/view/tree-layout'),
	    $          = require('jquery')


	var layout1 = treeLayout.init({
		_schema  : 'linear',
		direction: 'row',
		className: 'layout1',
		plugins  : {resizable: true},
		views    : [{
			_schema  : 'linear',
			direction: 'column',
			flex     : '1 0 0',
			plugins  : {resizable: true},
			views    : [{
				_schema : 'simple',
				flex    : '2 0 0',
				selector: $('<flex-view>').text('A'),
				plugins : {resizable: true}

			}, {
				_schema : 'simple',
				flex    : '1 0 0',
				selector: $('<flex-view>').text('B'),
				plugins : {resizable: true}
			}]
		}, {
			_schema  : 'linear',
			direction: 'column',
			flex     : '2 0 0',
			plugins  : {resizable: true},
			views    : [{
				_schema : 'simple',
				flex    : '1 0 0',
				selector: $('<flex-view>').text('C'),
				plugins : {resizable: true}
			}, {
				_schema : 'simple',
				flex    : '1 0 0',
				selector: $('<flex-view>').text('D'),
				plugins : {resizable: true}
			}]
		}]
	})
	$('body').append(layout1.$dom())


	var layout2 = treeLayout.init({
		_schema  : 'linear',
		direction: 'column',
		className: 'layout2',
		views    : [{
			_schema : 'simple',
			flex    : '1 0 0',
			selector: $('<flex-view>').text('A'),
			plugins : {resizable: true}
		}, {
			_schema  : 'linear',
			direction: 'column',
			flex     : '1 0 0',
			plugins  : {resizable: true},
			views    : [{
				_schema : 'simple',
				flex    : '1 0 0',
				selector: $('<flex-view>').text('B'),
				plugins : {resizable: true}
			}, {
				_schema : 'simple',
				flex    : '1 0 0',
				selector: $('<flex-view>').text('C'),
				plugins : {resizable: true}
			}]
		}, {
			_schema : 'simple',
			flex    : '1 0 0',
			selector: $('<flex-view>').text('D'),
			plugins : {resizable: true}
		}]
	})
	$('body').append(layout2.$dom())
})