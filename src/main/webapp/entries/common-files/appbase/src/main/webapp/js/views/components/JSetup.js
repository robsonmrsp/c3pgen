/* generated: 24/11/2016 23:40:59 */
define(function(require) {
	// Start "Import´s" Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Backgrid = require('adapters/backgrid-adapter');
	var util = require('utilities/utils');
	var GridTemplate = require('text!views/components/tpl/GridTemplate.html');

	var Combobox = require('views/components/Combobox');
	var InputUpload = require('views/components/InputUpload');

	var Counter = Marionette.ItemView.extend({
		initialize : function(options) {
			var collection = this.collection;
			this.listenTo(collection, "add", this.render);
			this.listenTo(collection, "remove", this.render);
			this.listenTo(collection, "reset", this.render);
		},

		render : function() {
			this.$el.empty();
			var anchor = document.createElement("span");
			var state = this.collection.state;
			if (this.collection.size() == 0) {
				anchor.innerHTML = 'Nenhum registro.';
			} else if (this.collection && this.collection instanceof Backbone.PageableCollection) {
				// this.el.html("testando");
				var a = ((state.currentPage - 1) * state.pageSize) + 1;
				var b = state.currentPage * state.pageSize;
				var c = state.totalRecords;
				if (b > c)
					b = c;
				anchor.innerHTML = 'Mostrando ' + a + ' a ' + b + ' de ' + c + ' Registros, 10 registros por pagina';
			}
			// TODO fazer a internacionalização
			this.el.appendChild(anchor);
			this.delegateEvents();

			return this;
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

			this.grid = new Backgrid.Grid({
				className : options.gridClass || 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : options.columns || [],
				emptyText : options.emptyText || "Sem registros",
				collection : options.collection
			});

			this.counter = new Counter({
				collection : options.collection,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : options.columns || [],
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
				vetor.push("<a id='" + button.id + "' href='javascript:void(-1)' class='btn btn-xs button_cell btn-" + button.type + "'  data-toggle='tooltip' data-placement='top' title='' data-original-title='" + button.hint + "' >");
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

	var JSetup = {

		Counter : Counter,
		Combobox : Combobox,

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

	}
	return JSetup;
});