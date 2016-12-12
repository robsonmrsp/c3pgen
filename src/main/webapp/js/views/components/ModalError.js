/* generated: 22/09/2014 11:14:50 */
define(function(require) {
	// Start "Import´s" Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');

	var TemplateEditor = require('text!views/components/tpl/ModalErrorTemplate.html');

	var Componente = Marionette.ItemView.extend({
		template : _.template(TemplateEditor),

		ui : {
			body : '.modal-body',
			modal : '.modal'
		},

		initIn : function(container) {
			container.$el.append(this.render().el);
			Marionette.triggerMethod.call(this, "show");
		},

		showMessage : function(object) {
			var text = '';
			if (_.isArray(object)) {
				_.each(object, function(t) {
					text += '<p>' + t + '</p>'
				})
			}
			this.ui.body.html(text || object);
			this.ui.modal.modal({
				backdrop : 'static',
			})
		}
	});

	return Componente;
})
//ModalError