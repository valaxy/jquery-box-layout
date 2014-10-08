define(function (require, exports) {
	var BaseView = require('./base-view');
	var BoxView = require('./box');
	var BoxWatcher = require('./boxWatcher');

	var grammar = require('../../utility/grammar');


	function setDefault(options) {
		options = _.extend({
			isHor: true
		}, options);

		this._boxes = []; // 子类box
		this._autoIndex = -1; // auto box的索引
		this._isHor = options.isHor; // 是否是水平布局, 否则是垂直布局
		this.$dom.attr('data-orient', this._isHor ? 'hor' : 'ver');
		return options;
	}

	function createView(boxConfig, parent, type) {
		if (boxConfig._schema == 'box') {
			return new BoxView({
				parent: parent,
				type: type,
				domSelector: boxConfig.domSelector
			});
		} else { // linerlayout
			return new LinearLayout({
				parent: parent,
				type: type,
				isHor: boxConfig.isHor,
				boxes: boxConfig.boxes
			});
		}
	}


	function initType0Boxes(configBoxes) {
		var margin1 = 0;
		grammar.iterate({
			array: configBoxes,
			context: this,
			invoke: function (boxConfig) {
				if (boxConfig.size != 'auto') {
					var view = createView(boxConfig, this, 0);
					view._setSize({
						margin1: margin1,
						size: boxConfig.size
					});
					this._boxes.push(view);
					this.$dom.append(view.$dom);
					margin1 += boxConfig.size;
				} else {
					return false;
				}
			},
			break: function (boxConfig, i) {
				this._autoIndex = i;
			}
		});
		return margin1;
	}

	function initType1Box(margin1, configBoxes) {
		var margin2 = 0;
		grammar.each(configBoxes.slice(this._autoIndex + 1), function (box) {
			margin2 += box.size;
		});
		var view = createView(configBoxes[this._autoIndex], this, 1);
		view._setSize({
			margin1: margin1,
			margin2: margin2
		});
		this._boxes.push(view);
		this.$dom.append(view.$dom);
		return margin2;
	}

	function initType2Boxes(configBoxes) {
		var margin2 = 0;
		grammar.each(configBoxes.slice(this._autoIndex + 1), function (box) {
			var view = createView(box, this, 2);
			view._setSize({
				size: box.size,
				margin2: margin2
			});
			this._boxes.push(view);
			this.$dom.append(view.$dom);
			margin2 += box.size;   // 奇怪的赋值??????????
		}, this);
	}

	function addResizable(isHor) {
		for (var i = 1; i < this._boxes.length; i++) {
			new BoxWatcher({
				dir: isHor ? 'hor' : 'ver',
				first: this._boxes[i - 1].$dom,
				second: this._boxes[i].$dom
			});
		}
	}

	function addBorder(isHor) {
		var key = isHor ? 'border-right' : 'border-bottom';
		grammar.each(this._boxes.slice(0, -1), function (box) {
			box.$dom.css(key, '1px solid #262829'); // #todo
		});
	}


	//	isHor: true,
	//		boxes: [],       // 必填
	//		size: 'auto'     // 必填
	var LinearLayout = function (options) {
		BaseView.call(this, options);
		options = setDefault.call(this, options);

		var margin1 = initType0Boxes.call(this, options.boxes);
		initType1Box.call(this, margin1, options.boxes);
		initType2Boxes.call(this, options.boxes);
		addResizable.call(this, options.isHor);
		addBorder.call(this, options.isHor);

		return this;
	};

	LinearLayout.prototype = new BaseView();

	LinearLayout.prototype.getChild = function (index) {
		return this._boxes[index];
	};

	LinearLayout.prototype.setChildSize = function (childIndex, size) {
		var child = this.getChild(childIndex);
		var oldSize = child._size();
		child._setSize({
			isHor: this._isHor,
			size: size
		});
		if (childIndex < this._autoIndex) {
			for (var i = childIndex + 1; i <= this._autoIndex; i++) {
				this._boxes[i]._setSize({
					isHor: this._isHor,
					margin1: this._boxes[i]._margin1() + size - oldSize
				});
			}
		} else {
			for (var i = childIndex - 1; i >= this._autoIndex; i--) {
				this._boxes[i]._setSize({
					isHor: this._isHor,
					margin2: this._boxes[i]._margin2() + size - oldSize
				});
			}
		}
	};

	return LinearLayout;

});