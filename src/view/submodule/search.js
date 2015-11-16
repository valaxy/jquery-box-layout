define(function () {
	return function (View, SimpleView, LinearLayout) {
		/** Find view which has $dom or null if not find */
		LinearLayout.prototype.findViewByDom = function ($dom) {
			var find = null
			var dom = $dom[0]
			this.toTreeNode().preorderWalk(function (node) {
				if (node.value.$dom()[0] === dom) {
					find = node.value
					return true
				}
			})
			return find
		}
	}
})