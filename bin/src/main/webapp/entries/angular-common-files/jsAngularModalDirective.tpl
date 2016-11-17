/* generated: ${.now} */
define(function(require) {
	var $ = require('adapters/jquery-adapter');
	var angular = require('angular');
	var appDirectives = angular.module('Modal${entity.name}Directive', [ 'Modal${entity.name}Controller' ]);

	var Modal${entity.name}Template = require('text!views/modalComponents/tpl/Modal${entity.name}Template.html');

	appDirectives.directive('c3pModal${onlyFirstUpper(entity.name)}', [ '$window', '$parse', '$timeout', function($window, $parse, $timeout) {

		var fnPostSelect = null;
		var modalId = '';
		var modalValue = '';
		var modalFieldId = '';
		var	modalFieldValue =''

		var localPostSelect = function(${firstLower(entity.name)}) {
			if (${firstLower(entity.name)}) {
				angular.element('#' + modalFieldId).val(${firstLower(entity.name)}[modalId]).trigger("change");
				angular.element('#' + modalFieldValue).val(${firstLower(entity.name)}[modalValue]).trigger("change");
			}
		}

		return {
			restrict : 'A',
			controller : 'Modal${entity.name}Controller',
			scope : {},
			template : Modal${entity.name}Template,

			link : function(scope, element, attributes) {
				var $modal = element.find('.modal');

				modalId = attributes.c3pModalId;
				modalValue = attributes.c3pModalValue;
				
				modalFieldId = attributes.c3pModalFieldId;
				modalFieldValue = attributes.c3pModalFieldValue;

				fnPostSelect = scope.$eval(attributes.c3pModalPostSelect);

				$modal.on('hide.bs.modal', function() {
					if (scope.${firstLower(entity.name)}) {
						localPostSelect(scope.${firstLower(entity.name)});
						if (fnPostSelect) {
							fnPostSelect(scope.${firstLower(entity.name)});
						}
					}
				});
				//
				$timeout(function() {
					angular.element('#' + attributes.c3pModalDisplay).click(function() {
						$modal.modal('show');
					});
				}, 100);
			}
		}
	} ]);
});

