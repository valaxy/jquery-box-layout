requirejs.config({
	baseUrl: '../../',
	paths  : {
		'jquery'                  : 'node_modules/jquery/dist/jquery',
		'jquery-ui'               : 'node_modules/jquery-ui/ui',
		'underscore'              : 'node_modules/underscore/underscore',
		'algorithm-data-structure': 'node_modules/algorithm-data-structure/dest/',
		'state-machine'           : 'node_modules/javascript-state-machine/state-machine',
		'eventEmitter'            : 'node_modules/wolfy87-eventemitter/EventEmitter',

		// requireJS
		'cjs'       : 'node_modules/cjs/cjs',
		'amd-loader': 'node_modules/amd-loader/amd-loader',

		// development
		'chance': 'node_modules/chance/chance'
	}
})