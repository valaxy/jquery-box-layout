define(function (require) {
	var Resizeable = require('./resizable')

	/** Used in SimpleView */

	return {
		onAdd: function (linearLayout, simpleView, index) {
			//var prevIndex = index - 1
			//var afterIndex = index + 1
			//var prevView = linearLayout.getViewAt(prevIndex)
			//var nextView = linearLayout.getViewAt(nextIndex)
			//
			//// @record: must delete resizeable module first then insert, because added resizeable will override the old one
			//if (prevView && nextView) {
			//	linearLayout._resizeables.splice(prevIndex, 1)[0].off()
			//}
			//
			//// apply resizeable on prevView
			//if (prevView) {
			//	var resizeable = new Resizeable(prevView.$dom(), simpleView.$dom(), linearLayout.direction())
			//	if (prev._options.resizeableAfter && view._options.resizeableBefore) {
			//		resizeable.on()
			//	}
			//	this._resizeables.splice(prevIndex, 0, resizeable)
			//}


			//// insert resizeable before next
			//if (next) {
			//	var resizeable = new Resizeable(view._$dom, next._$dom, this.direction())
			//	if (view._options.resizeableAfter && next._options.resizeableBefore) {
			//		resizeable.on()
			//	}
			//	this._resizeables.splice(nextIndex, 0, resizeable)
			//}
		},

		onRemove: function (linearLayout, simpleView, index) {

		}
	}
})