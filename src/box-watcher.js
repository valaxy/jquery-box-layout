define(function () {

	function numberfy(str) {
		return Number(str.match(/\d+/).toString())
	}

	// options:
	//      - dir:
	//          - hor 水平方向(default)
	//          - ver 垂直方向
	//      - first: 左边或者上边的元素
	//      - second: 右边或者下边的元素
	var BoxWatcher = function (dir, first, second) {
		if (dir == 'hor') {
			if (first.type() == 0 && second.type() == 0) {
				var first = first.dom()
				var second = second.dom()

				first.resizable({
					handles: 'e'
				})

				var totalWidth
				var firstLeft

				// 拉伸开始记录原始总宽
				first.on('resizestart', function () {
					totalWidth = numberfy(first.css('width')) + numberfy(second.css('width'))
					firstLeft = numberfy(first.css('left'))
					first.resizable('option', 'maxWidth', totalWidth) // first box cannot to max
				})


				// 拉伸过程中同步改变
				first.on('resize', function () {
					var firstWidth = numberfy(first.css('width'))
					second.css({
						left: firstLeft + firstWidth,
						width: totalWidth - firstWidth
					})
				})
			} else if (first.type() == 0 && second.type() == 1) {
				var first = first.dom()
				var second = second.dom()

				first.resizable({
					handles: 'e'
				})

				var totalWidth
				var firstLeft

				// 拉伸开始记录原始总宽
				first.on('resizestart', function () {
					totalWidth = numberfy(first.css('width')) + second.width() // bug?
					firstLeft = numberfy(first.css('left'))
					first.resizable('option', 'maxWidth', totalWidth)
				})


				// 拉伸过程中同步改变
				first.on('resize', function () {
					var firstWidth = numberfy(first.css('width'))
					second.css({
						left: firstLeft + firstWidth
					})
				})
			} else if (first.type() == 1 && second.type() == 2) {
				var first = first.dom()
				var second = second.dom()

				first.resizable({
					handles: 'e'
				})

				var totalWidth
				var firstLeft

				// 拉伸开始记录原始总宽
				first.on('resizestart', function () {
					totalWidth = first.width() + numberfy(second.css('width'))
					firstLeft = numberfy(first.css('left'))
					first.resizable('option', 'maxWidth', totalWidth)
				})


				// 拉伸过程中同步改变
				first.on('resize', function () {
					var firstWidth = first.width()
					second.css({
						width: totalWidth - firstWidth
					})
				})
			} else { // 2 & 2
				var first = first.dom()
				var second = second.dom()

				first.resizable({
					handles: 'e'
				})

				var totalWidth
				var firstRight

				// 拉伸开始记录原始总宽
				first.on('resizestart', function () {
					totalWidth = numberfy(first.css('width')) + numberfy(second.css('width'))
					firstRight = numberfy(first.css('right'))
					first.resizable('option', 'maxWidth', totalWidth) // first box cannot to max
				})


				// 拉伸过程中同步改变
				first.on('resize', function () {
					var firstWidth = numberfy(first.css('width'))
					first.css({
						right: totalWidth - firstWidth
					})
					second.css({
						width: totalWidth - firstWidth
					})
				})
			}
		} else {

		}
	}


	BoxWatcher.prototype.changeFirstTo = function (size) {

	}

	if (typeof QUnit != 'undefined') {
		QUnit.module('BoxWatcher')

		QUnit.test('numberfy', function (assert) {
			assert.equal(numberfy('10px'), 10)
			assert.equal(numberfy('100%'), 100)
		})
	}

	return BoxWatcher;
})

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
