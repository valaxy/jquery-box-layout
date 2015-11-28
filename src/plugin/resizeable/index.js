define(function (require) {
	var Resizeable = require('./jqueryui-resizable')
	/** Used in SimpleView */

	// @log, 旧版本的jquery-ui 1.10.5有bug, 一定要升级到最新版!!!!

	return {
		onInit: function() {
			this._resizeables = []
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
				resizable.on() // todo, if (prevView.hasPlugin('resizable'))
				linearLayout._resizeables.splice(prevIndex, 0, resizable)
			}

			// apply resizeable on view between nextView
			if (nextView) {
				var resizeable = new Resizeable(view.$dom(), nextView.$dom(), linearLayout.direction())
				resizeable.on()
				linearLayout._resizeables.splice(index, 0, resizeable)
			}
		},

		onRemove: function (options, linearLayout, index, view) {
			var prevIndex = index - 1
			var prevView = linearLayout.getViewAt(prevIndex)
			var nextView = linearLayout.getViewAt(index)

			// remove resizable between view and next
			if (nextView) {
				linearLayout._resizeables.splice(index, 1)[0].off()
			}

			// remove resizable between prev and view
			if (index < linearLayout.length() - 1) { // todo, 这里为什么不能用 if (prevView)
				var resizable = linearLayout._resizeables.splice(prevIndex, 1)[0]
				resizable.off()
			}

			// apply resizable between
			if (prevView && nextView) {
				var resizable = new Resizeable(prevView.$dom(), nextView.$dom(), linearLayout.direction())
				resizable.on()
				linearLayout._resizeables.splice(prevIndex, 0, resizable)
			}
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