/* generated: ${.now} */
define(function(require) {
	var angular = require('angular');
	var $ = require('adapters/jquery-adapter');
	require('utilities/NgUtils');
	var appControllers = angular.module('Page${entity.name}Controller', [ 'smart-table' 
	,'${entity.name}Service'
	,'appDirectives' 
	,'NgUtils'
 	<#list entity.relationships as rel >
		<#if rel.viewAproach.type == 'combo'>
	,'${rel.model}Service'
		</#if>
	</#list>
 	<#list entity.relationships as rel >
		<#if rel.viewAproach.type == 'modal'>
	,'Modal${rel.model}Directive'
		</#if>
	</#list>
	]);

	appControllers.controller('Page${entity.name}Controller', [ '$scope'
			,'$location'
		 	,'${entity.name}Service' 
		 	,'NgUtils'
 	<#list entity.relationships as rel >
		<#if rel.viewAproach.type == 'combo'>
			,'${rel.model}Service'
		</#if>
	</#list>			 
		 	  
	, function($scope 
			,$location 
			,${entity.name}Service 
			,NgUtils
 	<#list entity.relationships as rel >
		<#if rel.viewAproach.type == 'combo'>
			,${rel.model}Service
		</#if>
	</#list>			 
			) {
///////////////////////////////____INICIO_____/////////////////////////////////////////////////////////////		
		initialize = function() {
		<#list entity.relationships as rel >
			<#if rel.viewAproach.type == 'combo'>
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
			<#if rel.viewAproach.type == 'modal'>
		$scope.postSelect${firstUpper(rel.name)} = function(${firstLower(rel.name)}) {
			console.log('$scope.postSelect${firstUpper(rel.name)}' + JSON.stringify(${firstLower(rel.name)}));
		};
			</#if>
		</#list>		
		initialize();
		
		$scope.${firstLower(entity.name)}Filter = {};

		$scope.query${entity.name}s = function() {
			console.log('Chamando $scope.query${entity.name}s');
			$scope.get${entity.name}s();
		}

		$scope.reset = function() {
			$scope.c3pForm.reset();
			$scope.${firstLower(entity.name)}Filter = {};
		};
		
		$scope.new${entity.name} = function() {
			${entity.name}Service.${firstLower(entity.name)}Model = {};
			$location.path('/app/new${entity.name}');
		};

		$scope.editaItem = function(${firstLower(entity.name)}) {
			${entity.name}Service.${firstLower(entity.name)}Model = ${firstLower(entity.name)};
			$location.path('/app/edit${entity.name}/' + ${firstLower(entity.name)}.id)
		}

		$scope.pager${entity.name}s = {};

		$scope.gridState = {};

		$scope.get${entity.name}s = function() {
			${entity.name}Service.get({
				success : function(pager) {
					$scope.pager${entity.name}s = pager;
					NgUtils.refreshGridState(pager, $scope.gridState);
				},

				error : function(errorMessage) {
					console.error(errorMessage)
				},

				params : NgUtils.fixGridParameters($scope.${firstLower(entity.name)}Filter, $scope.gridState),
			});
		};
		$scope.removeItem = function(${firstLower(entity.name)}) {
			NgUtils.Bootbox.confirm("Tem certeza que deseja remover o registro [ " + ${firstLower(entity.name)}.id + "] ?", function(yes) {
				if (yes) {
					${entity.name}Service.remove(${firstLower(entity.name)}.id, {
						success : function() {
							$scope.get${entity.name}s();
							NgUtils.showMessage('success', 'Registro removido com sucesso!');
						},
						error : function(_resp) {
							NgUtils.showMessage('error', 'Problemas ao remover registro!');
							console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
						}
					});
				}
			});
		};
	} ]);
});
