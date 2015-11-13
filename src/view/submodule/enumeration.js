define(function () {

	return function (View, SimpleView, LinearLayout) {

		/** Enum all SimpleView */
		LinearLayout.prototype.eachSimpleView = function (fn) {
			this.toTreeNode().postorderWalk(function (node) {
				var view = node.value
				if (view instanceof SimpleView) {
					fn(view)
				}
			})
		}
	}
})