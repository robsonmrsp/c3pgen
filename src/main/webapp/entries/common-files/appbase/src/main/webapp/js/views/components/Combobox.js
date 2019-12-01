define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backgrid = require('adapters/backgrid-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Utils = require('utilities/utils');

	var MediaItem = Backbone.Marionette.ItemView.extend({
	// "<option value='saab'>Saab</option>"
	});

	var Combobox = Backbone.View.extend({
		initialize : function(options) {

			var that = this;
			this.collectionLoaded = false;
			// this.el = options.comboEl;
			this.collectionEntity = options.collectionEntity;
			this.values = options.values;
			this.comboVal = options.comboVal;
			this.comboId = options.comboId;
			this.$el.find('option').remove();
			this.$el.append('<option value selected>       -- Selecione --      </option>');

			this.setValue(options.initialValue);

			if (this.collectionEntity) {
				this.comboVal = options.comboVal;
				this.comboId = options.comboId;
				this.collection = new this.collectionEntity();
				this.collection.fetch({
					success : function(collection, response, xhr) {
						if (response && _.isArray(response.items)) {
							_.each(response.items, function(model) {
								that.addModel(model);
							});
						} else {
							that.collection.each(function(model) {
								that.addModel(model);
							})
						}
						that.setValue(that.modelValue);
						that.collectionLoaded = true;
					},
					error : function(x, y, z) {
						console.error('Erro ao carregar combobox ' + that.$el.attr('id'), x, y, z);
					}
				})
			} else if (this.values) {
				_.each(this.values, function(value) {
					that.addModel(value);
				});
			} else if (this.collection) {
				this.comboVal = options.comboVal;
				this.comboId = options.comboId;
				this.collection.on('add', this.addModel, this)
				this.collection.each(function(model) {
					that.addModel(model);
				})
				that.setValue(that.modelValue);
			}
		},

		addModel : function(model, selected) {
			if (typeof model === 'string')
				this.$el.append('<option value=' + model + '>' + model + '</option>');
			else if (model.get) {
				this.$el.append('<option value=' + model.get(this.comboId) + '>' + model.get(this.comboVal) + '</option>');
			} else {
				this.$el.append('<option value=' + model[this.comboId] + '>' + model[this.comboVal] + '</option>');
			}

		},

		getJsonValue : function() {
			var val = this.$el.val();

			if (this.collection) {
				if (val && val.indexOf('Selecione') == -1) {
					return this.collection.get(val).toJSON();
				} else {
					if (!this.collectionLoaded) {
						if (this.modelValue && this.modelValue.get) {
							return this.modelValue.toJSON();
						} else {
							return this.modelValue;
						}
					}
					return null;
				}
			} else {
				if (val) {
					return {
						id : val
					}
				}
			}
			return this.modelValue;
		},

		getValue : function() {
			var id = this.$el.val();
			if (this.collection) {
				if (id && id.indexOf('Selecione') == -1) {
					return this.collection.get(id);
				} else {
					return null;
				}
			} else {
				if (id && id.indexOf('Selecione') == -1) {
					return id;
				}
				return null;
			}
		},

		getRawValue : function() {
			var json = this.getJsonValue();
			if (json)
				return json.id
			return null;
		},

		setValue : function(model) {
			this.modelValue = model;
			if (model) {
				if (model.get) {
					this.$el.val(model.get(this.comboId));

				} else if (model[this.comboId]) {

					this.$el.val(model[this.comboId]);
				} else if (typeof model === 'string') {

					this.$el.val(model);
				}
			}
		},

		clear : function() {
			this.$el && this.$el.val('');
			this.modelValue = null;
		},

		filter : function(data, newUrl) {
			if (!this.collectionLoaded) {
				return;
			}
			var that = this;
			var oldUrl = this.collection.url;
			this._reset();

			this.collection.url = newUrl || oldUrl.replace('all', 'filter');
			this.collection.fetch({
				success : function() {
					that.collection.each(function(model) {
						that.addModel(model);
					})
					that.setValue(that.modelValue);
					that.collectionLoaded = true;
					that.collection.url = oldUrl;
				},
				error : function(x, y, z) {
					console.error('Erro ao carregar combobox ' + that.$el.attr('id'), x, y, z);
					that.collection.url = oldUrl;
				},
				data : data || {},
			})
		},
		_reset : function() {
			if (this.collection)
				this.collection.reset();
			this.$el.find('option').remove();
			this.$el.append('<option value selected>       -- Selecione --      </option>');
		},
		getRawValue : function() {
			var id = this.$el.val();
			if (id && id.indexOf('Selecione') == -1) {
				return id;
			}
			return null;
		},
	});
	return Combobox;
});