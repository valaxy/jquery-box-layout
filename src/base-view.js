define(function (require, exports) {

	var MARGIN1_KEY = ['top', 'left'];
	var SIZE_KEY = ['height', 'width'];
	var MARGIN2_KEY = ['bottom', 'right'];


	function setDefault(options) {
		options = $.extend({
			$dom: $('<div></div>')
		}, options);
		this._type = options.type;
		this._parent = options.parent;
		this.$dom = options.$dom.addClass('box').css({ // 必须加, 因为有可能多次改动
			left: 0,
			right: 0,
			top: 0,
			bottom: 0,
			width: 'auto',
			height: 'auto',
			border: 'none'
		}).show(); // @todo 历史遗留问题 $dom 而不是 _$dom
	}

	function init(options) {
		if (this._parent) {
			var css = { };
			var isHor = this._parent._isHor ? 1 : 0;
			utility.invoke(this._type, {
				0: function () {
					css[MARGIN1_KEY[isHor]] = options.margin1 + 'px';
					css[SIZE_KEY[isHor]] = options.size + 'px';
					css[MARGIN2_KEY[isHor]] = 'auto';
				},
				1: function () {
					css[MARGIN1_KEY[isHor]] = options.margin1 + 'px';
					css[SIZE_KEY[isHor]] = 'auto';
					css[MARGIN2_KEY[isHor]] = options.margin2 + 'px';
				},
				2: function () {
					css[MARGIN1_KEY[isHor]] = 'auto';
					css[SIZE_KEY[isHor]] = options.size + 'px';
					css[MARGIN2_KEY[isHor]] = options.margin2 + 'px';
				}
			});
			this.$dom.css(css);
		}
	}


	// options:
	//      - $dom: 可选
	//      - parent: 必填
	//      - type:
	//          - 0 由第一边框确定位置
	//          - 1 由双边确定位置
	//          - 2 由第二边框确定位置
	//      - margin1: 第一边框边距
	//      - size: 盒子的大小
	//      - margin2: 第二边框边距
	var BaseView = function (options) {
		setDefault.call(this, options);
		init.call(this, options);
	};

	BaseView.prototype._margin1 = function () {
		return this.$dom.css(MARGIN1_KEY[this._parent._isHor ? 1 : 0]).extractNumber();
	};

	BaseView.prototype._margin2 = function () {
		return this.$dom.css(MARGIN2_KEY[this._parent._isHor ? 1 : 0]).extractNumber();
	};

	BaseView.prototype._size = function () {
		return this.$dom.css(SIZE_KEY[this._parent._isHor ? 1 : 0]).extractNumber();
	};

	BaseView.prototype._setSize = function (options) {
		var css = { };
		var isHor = this._parent._isHor ? 1 : 0;
		if (options.margin1) {
			css[MARGIN1_KEY[isHor]] = options.margin1 + 'px';
		}
		if (options.size) {
			css[SIZE_KEY[isHor]] = options.size + 'px';
		}
		if (options.margin2) {
			css[MARGIN2_KEY[isHor]] = options.margin2 + 'px';
		}
		this.$dom.css(css);
	};

	return BaseView;

});

