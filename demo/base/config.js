requirejs.config({
	baseUrl: '../../',
	paths  : {
		'jquery'    : 'bower_components/jquery/dist/jquery',
		'jquery-ui' : 'bower_components/jquery-ui/jquery-ui',
		'chance'    : 'bower_components/chance/chance',
		'underscore': 'bower_components/underscore/underscore'
	},
	map    : {
		'*': {
			'array-ordered-node': 'bower_components/algorithm-data-structure/src/tree/ordered/array-ordered-node'
		}
	}
})