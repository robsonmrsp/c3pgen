/* generated: ${.now} */
define(function(require) {
	var appServices = require('angular').module('${entity.name}Service', []);
	appServices.factory('${entity.name}Service', [ '$http', function($http) {
		var get = function(customConfig) {
			if (!customConfig) {
				console.error('callback´s cannot be null!')
				return false;
			}
			$http.get("rs/crud/${firstLower(entity.name)}s/", {
				params : customConfig.params
			}).then(function(response) {
				customConfig.success(response.data);
			}, function(response) {
				customConfig.error(response);
			});
		};

		var getById = function(id, customConfig) {
			$http.get("rs/crud/${firstLower(entity.name)}s/" + id).then(function(response) {
				customConfig.success(response.data);
			}, function(response) {
				customConfig.error(response);
			});
		};

		var getByFilter = function(customConfig) {
			$http.get("rs/crud/${firstLower(entity.name)}s/filter/", {
				data : customConfig.data
			}).then(function(response) {
				customConfig.success(response.data);
			}, function(response) {
				customConfig.error(response);
			});
		};

		var getAll = function(customConfig) {
			$http.get("rs/crud/${firstLower(entity.name)}s/filter/", {
				data : customConfig.data
			}).then(function(response) {
				customConfig.success(response.data);
			}, function(response) {
				customConfig.error(response);
			});
		};

		var save = function(object, customConfig) {
			if (angular.isUndefined(object.id)){
				$http.post('rs/crud/${firstLower(entity.name)}s/', object).then(function(response) {
					customConfig.success(response.data);
				}, function(response) {
					customConfig.error(response);
				});
			}else{
				$http.put('rs/crud/${firstLower(entity.name)}s/' + object.id, object).then(function(response) {
					customConfig.success(response.data);
				}, function(response) {
					customConfig.error( response);
				});
			}
		};

		var remove = function(objectId, customConfig) {
			$http.delete('rs/crud/${firstLower(entity.name)}s/' + objectId).then(function(response) {
				customConfig.success(response.data);
			}, function(response) {
				customConfig.error( response);
			});
		};

		return {
			get : get,
			getById : getById,
			getByFilter : getByFilter,
			getAll : getAll,
			save : save,
			remove : remove,
			${firstLower(entity.name)}Model : {},
		}
	} ]);
});