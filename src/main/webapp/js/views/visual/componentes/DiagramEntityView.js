/* generated: 18/08/2015 15:38:44 */
define(function(require) {
	// Start "Import´s Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');

	var util = require('utilities/utils');
	var AttributeCollection = require('collections/AttributeCollection');
	var RelationshipCollection = require('collections/RelationshipCollection');

	var DiagramEntityViewTemplate = require('text!views/visual/componentes/tpl/DiagramEntityViewTemplate.html');

	var DiagramAttributesCollectionView = require('views/visual/componentes/DiagramAttributesCollectionView');
	var DiagramRelationshipsCollectionView = require('views/visual/componentes/DiagramRelationshipsCollectionView');

	var DiagramEntityView = Marionette.LayoutView.extend({
		template : _.template(DiagramEntityViewTemplate),
		className : 'entity-container',
		regions : {
			attributesRegion : '.entity-attributes',
			relationshipsRegion : '.entity-relationships',
		},

		events : {
			'mousedown  .add-rel' : 'addRelation'
		},

		ui : {
			entityName : '.entity-name',
		},

		addRelation : function() {
			util.VENT.trigger('entity.add.rel', this.container);
		},

		initialize : function(opt) {
			var that = this;
			this.container = opt.container;

			this.attributesCollection = new AttributeCollection(this.model.get('attributes'));
			this.attributesCollectionView = new DiagramAttributesCollectionView({
				collection : this.attributesCollection,
			});

			this.relationshipsCollection = new RelationshipCollection(this.model.get('relationships'));
			this.relationshipsCollectionView = new DiagramRelationshipsCollectionView({
				collection : this.relationshipsCollection,
			});

			this.on('show', function() {
				this.attributesRegion.show(this.attributesCollectionView);
				this.relationshipsRegion.show(this.relationshipsCollectionView);
				window.setTimeout(function() {
					that.container.resizeView({
						width : that.$el.width(),
						height : that.$el.height()
					})
				}, 10);
			});
		},

		refresh : function(entity) {
			var that = this;
			this.ui.entityName.text(entity.get('name'));
			console.log('tamanho', this.$el.height());

			this.attributesCollection.reset(this.model.get('attributes'));

			this.relationshipsCollection.reset(this.model.get('relationships'));

			window.setTimeout(function() {
				that.container.resizeView({
					width : that.$el.width(),
					height : that.$el.height()
				})
			}, 10);
		},

	});

	return DiagramEntityView;
});
