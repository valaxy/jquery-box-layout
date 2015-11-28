define(function (require) {
	var Resizeable = require('./jqueryui-resizable')
	/** Used in SimpleView */

	// @log, 旧版本的jquery-ui 1.10.5有bug, 一定要升级到最新版!!!!

	return {
		onInit: function (options, view) {
			view._resizeables = []
		},

		onAdd: function (options, linearLayout, index, view) {
			var prevIndex = index - 1
			var nextIndex = index + 1
			var prevView = linearLayout.getViewAt(prevIndex)
			var nextView = linearLayout.getViewAt(nextIndex)

			// @record: must delete resizeable module first then insert, because added resizeable will override the old one
			if (prevView && nextView) {
				linearLayout._resizeables.splice(prevIndex, 1)[0].off()
			}

			// apply resizeable on prevView between simpleView
			if (prevView) {
				var resizable = new Resizeable(prevView.$dom(), view.$dom(), linearLayout.direction())
				resizable.on()
				linearLayout._resizeables.splice(prevIndex, 0, resizable)
			}

			// apply resizeable on view between nextView
			if (nextView) {
				var resizeable = new Resizeable(view.$dom(), nextView.$dom(), linearLayout.direction())
				resizeable.on()
				linearLayout._resizeables.splice(index, 0, resizeable)
			}

			//console.log('onAdd index: %s, length: %s, rlength: %s', index, linearLayout.length(), linearLayout._resizeables.length)
		},

		onRemove: function (options, linearLayout, index, view) {
			var prevIndex = index - 1
			var prevView = linearLayout.getViewAt(prevIndex)
			var nextView = linearLayout.getViewAt(index)
			//console.log('onRemove begin index: %s, length: %s, rlength: %s', index, linearLayout.length(), linearLayout._resizeables.length)

			// remove resizable between view and next
			if (nextView) { // index < linearLayout.length() - 1
				linearLayout._resizeables.splice(index, 1)[0].off()
			}

			// remove resizable between prev and view
			if (prevView) {
				var resizable = linearLayout._resizeables.splice(prevIndex, 1)[0]
				resizable.off()
			}

			// apply resizable between
			if (prevView && nextView) {
				var resizable = new Resizeable(prevView.$dom(), nextView.$dom(), linearLayout.direction())
				resizable.on()
				linearLayout._resizeables.splice(prevIndex, 0, resizable)
			}

			//console.log('onRemove end index: %s, length: %s, rlength: %s', index, linearLayout.length(), linearLayout._resizeables.length)
		},

		onChange: function () {

		}
	}
})


//	if (prev._options.resizeableAfter && view._options.resizeableBefore) {
//		resizeable.on()
//	}

//  if (view._options.resizeableAfter && next._options.resizeableBefore) {
//	    resizeable.on()
//  }