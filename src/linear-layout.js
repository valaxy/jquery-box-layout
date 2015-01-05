define(function (require) {
	var BaseView = require('./base-view')
	var BoxView = require('./box')
	var BoxWatcher = require('./box-watcher')


	var iterate = require('bower_components/candy.js/src/iterate')


	function setDefault(options) {
		this._boxes = [] // 子类box
		this._autoBoxIndex = -1 // auto box的索引
		this._isHor = options.isHor // 是否是水平布局, 否则是垂直布局
		this._isPer = options.isPer
		this.$dom.attr('data-orient', this._isHor ? 'hor' : 'ver')
		this.$dom.addClass('linear')
	}

	function createView(boxConfig, parent, type) {
		if (boxConfig._schema == 'box') {
			return new BoxView(type, parent, boxConfig)
		} else { // linerlayout
			return new LinearLayout(type, parent, boxConfig)
		}
	}

	function initType0(configBoxes) {
		var margin1 = 0 // margin-left or margin-top
		iterate.array({
			array: configBoxes,
			context: this,
			invoke: function (boxConfig) {
				if (boxConfig.size != 'auto') {
					var view = createView(boxConfig, this, 0)
					view._setSize({
						margin1: margin1,
						size: boxConfig.size
					})
					this._boxes.push(view)
					this.$dom.append(view.$dom)
					margin1 += boxConfig.size
				} else {
					return false // break
				}
			},
			break: function (boxConfig, i) {
				this._autoBoxIndex = i
			}
		})
		return margin1
	}


	function initType1(margin1, configBoxes) {
		var margin2 = 0
		iterate.array({
			array: configBoxes.slice(this._autoBoxIndex + 1),
			invoke: function (box) {
				margin2 += box.size;
			}
		})

		var view = createView(configBoxes[this._autoBoxIndex], this, 1);
		view._setSize({
			margin1: margin1,
			margin2: margin2
		});
		this._boxes.push(view);
		this.$dom.append(view.$dom);
		return margin2
	}

	function initType2(configBoxes) {
		var margin2 = 0 // margin-right or margin-bottom
		iterate.array({
			array: configBoxes.slice(this._autoBoxIndex + 1),
			invoke: function (box) {
				var view = createView(box, this, 2);
				view._setSize({
					size: box.size,
					margin2: margin2
				})
				this._boxes.push(view);
				this.$dom.append(view.$dom);
				margin2 += box.size   // 奇怪的赋值??????????
			}
		})
	}


	/**
	 *
	 * @param options
	 *      - isHor: <Boolean> default is true
	 *      - boxes: <Array> child configs
	 *      - size: 'auto' or Number
	 */
	var LinearLayout = function (type, parent, options) {
		var $dom = $('<div></div>')
		this._init(type, parent, $dom)
		setDefault.call(this, options)

		// create child dom
		var margin1 = initType0.call(this, options.boxes)
		initType1.call(this, margin1, options.boxes)
		initType2.call(this, options.boxes)
	}


	LinearLayout.prototype = new BaseView

	return LinearLayout
})


//function addResizable(isHor) {
//	for (var i = 1; i < this._boxes.length; i++) {
//		new BoxWatcher({
//			dir: isHor ? 'hor' : 'ver',
//			first: this._boxes[i - 1].$dom,
//			second: this._boxes[i].$dom
//		});
//	}
//}


//LinearLayout.prototype.getChild = function (index) {
//	return this._boxes[index];
//};


//LinearLayout.prototype.setChildSize = function (childIndex, size) {
//	var child = this.getChild(childIndex);
//	var oldSize = child._size();
//	child._setSize({
//		isHor: this._isHor,
//		size: size
//	});
//	if (childIndex < this._autoBoxIndex) {
//		for (var i = childIndex + 1; i <= this._autoBoxIndex; i++) {
//			this._boxes[i]._setSize({
//				isHor: this._isHor,
//				margin1: this._boxes[i]._margin1() + size - oldSize
//			});
//		}
//	} else {
//		for (var i = childIndex - 1; i >= this._autoBoxIndex; i--) {
//			this._boxes[i]._setSize({
//				isHor: this._isHor,
//				margin2: this._boxes[i]._margin2() + size - oldSize
//			});
//		}
//	}
//};