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
	var EntityModel = require('models/EntityModel');
	var ApplicationModel = require('models/ApplicationModel');
	var BaseCollection = require('collections/BaseCollection');
	var EntityCollection = require('collections/EntityCollection');
	var PageCategoriaTemplate = require('text!views/categoria/tpl/PageCategoriaTemplate.html');

	var EntitiesCollectionView = require('views/categoria/EntitiesCollectionView');

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
			var applicationModel = new ApplicationModel();
			applicationModel.set('entities', this.entidadesCollection);
			applicationModel.save({}, {
				success : function() {
					console.info('Sucesso ao salvar applicação')
				},
				error : function() {
					console.error('Erro ao salvar applicação')
				}
			})
		},

		novaEntidade : function() {
			var endidade = new EntityModel();

			this.entidadesCollection.add(endidade);
		},

		initialize : function() {
			this.entidadesCollection = new EntityCollection();
			this.entidadesContainer = new EntitiesCollectionView({
				collection : this.entidadesCollection,
			});

			this.on('show', function() {
				this.entidadesRegion.show(this.entidadesContainer);

			});
		},
	});

	return PageCategoria;
});
