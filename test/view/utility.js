define(function (require) {
	var $ = require('jquery')

	return {
		createDom: function () {
			var className = 'class-' + Math.round(Math.random() * 100000000)
			$('body').append($('<div>').addClass(className))
			return '.' + className
		}
	}

})