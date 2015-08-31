({

	baseUrl : "../../src/main/webapp/js",
	name : "main",
	optimizeCss : "standard.keepLines",
	inlineText : true,
	 mainConfigFile : "../../src/main/webapp/js/main.js",
	removeCombined : true,
	include : [ "../../webapp/vendor/require/require" ],
	exclude : [],
	optimize : "uglify2",
	out :  "../../src/main/webapp/javascript/main-built.js",
})
