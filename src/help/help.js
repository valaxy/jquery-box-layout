define(function (require, exports) {

	/** Remove undefined property */
	exports.removeUndefinedProperties = function (obj) {
		for (var key in obj) {
			if (typeof obj[key] == 'undefined') {
				delete obj[key]
			}
		}
		return obj
	}
})