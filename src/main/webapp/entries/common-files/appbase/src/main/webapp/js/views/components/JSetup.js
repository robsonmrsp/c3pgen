define(function(require) {
	var Backgrid = require('adapters/backgrid-adapter');
	var Utils = require('utilities/utils');
	var InputUpload = require('views/components/InputUpload');
	var Combobox = require('views/components/Combobox');

	var RowClick = Backgrid.Row.extend({
		className : 'custom-row-click',
		render : function() {
			RowClick.__super__.render.apply(this, arguments);
			this.$el.data('model', this.model);
			return this;
		}
	});

	var NumericCell = Backgrid.Cell.extend({
		className : "custom-number-cell",
		type : 'decimal',
		render : function() {
			this.$el.empty();
			var model = this.model;
			var theColValue = model.get(this.column.get("name"));
			var theFormattedColValue = '';

			if (theColValue) {
				if (this.type === 'money') {
					theFormattedColValue = this.formatter.fromRaw(Utils.formatNumeric(theColValue, 2), model);
					this.$el.text('R$ ' + theFormattedColValue);
				} else if (this.type === 'decimal') {
					theFormattedColValue = this.formatter.fromRaw(Utils.formatNumeric(theColValue, 2), model);
					this.$el.text(theFormattedColValue);
				} else if (this.type === 'integer') {
					theFormattedColValue = this.formatter.fromRaw(theColValue, model);
					this.$el.text(theFormattedColValue);

				} else if (this.type === 'percent') {
					theFormattedColValue = this.formatter.fromRaw(Utils.formatNumeric(theColValue, 2), model);
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

	var CustomStringCell = Backgrid.Cell.extend({
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
				anchor.innerHTML = 'Mostrando ' + a + ' a ' + b + ' de ' + c + ' Registros';
			}
			// TODO fazer a internacionalização
			this.el.appendChild(anchor);
			this.delegateEvents();

			return this;
		},
	});

	var JSetup = {
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
		Counter : Counter,
		CustomStringCell : CustomStringCell,
		RowClick : RowClick,
		InputUpload : InputUpload,
		Combobox : Combobox,
	}
	return JSetup;
});