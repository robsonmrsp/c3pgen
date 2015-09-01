/* generated: 18/08/2015 15:38:44 */
define(function(require) {
	// Start "Import´s Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Backgrid = require('adapters/backgrid-adapter');
	var util = require('utilities/utils');
	var Combobox = require('views/components/Combobox');
	var Counter = require('views/components/Counter');
	var ActionsCell = require('views/components/ActionsCell');

	var TemplateFormCategorias = require('text!views/categoria/tpl/FormCategoriaTemplate.html');
	var EntityModel = require('models/TheEntityModel');
	var BaseCollection = require('collections/BaseCollection');
	var EntityCollection = require('collections/TheEntityCollection');
	var PageCategoriaTemplate = require('text!views/categoria/tpl/PageCategoriaTemplate.html');

	var Entidades = require('views/categoria/Entidades');

	// Filter import

	// End of "Import´s" definition
	console.log(JSON.stringify(this.entidadesCollection));

	var PageCategoria = Marionette.LayoutView.extend({
		template : _.template(PageCategoriaTemplate),

		regions : {
			entidadesRegion : '.entidades',
		},

		events : {
			'click #novaEntidade' : 'novaEntidade',
			'click #salvaEntidades' : 'salvaEntidades'
		},

		salvaEntidades : function() {
			console.log(JSON.stringify(this.entidadesCollection.toJSON()));
			console.log(JSON.stringify(this.entidadesCollection));
		},
		novaEntidade : function() {
			var endidade = new EntityModel();

			this.entidadesCollection.add(endidade);
		},
		initialize : function() {
			this.entidadesCollection = new EntityCollection();
			this.entidadesContainer = new Entidades({
				collection : this.entidadesCollection,
			});

			this.on('show', function() {
				this.entidadesRegion.show(this.entidadesContainer);

			});
		},
	});

	return PageCategoria;
});
