define(function (require, exports) {
	var AttachView = require('../../src/view/attach-view')

	exports.init = function () {
		new AttachView({
			selector: '.left',
			direction: 'left'
		})
		new AttachView({
			selector: '.top',
			direction: 'top'
		})
		new AttachView({
			selector: '.right',
			direction: 'right'
		})
		new AttachView({
			selector: '.bottom',
			direction: 'bottom'
		})
	}
})