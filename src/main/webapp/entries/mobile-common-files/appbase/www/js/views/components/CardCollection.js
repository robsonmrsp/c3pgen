define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Waves = require('waves');
	var SimpleCardItemTemplate = require('text!views/components/tpl/SimpleCardItemTemplate.html');

	var CardItem = Marionette.ItemView.extend({
		template : _.template(SimpleCardItemTemplate),
		className : "box",
		ui : {
			primaryInfo : '.primary-info',
			secondaryInfo : '.secondary-info',
			tertiaryInfo : '.tertiary-info',
			cancelButton : '.cancel-button',
			editButton : '.edit-button'
		},
		initialize : function(options) {
			this.renderConfig = options.renderConfig;
			this.on('show', function() {
				var that = this;
				var primary = this.renderConfig.primaryInfo;
				if (primary) {
					if (primary.formatter) {
						this.ui.primaryInfo.text(primary.formatter(this.model.get(this.renderConfig.primaryInfo.name)));
					} else {
						this.ui.primaryInfo.text(this.model.get(this.renderConfig.primaryInfo.name));
					}
				}
				var secondary = this.renderConfig.secondaryInfo;
				if (secondary) {
					if (secondary.formatter) {
						this.ui.secondaryInfo.text(secondary.formatter(this.model.get(this.renderConfig.secondaryInfo.name)));
					} else {
						this.ui.secondaryInfo.text(this.model.get(this.renderConfig.secondaryInfo.name));
					}
				}
				var tertiary = this.renderConfig.tertiaryInfo;
				if (tertiary) {
					if (tertiary.formatter) {
						this.ui.tertiaryInfo.text(tertiary.formatter(this.model.get(this.renderConfig.tertiaryInfo.name)));
					} else {
						this.ui.tertiaryInfo.text(this.model.get(this.renderConfig.tertiaryInfo.name));
					}
				}

				this.ui.cancelButton.click(function() {
					that.renderConfig.onCancel(that.model);
				});
				this.ui.editButton.click(function() {
					that.renderConfig.onSave(that.model);
				});

				this.$el.enhanceWithin();
				// a ideia é mostrar vários....
			})
		},
	});
	var NoChildsView = Backbone.Marionette.ItemView.extend({
		className : 'nd2-card',
		template : "<div > <p class='text-center'> Sem registros para exibir</p> </div>"
	});
	var CardCollection = Marionette.CollectionView.extend({
		childView : CardItem,
		emptyView : NoChildsView,
		renderConfig : '',
		// passa aos filhos essa configuração
		childViewOptions : function() {
			return {
				renderConfig : this.renderConfig,
			}
		},

		initialize : function(opt) {
			this.renderConfig = opt.renderConfig;
		},
	})
	return CardCollection;
})