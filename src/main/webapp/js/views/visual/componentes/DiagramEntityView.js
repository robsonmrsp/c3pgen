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

	var HtmlEntity = require('views/visual/models/HtmlEntity');

	var DiagramEntityView = Marionette.LayoutView.extend({
		template : _.template(DiagramEntityViewTemplate),
		className : 'entity-container',
		regions : {
			attributesRegion : '.entity-attributes',
			relationshipsRegion : '.entity-relationships',
		},

		events : {
			'click  .closebox' : 'removeEntity',

			'dblclick' : 'doubleClick'
		},
		
		doubleClick : function() {
			alert(this)
		},

		removeEntity : function() {
			if (this.onClickRemove) {
				this.onClickRemove();
			}
		},

		ui : {
			entityName : '.entity-name',
		},

		getGraphEntity : function() {
			return this.htmlEntity;
		},
		reposition : function() {
			this.htmlEntity.updatePosition(this.model.get('posX'), this.model.get('posY'));
		},
		initialize : function(opt) {
			var that = this;
			this.htmlEntity = new HtmlEntity({
				htmlView : that,
			});

			this.model.on('change', this.refresh, this);

			this.container = opt.container;

			this.onClickRemove = opt.onClickRemove;

			this.attributesCollection = new AttributeCollection(this.model.get('attributes'));

			this.attributesCollectionView = new DiagramAttributesCollectionView({
				collection : this.attributesCollection,
			});

			this.relationshipsCollection = new AttributeCollection(this.model.get('relationships'));
			this.relationshipsCollectionView = new DiagramRelationshipsCollectionView({
				collection : this.relationshipsCollection,
			});

			this.on('show', function() {
				this.attributesRegion.show(this.attributesCollectionView);
				this.relationshipsRegion.show(this.relationshipsCollectionView);

				this.htmlEntity.updatePosition(this.model.get('posX'), this.model.get('posY'));
			});
		},

		refresh : function(ent) {
			var that = this;
			var entity = ent || this.model
			this.ui.entityName.text(entity.get('name'));

			this.attributesCollection.reset(this.model.get('attributes'));
			this.relationshipsCollection.reset(this.model.get('relationships'));
		},

	});

	return DiagramEntityView;
});
