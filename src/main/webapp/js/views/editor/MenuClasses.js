/* generated: 05/08/2016 15:59:17 */
define(function(require) {
	// Start "Import´s" Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Backgrid = require('adapters/backgrid-adapter');
	var util = require('utilities/utils');
	var MenuItemTemplate = require('text!views/editor/tpl/MenuItemClassesTemplate.html');

	var MenuItem = Marionette.ItemView.extend({
		template : _.template(MenuItemTemplate),
		tagName : 'li',
		className : 'menu-class-item',

		events : {
			'click .name-item' : 'selectItem',
			'click .checkbox' : 'checkbox',
			'click .remove-item' : 'removeItem',
		},
		ui : {
			editableFields : '.editable-click',
			checkbox : '.checkbox',
		},

		checkbox : function(evt) {
			this.model.set('checked', this.ui.checkbox.is('checked'));
		},
		
		removeItem : function() {
			// this.model.get('name')
		},
		selectItem : function() {
			if (this.onSelectItem)
				this.onSelectItem(this.model);
		},

		initialize : function(opt) {
			var that = this;
			this.onSelectItem = opt.onSelectItem;

			this.on('show', function() {
				// if (!this.model.get('id')) {
				this.ui.editableFields.editable();
				this.ui.editableFields.on('hidden', function(evt) {
					that.model.set('name', $(evt.currentTarget).text());
					that.model.save({}, {
						success : function() {
							console.log('salvando nome')
							that.render();
						},
						error : function() {

						},
					});
				})
				// }
			});
		},
	});

	var MenuClasses = Marionette.CollectionView.extend({

		tagName : 'ul',

		className : 'editor-list',

		childViewOptions : function(model, index) {
			return {
				onSelectItem : this.onSelectItem,
			}
		},
		childView : MenuItem,

		events : {

		},

		ui : {

		},

		getExceptionToGenerate : function() {
			var ret = '';
			this.collection.each(function(item) {
				if (!item.get('checked')) {
					ret = ret + item.get('name') + ',';
				}
			})

			return ret;
		},

		initialize : function(opt) {
			this.onSelectItem = opt.onSelectItem;
			var that = this;
			this.on('show', function() {

			});
		},
	});

	return MenuClasses;
});