define(function (require, exports) {

	exports.each = function (array, invoke, context) {
		context = context ? context : this;
		var i;
		for (i = 0; i < array.length; i++) {
			if (invoke.call(context, array[i], i) === false) {
				break;
			}
		}
		return i; // index when end
	};


	// options:
	//      - array:
	//      - invoke:
	//      - break:
	//      - done:
	//      - context:
	exports.iterate = function (options) {
		var array = options.array;
		var context = options.context ? options.context : this;
		var invoke = options.invoke;
		var _break = options.break;
		var done = options.done;
		var isBreak = false;
		for (var i = 0; i < array.length; i++) {
			if (typeof invoke.call(context, array[i], i) != 'undefined') {
				isBreak = true;
				break;
			}
		}
		if (isBreak) {
			return _break.call(context, array[i], i);
		} else {
			return done.call(context);
		}
	};


});