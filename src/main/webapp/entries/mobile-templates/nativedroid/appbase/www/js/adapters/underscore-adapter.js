define([ 'underscore', ], function(_) {

	_.templateSettings = {
		interpolate : /\{\{(.+?)\}\}/g
	};
	return _
});
