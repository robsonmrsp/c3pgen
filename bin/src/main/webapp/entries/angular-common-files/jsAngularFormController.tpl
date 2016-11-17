/* generated: ${.now} */
define(function(require) {
	var angular = require('angular');
	var $ = require('adapters/jquery-adapter');
	require('utilities/NgUtils');
	var appControllers = angular.module('Form${entity.name}Controller', [ 'smart-table' 
	,'${entity.name}Service'
	,'appDirectives' 
	,'NgUtils'
 	<#list entity.relationships as rel >
		<#if rel.viewApproach.type == 'combo'>
	,'${rel.model}Service'
		</#if>
	</#list>
 	<#list entity.relationships as rel >
		<#if rel.viewApproach.type == 'modal'>
	,'Modal${rel.model}Directive'
		</#if>
	</#list>
	]);

	appControllers.controller('Form${entity.name}Controller', [ '$scope'
			,'$location'
		 	,'${entity.name}Service' 
		 	,'NgUtils'
 	<#list entity.relationships as rel >
		<#if rel.viewApproach.type == 'combo'>
			,'${rel.model}Service'
		</#if>
	</#list>			 
		 	  
	, function($scope 
			,$location 
			,${entity.name}Service 
			,NgUtils
 	<#list entity.relationships as rel >
		<#if rel.viewApproach.type == 'combo'>
			,${rel.model}Service
		</#if>
	</#list>			 
			) {
///////////////////////////////____INICIO_____/////////////////////////////////////////////////////////////

		$scope.${firstLower(entity.name)}Model = ${entity.name}Service.${firstLower(entity.name)}Model;
		
		initialize = function() {
			var idModel = NgUtils.getPathId($location.path());
			if (!$scope.${firstLower(entity.name)}Model.id && idModel) {
				${entity.name}Service.getById(idModel, {
					success : function(${firstLower(entity.name)}) {
						$scope.${firstLower(entity.name)}Model = ${firstLower(entity.name)}
					},
					error : function(errorMessage) {
						console.info('Não foi possivel obter o registro : ' + JSON.stringify($scope.${firstLower(entity.name)}Model) + ' [ ' + errorMessage + ' ] ');
					}
				});
			}
		<#list entity.relationships as rel >
			<#if rel.viewApproach.type == 'combo'>
			${firstUpper(rel.model)}Service.getAll({
				success : function(${firstLower(rel.model)}s) {
					$scope.${firstLower(rel.model)}s = ${firstLower(rel.model)}s;
				},
				error : function(errorMessage) {
					NgUtils.showMessage('error', 'Problema ao recuperar registros: ' + ' [ ' + errorMessage + ' ] ');
				}
			});
			</#if>
		</#list>
		};
		<#list entity.relationships as rel >
			<#if rel.viewApproach.type == 'modal'>
		$scope.postSelect${firstUpper(rel.name)} = function(${firstLower(rel.name)}) {
			console.log('$scope.postSelect${firstUpper(rel.name)}' + JSON.stringify(${firstLower(rel.name)}));
		};
			</#if>
		</#list>		
		initialize();
		
		$scope.onSave = function(andContinue) {
			${entity.name}Service.save($scope.${firstLower(entity.name)}Model, {
				success : function(${firstLower(entity.name)}) {
					if(!andContinue)
						NgUtils.goPage('app/${firstLower(entity.name)}s');

					$scope.c3pForm.reset();
					$scope.${firstLower(entity.name)}Model = {};
					
					NgUtils.showMessage('success', 'Registro salvo com sucesso!');
				},
				error : function(errorMessage) {
					NgUtils.showMessage('error', 'Problema ao salvar registro: ');
					console.info('Não foi possivel salvar o usuário : ' + JSON.stringify($scope.${firstLower(entity.name)}Model) + ' [ ' + errorMessage + ' ] ');
				}
			});
		};

		$scope.customValidation = function() {
			console.info('calling customValidation');
		};

		$scope.backList = function() {
			console.log($scope.${firstLower(entity.name)}Model);
			${entity.name}Service.${firstLower(entity.name)}Model = {};
			$location.path('/app/${firstLower(entity.name)}s');
		};

		$scope.onBeforeSave = function() {
			console.info('calling beforeSave');
		};

		$scope.onAfterSave = function() {
			console.info('calling afterSave');
		};
	} ]);
});
