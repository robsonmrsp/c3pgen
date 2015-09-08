define([ 'adapters/backgrid-adapter' ], function(Backgrid) {
	var ExpandableCell = Backgrid.ExpandableCell = Backgrid.Cell.extend({
		accordion : true,
		toggle : '<i style="cursor: pointer;max-width:50px" class="glyphicon toggle"></i>',
		toggleClass : 'toggle',
		toggleExpandedClass : 'glyphicon-minus-sign',
		toggleCollapsedClass : 'glyphicon-plus-sign',
		trClass : 'expandable',
		tdClass : 'expandable-content',
		className : "expand-col",

		events : {
			'click' : 'setToggle'
		},
		initialize : function(options) {
			if (options.accordion) {
				this.accordion = options.accordion;
			}

			this.column = options.column;
			if (!(this.column instanceof Backgrid.Column)) {
				this.column = new Backgrid.Column(this.column);
			}

			var column = this.column, model = this.model, $el = this.$el;

			// if (Backgrid.callByNeed(column.renderable(), column, model))
			// $el.addClass("renderable");
		},

		render : function() {
			/* follow along with the original render really... */
			this.$el.empty();

			this.$toggleEl = $(this.toggle).addClass(this.toggleClass).addClass(this.toggleCollapsedClass);

			this.$el.append(this.$toggleEl);

			this.delegateEvents();

			return this;
		},

		setToggle : function() {
			var detailsRow = this.$el.data('details');
			var toggle = this.$toggleEl;

			/* if there's details data already stored, then we'll remove it */
			if (detailsRow) {
				$(detailsRow).remove();
				this.$el.data('details', null);
				toggle.removeClass(this.toggleExpandedClass).addClass(this.toggleCollapsedClass);
			} else {
				if (this.accordion) {
					var table = this.$el.closest('table');
					$('.' + this.toggleClass, table).filter('.' + this.toggleExpandedClass).click();
				}

				var renderableColumns = this.$el.closest('table').find('th.renderable').length;
				var isRenderable = false;
				var cellClass = this.tdClass;

				if (Backgrid.callByNeed(this.column.renderable(), this.column, this.model)) {
					isRenderable = true;
					cellClass += ' renderable';
				}

				/* build a jquery object for the new row... */
				// detailsRow = $('<tr class="' + this.trClass + '"><td class="'
				// + (isRenderable ? 'renderable' : '') + '"></td><td class="' +
				// cellClass + '" colspan="' + (4 - 1) + '"></td></tr>');
				detailsRow = $('<tr class="' + this.trClass + '"><td class="' + cellClass + '" colspan="' + (renderableColumns + 1) + '"></td></tr>');

				/* Inject new row */
				this.$el.closest('tr').after(detailsRow);

				/* Call expand function */
				// this.column.get('expand')(detailsRow.find('td.' +
				// this.tdClass), this.model);
				var el = detailsRow.find('td.' + this.tdClass);
				this.expand(el, this.model);

				this.$el.data('details', detailsRow);

				toggle.removeClass(this.toggleCollapsedClass).addClass(this.toggleExpandedClass);
			}

			return this;
		}
	});
	return ExpandableCell;
});