define(function (require) {
	var treeLayout = require('src/view/tree-layout'),
	    SimpleView = require('src/view/simple-view'),
	    $          = require('jquery')


	// 基础的布局以及相关插件
	var layout0 = treeLayout.init({
		_schema  : 'linear',
		direction: 'row',
		flex     : '1 0 0',
		className: 'layout layout0',
		views    : [{
			_schema : 'simple',
			flex    : '1 0 0',
			selector: $('<flex-view>').text('A'),
			plugins : {resizable: true}

		}, {
			_schema : 'simple',
			flex    : '3 0 0',
			selector: $('<flex-view>').text('B'),
			plugins : {resizable: true}
		}, {
			_schema : 'simple',
			flex    : '2 0 0',
			selector: $('<flex-view>').text('B'),
			plugins : {resizable: true}
		}]
	})
	$('body').append(layout0.$dom())


	var p = $('<p>').text('测试各种add/remove之后的布局')
	var layout3 = treeLayout.init({
		_schema  : 'linear',
		direction: 'row',
		flex     : '1 0 0',
		className: 'layout layout3',
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
		}, {
			_schema : 'simple',
			flex    : '1 0 0',
			selector: $('<flex-view>').text('C'),
			plugins : {resizable: true}
		}, {
			_schema : 'simple',
			flex    : '1 0 0',
			selector: $('<flex-view>').text('D'),
			plugins : {resizable: true}
		}, {
			_schema : 'simple',
			flex    : '1 0 0',
			selector: $('<flex-view>').text('E'),
			plugins : {resizable: true}
		}, {
			_schema : 'simple',
			flex    : '1 0 0',
			selector: $('<flex-view>').text('F'),
			plugins : {resizable: true}
		}, {
			_schema : 'simple',
			flex    : '2 0 0',
			selector: $('<flex-view>').text('G'),
			plugins : {resizable: true}
		}]
	})
	layout3.removeViewAt(0)
	layout3.removeViewAt(layout3.length() - 1)
	layout3.appendView(new SimpleView({
		flex    : '1 0 0',
		selector: $('<flex-view>').text('add A'),
		plugins : {resizable: true}
	}))
	layout3.prependView(new SimpleView({
		flex    : '1 0 0',
		selector: $('<flex-view>').text('add B'),
		plugins : {resizable: true}
	}))
	layout3.removeViewAt(1)
	//layout3.getViewAt(2).replaceWith(new SimpleView({
	//	flex    : '2 0 0',
	//	selector: $('<flex-view>').text('C'),
	//	plugins : {resizable: true}
	//}))
	$('body').append(p)
	$('body').append(layout3.$dom())


	var layout1 = treeLayout.init({
		_schema  : 'linear',
		direction: 'row',
		className: 'layout layout1',
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
		className: 'layout layout2',
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