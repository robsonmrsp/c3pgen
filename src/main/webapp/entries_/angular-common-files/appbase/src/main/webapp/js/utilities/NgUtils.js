define(function(require) {
	var angular = require('angular');

	var $ = require('adapters/jquery-adapter');
	ngUtils = angular.module('NgUtils', [])

	ngUtils.factory('NgUtils', [ '$http', '$timeout', '$location', function($http, $timeout, $location) {

		var fixModalGridParameters = function(filterModel, gridState) {
			var orderBy = '';
			var direction = '';

			if (gridState) {
				orderBy = gridState.sort.predicate;
				direction = gridState.sort.reverse ? 'desc' : 'asc';
			}

			var pagination = gridState.pagination;

			var params = {
				page : Math.ceil(pagination.start / 5) + 1,
				pageSize : 5,
				orderBy : orderBy,
				direction : direction,

			};

			var opts = angular.extend(params, filterModel);

			return opts;
		};
		var fixGridParameters = function(filterModel, gridState) {
			var orderBy = '';
			var direction = '';

			if (gridState) {
				orderBy = gridState.sort.predicate;
				direction = gridState.sort.reverse ? 'desc' : 'asc';
			}

			var pagination = gridState.pagination;

			var params = {
				page : Math.ceil(pagination.start / 10) + 1,
				pageSize : 10,
				orderBy : orderBy,
				direction : direction,

			};

			var opts = angular.extend(params, filterModel);

			return opts;
		};
		var showMessage = function(type, message, containerMessage) {
			var container = containerMessage || 'messages_div';
			var divAlert = $('#' + container);
			var icon = "<i class='fa fa-info-circle'></i> "
			if (type == 'success') {
				icon = "<i class='fa fa-thumbs-o-up'></i> ";
			} else if (type == 'error') {
				icon = "<i class='fa fa-exclamation-triangle'></i> ";
				type = 'danger'
			} else if (type == 'warning') {
				icon = "<i class='fa fa-exclamation-triangle'></i> ";
				type = 'warning'
			}
			if (!containerMessage) {
				$("body,html").animate({
					scrollTop : 0
				})
			}
			divAlert.html("<div class='alert alert-" + type + " '> <strong> " + icon + " </strong>	&nbsp;" + message + "<a class='close' data-dismiss='alert' href='#' aria-hidden='true'>&times;</a>	</div>");
			divAlert.show();
			if (type !== 'danger') {
				setTimeout(function() {
					divAlert.slideUp(400);
				}, 3000);
			}
		};
		var dataGrid = {
			ITEMS_PER_PAGE : 10,
			ITEMS_PER_MODAL_PAGE : 5
		};

		var refreshGridState = function(pager, gridState) {
			gridState.pagination.number = dataGrid.ITEMS_PER_PAGE;
			gridState.pagination.numberOfPages = Math.ceil(pager.totalRecords / dataGrid.ITEMS_PER_PAGE);
		}
		var refreshModalGridState = function(pager, gridState) {
			gridState.pagination.number = dataGrid.ITEMS_PER_MODAL_PAGE;
			gridState.pagination.numberOfPages = Math.ceil(pager.totalRecords / dataGrid.ITEMS_PER_MODAL_PAGE);
		}

		var clear = function(element) {
			if (element) {
				var tagName = element.prop('tagName');
				if (tagName == "FORM" || tagName == "form") {
					element.get(0).reset()
				} else {
					element.val('');
					var type = element.attr('type');
					if (type === 'checkbox' || type === 'radio') {
						element.prop('checked', false);
						element.attr('checked', false);
					}
				}
				console.log(element);
			}
		};
		var goPage = function(path) {
			$timeout(function() {
				$location.path(path);
			}, 1000);
		}
		var getPathId = function(path) {
			var last = location.hash.lastIndexOf('/')
			var id = '';
			try {
				id = location.hash.substr(last + 1);
			} catch (error) {

			}
			return id;
		};
		return {
			fixGridParameters : fixGridParameters,
			fixModalGridParameters : fixModalGridParameters,
			showMessage : showMessage,
			dataGrid : dataGrid,
			refreshGridState : refreshGridState,
			refreshModalGridState : refreshModalGridState,
			goPage : goPage,
			Bootbox : bootbox,
			clear : clear,
			getPathId : getPathId,
		}
	} ]);

});
