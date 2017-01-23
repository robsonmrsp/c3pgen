define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Backgrid = require('adapters/backgrid-adapter');
	var util = require('utilities/utils');
	var BaseModel = require('models/BaseModel');
	var BaseCollection = require('collections/BaseCollection');
	var GridTemplate = require('text!views/components/tpl/GridTemplate.html');
	var CounterTemplate = require('text!views/components/tpl/CounterTemplate.html');

	var Combobox = require('views/components/Combobox');
	var Multiselect = require('views/components/Multiselect');
	var InputUpload = require('views/components/InputUpload');
	var Suggestbox = require('views/components/Suggestbox');

	var Counter = Marionette.ItemView.extend({

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

			inputComboPageSize : '.combo-page-size'
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
			this.on('show', function() {
				this.ui.inputComboPageSize.val();
				this.ui.outputInitialPage.text();
				this.ui.outputFinalPage.text();
				this.ui.outputTotalRecords.text();
				this.atualiza();
			});
		},

		atualiza : function() {
			this.ui.elementsSpan.hide();
			var state = this.collection.state;
			if (this.collection.size() == 0) {
				this.ui.noElementsSpan.show();
				this.ui.elementsSpan.hide();

				this.ui.outputInitialPage.text(0);
				this.ui.outputFinalPage.text(0);
				this.ui.outputTotalRecords.text(0);
			} else if (this.collection && this.collection instanceof Backbone.PageableCollection) {
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

			options.columns.push({
				label : "ColumnManager_visibility_tool",
				cell : "string",
				alwaysVisible : true,
				headerCell : Backgrid.Extension.ColumnManager.ColumnVisibilityHeaderCell
			});

			var bbColumns = new Backgrid.Columns(options.columns);

			var colManager = new Backgrid.Extension.ColumnManager(bbColumns, {
				initialColumnsVisible : 4,
				saveState : true,
				loadStateOnInit : true
			});

			var colVisibilityControl = new Backgrid.Extension.ColumnManagerVisibilityControl({
				columnManager : colManager
			});

			this.grid = new Backgrid.Grid({
				row : options.row,
				className : options.gridClass || 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : bbColumns,

				emptyText : options.emptyText || "Sem registros",
				collection : options.collection
			});

			this.counter = new Counter({
				collection : options.collection,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : bbColumns,
				collection : options.collection,
				className : ' paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.on('show', function() {
				that.gridRegion.show(that.grid);
				if (!options.showCounter)
					that.counterRegion.show(that.counter);
				if (!options.showPaginator)
					that.paginatorRegion.show(that.paginator);
			})
		},
	})

	var NumericCell = Backgrid.Cell.extend({
		className : "custom-number-cel",
		type : 'decimal',
		render : function() {
			this.$el.empty();
			var model = this.model;
			var theColValue = model.get(this.column.get("name"));
			var theFormattedColValue = '';

			if (theColValue) {
				if (this.type === 'money') {
					theFormattedColValue = this.formatter.fromRaw(util.formatNumeric(theColValue, 2), model);
					this.$el.text('R$ ' + theFormattedColValue);
				} else if (this.type === 'decimal') {
					theFormattedColValue = this.formatter.fromRaw(util.formatNumeric(theColValue, 2), model);
					this.$el.text(theFormattedColValue);
				} else if (this.type === 'integer') {
					theFormattedColValue = this.formatter.fromRaw(theColValue, model);
					this.$el.text(theFormattedColValue);

				} else if (this.type === 'percent') {
					theFormattedColValue = this.formatter.fromRaw(util.formatNumeric(theColValue, 2), model);
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
	var RowClick = Backgrid.Row.extend({
		className : 'custom-row-click',
		render : function() {
			RowClick.__super__.render.apply(this, arguments);
			this.$el.data('model', this.model);
			return this;
		}
	});

	var JSetup = {

		RowClick : RowClick,

		Counter : Counter,

		Combobox : Combobox,

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

		EntityCell : EntityCell,

		DataTable : DataTable,

		InputUpload : InputUpload,
		Suggestbox : Suggestbox,

		BaseModel : BaseModel,
		BaseCollection : BaseCollection,

	}
	return JSetup;
});