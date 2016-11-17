/* generated: ${.now} */
define(function(require) {
	var angular = require('angular');
	require('utilities/NgUtils');
	var $ = require('adapters/jquery-adapter');
	var appControllers = angular.module('Modal${entity.name}Controller', [ 'smart-table', '${entity.name}Service', 'appDirectives', 'NgUtils' ]);
	appControllers.controller('Modal${entity.name}Controller', [ '$scope', '$location', '${entity.name}Service', 'NgUtils', function($scope, $location, ${entity.name}Service, NgUtils) {
		initialize = function() {

		};

		initialize();

		$scope.pager${entity.name}s = {};

		$scope.gridState = {};

		$scope.${firstLower(entity.name)}Parameters = {	};

		$scope.${firstLower(entity.name)}Selected = function(${firstLower(entity.name)}) {
			$scope.${firstLower(entity.name)} = ${firstLower(entity.name)};
		}

		$scope.query${entity.name}s = function() {
			console.log('Chamando $scope.query${entity.name}s');
			$scope.get${entity.name}s();
		}

		$scope.get${entity.name}s = function() {
			${entity.name}Service.get({
				success : function(pager) {
					$scope.pager${entity.name}s = pager;
					NgUtils.refreshModalGridState(pager, $scope.gridState);
				},

				error : function(errorMessage) {
					console.error(errorMessage)
				},

				params : NgUtils.fixModalGridParameters($scope.${firstLower(entity.name)}Parameters, $scope.gridState),
			});
		}
	} ]);
});
