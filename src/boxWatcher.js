define(function (require, exports) {



	// options:
	//      - dir:
	//          - hor 水平方向(default)
	//          - ver 垂直方向
	//      - first: 左边或者上边的元素
	//      - second: 右边或者下边的元素
	var BoxWatcher = function (options) {
		if (options.dir == 'hor') {
			// 只有左边的可以拉伸
			options.first.resizable({
				handles: 'e'
			});

			var totalWidth;
			var firstLeft;

			// 拉伸开始记录原始总宽
			options.first.on('resizestart', function () {
				totalWidth = options.first.width() + options.second.width(); // @todo 有BUG
				firstLeft = options.first.css('left');
				firstLeft = Number(firstLeft.match(/\d+/).toString());
				options.first.resizable('option', 'maxWidth', totalWidth);
			});


			// 拉伸过程中同步改变
			options.first.on('resize', function () {
				var firstWidth = options.first.width();
				options.second.css('left', firstLeft + firstWidth + 1).css('width', totalWidth - firstWidth); // @TODO +1??
			});
		} else {

		}

	};


	BoxWatcher.prototype.changeFirstTo = function (size) {

	};

	return BoxWatcher;
});

//			// 只有上边的可以拉伸
//			options.first.resizable({
//				handles: 's'
//			});
//
//			var totalWidth;
//			var firstLeft;
//
//			// 拉伸开始记录原始总宽
//			options.first.on('resizestart', function () {
//				totalWidth = options.first.height() + options.second.height();
//				firstLeft = options.first.css('top');
//				firstLeft = Number(firstLeft.match(/\d+/).toString());
//				options.first.resizable('option', 'maxHeight', totalWidth);
//			});
//
//
//			// 拉伸过程中同步改变
//			options.first.on('resize', function () {
//				var firstWidth = options.first.height();
//				options.second.css('top', firstLeft + firstWidth).css('height', totalWidth - firstWidth);
//			});
