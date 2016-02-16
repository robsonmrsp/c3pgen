//NAO MEXA NESSA BAGACA
define(function(require) {
	var $ = require('adapters/jquery-adapter');
	var angular = require('angular');
	var appDirectives = angular.module('appDirectives', []);

	appDirectives.directive('c3pNumeric', [ '$window', '$parse', '$timeout', function($window, $parse, $timeout) {
		var options = {
			places : 2,
		};

		return {
			restrict : 'A',
			link : function(scope, element, attributes) {
				var opts = angular.extend({}, options, scope.$eval(attributes.c3pNumericOptions));

				// necessário para que no momento em que o pluguin for chamado,
				// já tenhamos valor no mesmo para se aplicar o format e não
				// perdermos o controle de virgulas e pontos..
				$timeout(function() {
					element.formatNumber(opts);
				}, 100);
			}
		}
	} ]);

	appDirectives.directive('c3pDatePicker', [ '$window', '$parse', function($window, $parse) {
		var options = {
			language : 'pt_BR',
			pickTime : false,
			useCurrent : false,
			keepOpen : false,
		};

		return {
			restrict : 'A',
			link : function(scope, element, attributes) {
				var opts = angular.extend({}, options, scope.$eval(attributes.c3pDatePickerOptions));
				element.datetimepicker(opts).on('dp.change', function(ele) {
					var elemento = angular.element(ele.currentTarget);
					var campo = elemento.find(':first-child').get(0) || elemento.get(0);
					angular.element(campo).trigger('change');
				})
			}
		}
	} ]);

	/**
	 * Usada no modal de pesquisa para ser escondido o modal ao escolher uma
	 * linha do grid.
	 */
	appDirectives.directive('clickToCloseModal', [ '$window', '$parse', function($window, $parse) {
		var options = {
			language : 'pt_BR',
			pickTime : false
		};

		return {
			restrict : 'A',
			link : function(scope, element, attributes) {

				var $modalParent = angular.element('#' + attributes.clickToCloseModal);

				element.bind('click', function() {
					if ($modalParent)
						$modalParent.modal('hide');
				})
			}
		}
	} ]);

	appDirectives.directive('c3pForm', [ '$window', '$parse', function($window, $parse) {
		var options = {
			promptPosition : "topLeft",
			isOverflown : false,
			validationEventTrigger : "change"
		};

		return {
			restrict : 'A',
			require : 'form',
			link : function(scope, element, attributes) {
				// var fn = $parse(attributes.c3pFormValidate);
				var c3pFormSaveButton = attributes.c3pFormSaveButton;

				scope.c3pForm = element.get(0);

				var c3pFormSaveAndContinueButton = attributes.c3pFormSaveAndContinueButton;

				var opts = angular.extend({}, options, scope.$eval(attributes.c3pDOptions));

				var c3pFormIsValid = function() {
					return element.validationEngine('validate', opts);
				};

				element.validationEngine('attach', opts);
				if (c3pFormSaveButton) {

					angular.element('#' + c3pFormSaveButton).bind('click', function(evt) {
						// faz alguma coisa antes de salvar
						if (scope.beforeSave) {
							scope.beforeSave();
						}

						if (c3pFormIsValid()) {
							if (scope.customValidation && scope.customValidation()) {
								scope.onSave();
								return;
							} else {
								scope.onSave();
							}
						}
					});
				}
				if (c3pFormSaveAndContinueButton) {
					angular.element('#' + c3pFormSaveAndContinueButton).bind('click', function(evt) {
						// faz alguma coisa antes de salvar
						if (scope.beforeSave) {
							scope.beforeSave();
						}

						if (c3pFormIsValid()) {
							if (scope.customValidation && scope.customValidation()) {
								scope.onSave(true);
								return;
							} else {
								scope.onSave(true);
							}
						}
					});
				}
				angular.element($window).bind('resize', function() {
					element.validationEngine('updatePromptsPosition');
				});
			}
		};
	} ]);
});
// appServices
