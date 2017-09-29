define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Backgrid = require('adapters/backgrid-adapter');
	var util = require('utilities/utils');
	var BaseModel = require('models/BaseModel');
	var BaseCollection = require('models/BaseCollection');
	var GridTemplate = require('text!views/components/tpl/GridTemplate.html');
	var CounterTemplate = require('text!views/components/tpl/CounterTemplate.html');

	var Combobox = require('views/components/Combobox');
	var Multiselect = require('views/components/Multiselect');
	var InputUpload = require('views/components/InputUpload');
	var InputAllUpload = require('views/components/InputAllUpload');
	var InputButtonUpload = require('views/components/InputButtonUpload');
	var Suggestbox = require('views/components/Suggestbox');
	var BooleanBadgeCell = require('views/components/BooleanBadgeCell');

	var RadioGroup = Backbone.View.extend({
		initialize : function(options) {
			this.container = options.container;
			this.radioboxes = this.container.find("input[type=radio]")
		},

		getValue : function() {
			var that = this;
			var radioValue = null;
			_.each(that.radioboxes, function(radiobox) {
				var $radiobox = $(radiobox);
				if ($radiobox.is(':checked')) {
					radioValue = $radiobox.val();
				}
			})
			return radioValue;
		},

		setValue : function(val) {
			var that = this;
			that.clear();
			_.each(that.radioboxes, function(radiobox) {
				var $radiobox = $(radiobox);
				// TODO verificar uma forma mais elegante para fazer isso
				val = '' + val;
				if ($radiobox.val() == val) {
					$radiobox.prop('checked', true);
				}
			});
		},

		clear : function() {
			_.each(this.radioboxes, function(radiobox) {
				var $radiobox = $(radiobox);
				$radiobox.prop('checked', false);
			})
		}
	});

	var CheckGroup = Backbone.View.extend({
		initialize : function(options) {
			this.container = options.container;
			this.checkboxes = this.container.find("input[type=checkbox]")
		},

		getValue : function() {
			var that = this;
			var checkValues = [];
			_.each(that.checkboxes, function(checkbox) {
				var $checkbox = $(checkbox);
				if ($checkbox.is(':checked')) {
					checkValues.push($checkbox.val());
				}
			})
			return checkValues;
		},

		setValue : function(models) {
			var that = this;
			that.clear();
			_.each(models, function(model) {
				_.each(that.checkboxes, function(checkbox) {
					var $checkbox = $(checkbox);
					if ($checkbox.val() == model) {
						$checkbox.prop('checked', true);
					}
				});
			});
		},
		clear : function() {
			_.each(this.checkboxes, function(checkbox) {
				var $checkbox = $(checkbox);
				$checkbox.prop('checked', false);
			})
		}
	});

	var Counter = Marionette.ItemView.extend({
		className : 'counter-component',
		template : _.template(CounterTemplate),
		events : {
			'change  .combo-page-size' : 'changePageSize',
		},
		ui : {

			outputInitialPage : '.initial-page',

			noElementsSpan : '.has-no-elements',

			elementsSpan : '.has-elements',

			outputFinalPage : '.final-page',

			outputTotalRecords : '.total-records',

			inputComboPageSize : '.combo-page-size',
			loadingElements : '.loading-elements'
		},
		changePageSize : function() {
			var newPageSize = parseInt(this.ui.inputComboPageSize.val() || 10);
			this.collection.state.pageSize = newPageSize;
			this.collection.getFirstPage();
		},

		initialize : function(options) {
			this.listenTo(this.collection, "add", this.atualiza);
			this.listenTo(this.collection, "remove", this.atualiza);
			this.listenTo(this.collection, "reset", this.atualiza);

			this.listenTo(this.collection, "request", this.startRequest);
			// this.listenTo(this.collection, "sync", this.endRequest);

			this.on('show', function() {
				this.ui.inputComboPageSize.val();
				this.ui.outputInitialPage.text();
				this.ui.outputFinalPage.text();
				this.ui.outputTotalRecords.text();
				this.atualiza();
			});
		},
		startRequest : function() {
			this.ui.noElementsSpan.hide();
			this.ui.elementsSpan.hide();
			
			this.ui.loadingElements.show();

		},

		atualiza : function() {
			this.ui.elementsSpan.hide();
			var state = this.collection.state;
			if (this.collection.size() == 0) {
				this.ui.noElementsSpan.show();
				this.ui.elementsSpan.hide();
				this.ui.loadingElements.hide();
				this.ui.outputInitialPage.text(0);
				this.ui.outputFinalPage.text(0);
				this.ui.outputTotalRecords.text(0);
			} else if (this.collection && this.collection instanceof Backbone.PageableCollection) {
				this.ui.loadingElements.hide();
				this.ui.noElementsSpan.hide();
				this.ui.elementsSpan.show();
				// this.el.html("testando");
				var a = ((state.currentPage - 1) * state.pageSize) + 1;
				var b = state.currentPage * state.pageSize;
				var c = state.totalRecords;
				if (b > c)
					b = c;
				// anchor.innerHTML = 'Mostrando ' + a + ' a ' + b + ' de ' + c
				// + ' Registros.';
				this.ui.outputInitialPage.text(a);
				this.ui.outputFinalPage.text(b);
				this.ui.outputTotalRecords.text(c);
			}
			// return this;
		},
	});

	var DataTable = Marionette.LayoutView.extend({
		template : _.template(GridTemplate),

		regions : {
			gridRegion : '.grid',
			counterRegion : '.counter',
			paginatorRegion : '.paginator',
		},

		initialize : function(options) {
			var that = this;
			options.showCounter = _.isUndefined(options.showCounter) || options.showCounter;
			options.showPaginator = _.isUndefined(options.showPaginator) || options.showPaginator;
			options.showColManager = _.isUndefined(options.showColManager) || options.showColManager;

			if (!options.columns) {
				throw new TypeError("Deve definir as colunas do grid");
			}

			if (!options.collection) {
				throw new TypeError("Deve definir a coleção do grid");
			}

			var colSizes = options.columns.length
			if (colSizes > 0 && options.columns[colSizes - 1].name === 'acoes') {
				options.columns[colSizes - 1].alwaysVisible = true;
			}

			// adicionando uma header compativel com tipos numericos
			_.each(options.columns, function(col) {
				if (col.cell.__super__ && col.cell.__super__.className == 'custom-number-cel') {
					col.headerCell = Backgrid.HeaderCell.extend({
						className : 'custom-number-cel'
					})
				}
			})

			var bbColumns = new Backgrid.Columns(options.columns);

			if (options.showColManager) {
				bbColumns.add({
					label : "ColumnManager_visibility_tool",
					cell : "string",
					alwaysVisible : true,
					headerCell : Backgrid.Extension.ColumnManager.ColumnVisibilityHeaderCell
				});

				var colManager = new Backgrid.Extension.ColumnManager(bbColumns, {
					initialColumnsVisible : 6,
					saveState : true,
					loadStateOnInit : true
				});

				var colVisibilityControl = new Backgrid.Extension.ColumnManagerVisibilityControl({
					columnManager : colManager
				});
			}

			this.grid = new Backgrid.Grid({
				row : options.row,
				className : options.className || options.gridClass || 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : bbColumns,

				emptyText : options.emptyText || "Sem registros",
				collection : options.collection
			});

			if (options.showCounter)
				this.counter = new Counter({
					collection : options.collection,
				});

			if (options.showPaginator)
				this.paginator = new Backgrid.Extension.Paginator({
					columns : bbColumns,
					collection : options.collection,
					className : ' paging_simple_numbers',
					uiClassName : 'pagination',
				});

			this.on('show', function() {
				that.gridRegion.show(that.grid);
				if (options.showCounter) {
					that.counterRegion.show(that.counter);
				} else {
					that.counterRegion.$el.remove();
					window.counterR = that.counterRegion;
				}
				if (options.showPaginator) {
					that.paginatorRegion.show(that.paginator);
				} else {
					that.paginatorRegion.$el.remove();
				}
			})
		},
	})

	var NumericCell = Backgrid.Cell.extend({
		className : "custom-number-cel",
		type : 'decimal',

		render : function() {
			this.$el.empty();
			var model = this.model;
			var theColValue = null;

			if (this.column.get("name").indexOf('.') > 0) {// composto
				var fields = this.column.get("name").split('.')
				theColValue = parseFloat(model.get(fields[0]) && model.get(fields[0])[fields[1]]);
			} else {

				if (_.isObject(model.get(this.column.get("name")))) {
					theColValue = model.get(this.column.get("name"));
				} else {
					theColValue = parseFloat(model.get(this.column.get("name")));
				}
			}

			var theFormattedColValue = '';

			if (theColValue) {
				if (this.type === 'money') {
					if (_.isObject(theColValue)) {
						theFormattedColValue = this.formatter.fromRaw(theColValue, model);
					} else {
						theFormattedColValue = this.formatter.fromRaw(util.formatNumeric(theColValue, 2), model);
					}
					this.$el.text('R$ ' + theFormattedColValue);
				} else if (this.type === 'decimal') {
					if (_.isObject(theColValue)) {
						theFormattedColValue = this.formatter.fromRaw(theColValue, model);
					} else {
						theFormattedColValue = this.formatter.fromRaw(util.formatNumeric(theColValue, 2), model);
					}
					this.$el.text(theFormattedColValue);
				} else if (this.type === 'integer') {
					theFormattedColValue = this.formatter.fromRaw(theColValue, model);
					this.$el.text(theFormattedColValue);

				} else if (this.type === 'percent') {
					if (_.isObject(theColValue)) {
						theFormattedColValue = this.formatter.fromRaw(theColValue, model);
					} else {
						theFormattedColValue = this.formatter.fromRaw(util.formatNumeric(theColValue, 2), model);
					}
					this.$el.text(theFormattedColValue + ' %');
				} else { // só pra garantir, mas aparentemente o integer
					// seria tratado
					theFormattedColValue = this.formatter.fromRaw(theColValue, model);
					this.$el.text(theFormattedColValue);
				}
			}
			this.delegateEvents();
			return this;
		},
	});

	var GeneralCell = Backgrid.Cell.extend({
		buttons : [],
		className : "td-actions",
		editor : Backgrid.CellEditor,

		render : function() {
			var that = this;
			this.$el.empty();
			_.each(this.buttons, function(button) {
				var vetor = [];
				button.type = button.type || 'default';
				vetor.push("<a id='" + button.id + "' href='javascript:void(-1)' class='btn btn-xs button_cell btn-" + button.type + " " + button.customClass + "'  data-toggle='tooltip' data-placement='top' title='' data-original-title='" + button.hint + "' >");
				vetor.push("	<i class='fa " + button.icon + " fa-lg'></i>");
				vetor.push("</a>");

				that.$el.append(vetor.join(' '));

				that.events["click #" + button.id] = function() {
					button.onClick.call(that.context, that.model);
				};
			})
			this.delegateEvents();
			this.$el.ready(function() {
				that.$el.find('a').tooltip();
			})
			return this;
		}
	});

	// Aceita o html explicito na definição da celula na coluna e o objeto
	// carregado pelo require
	var TemplateCell = Backgrid.Cell.extend({
		editor : Backgrid.CellEditor,

		className : "custom-string-cell",
		html : '<div> </div>',

		render : function() {
			this._template = _.template(this.html);
			this.$el.empty();
			var model = this.model;
			var theColValue = model.get(this.column.get("name"));

			this.$el.html(this.formatter.fromRaw(this._template(model && model.toJSON()), model));

			this.delegateEvents();
			return this;
		},
	});

	var CustomStringCell = Backgrid.Cell.extend({
		className : "custom-string-cell",
		render : function() {
			this.$el.empty();
			var model = this.model;
			var theColValue = null;

			if (this.column.get("name").indexOf('.') > 0) {// composto
				var fields = this.column.get("name").split('.')
				theColValue = model.get(fields[0]) && model.get(fields[0])[fields[1]];
			} else {
				theColValue = model.get(this.column.get("name"));
			}

			var theFormattedColValue = this.formatter.fromRaw(theColValue, model);

			this.$el.text(this.formatter.fromRaw(theColValue, model));

			this.delegateEvents();
			return this;
		},
	});

	var EntityCell = Backgrid.Cell.extend({
		editor : Backgrid.CellEditor,
		className : 'general-string-cell',
		fieldName : '',
		/**
		 * Tipos de botão : default primary success info warning danger
		 */
		render : function() {
			var that = this;
			this.$el.empty();
			if (this.fieldName) {
				var fields = this.fieldName.split('.')

				if (fields.length > 1) {
					if (this.model.get(fields[0]))
						that.$el.append(this.model.get(fields[0])[fields[1]])
				} else {
					that.$el.append(this.model.get(fields[0]));
				}
			}
			this.delegateEvents();
			return this;
		}
	});
	// var viewHelpers = {
	// formatNumeric : util.formatNumeric,
	// truncDate : util.truncDate
	// }
	var SimpleView = Marionette.LayoutView.extend({});

	var View = Marionette.LayoutView.extend({
		templateHelpers : util,

		onShow : function() {
			$.validate({
				modules : 'location, date, security, brazil',
				validateOnEvent : true,
				inputParentClassOnSuccess : '',
				addValidClassOnAll : true,
			});

			this.onShowView && this.onShowView();
		},

		isValid : function() {
			// checar se realmente é necessário
			return this.$el.isValid(null, {
				modules : 'location, date, security, brazil',
				validateOnEvent : true,
				inputParentClassOnSuccess : '',
				addValidClassOnAll : true,
			});
		},

		clearForm : function() {
			if (this.customClearForm) {
				this.customClearForm();
			}
			if (this.ui) {
				_.each(this.ui, function(uiItem) {
					if (!uiItem.attr('persist'))
						util.clear(uiItem.attr('id'));
				});
			}
			// TODO ver uma forma mais elegente de limpar os campos de upload;
			var inputImage = $('.jsetup-upload-image');
			inputImage.attr('src', inputImage.attr('no-image-file'));
		}
	});

	var RowClick = Backgrid.Row.extend({
		className : 'custom-row-click',
		render : function() {
			RowClick.__super__.render.apply(this, arguments);
			this.$el.data('model', this.model);
			return this;
		}
	});
	var JSetup = {
		BaseModel : BaseModel,
		BaseCollection : BaseCollection,

		CheckGroup : CheckGroup,
		RadioGroup : RadioGroup,

		View : View,
		SimpleView : SimpleView,
		RowClick : RowClick,

		Counter : Counter,

		Combobox : Combobox,

		DataTable : DataTable,

		Multiselect : Multiselect,

		MoneyCell : NumericCell.extend({
			type : 'money'
		}),

		DecimalCell : NumericCell.extend({
			type : 'decimal'
		}),

		IntegerCell : NumericCell.extend({
			type : 'integer'
		}),

		PercentCell : NumericCell.extend({
			type : 'percent'
		}),

		ActionCell : GeneralCell,

		CustomStringCell : CustomStringCell,
		EntityCell : EntityCell,
		StringCell : CustomStringCell,

		TemplateCell : TemplateCell,

		BooleanBadgeCell : BooleanBadgeCell,

		InputUpload : InputUpload,
		InputAllUpload : InputAllUpload,
		InputButtonUpload : InputButtonUpload,
		Suggestbox : Suggestbox,


	}
	return JSetup;
});