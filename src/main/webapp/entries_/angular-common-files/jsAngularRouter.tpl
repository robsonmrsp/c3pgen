/* generated: ${.now} */
define(function(require) {
	var angular = require('angular');
	require('angular-bar');
	require('smart-table');
	require('angular-route');
	require('angular-animate');

	// Filters
	require('views/components/Filters');

	// Diretivas
	require('views/components/Directives');
	<#list application.entities as entity>
	require('views/modalComponents/Modal${entity.name}Directive');
	</#list>
	
	// Servicos
	<#list application.entities as entity>
	require('views/${firstLower(entity.name)}/${firstUpper(entity.name)}Service');
	</#list>
	// Controllers
	<#list application.entities as entity>
	require('views/${firstLower(entity.name)}/Form${entity.name}Controller');
	require('views/${firstLower(entity.name)}/Page${entity.name}Controller');
	require('views/modalComponents/Modal${entity.name}Controller');
	</#list>

	// templates
	<#list application.entities as entity>
	var Form${entity.name}Template = require('text!views/${firstLower(entity.name)}/tpl/Form${entity.name}Template.html');
	var Page${entity.name}Template = require('text!views/${firstLower(entity.name)}/tpl/Page${entity.name}Template.html');
	</#list>

	var router = angular.module('Router', [ 'ngRoute' 
	<#list application.entities as entity>	                                        
		, 'Form${entity.name}Controller' 
		, 'Page${entity.name}Controller'
	</#list>		
	    ,'appFilters'
		]);
	router.config([ '$routeProvider', function($routeProvider) {
		<#list application.entities as entity>
		$routeProvider.when('/app/new${entity.name}', {
			controller : 'Form${entity.name}Controller',
			template : Form${entity.name}Template,
		});
		$routeProvider.when('/app/edit${entity.name}/:id', {
			controller : 'Form${entity.name}Controller',
			template : Form${entity.name}Template,
		});
		$routeProvider.when('/app/${firstLower(entity.name)}s', {
			controller : 'Page${entity.name}Controller',
			template : Page${entity.name}Template,
		});
		</#list>		
	} ]);
	return router;
});
