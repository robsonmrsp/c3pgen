define([ 'utilities/utils', 'adapters/underscore-adapter', 'adapters/jquery-adapter', 'adapters/backbone-adapter', 'marionette' ], //
	function(util, _, $, Backbone, Marionette) {
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

				if (this.collectionEntity) {
					this.comboVal = options.comboVal;
					this.comboId = options.comboId;
					this.collection = new this.collectionEntity();
					this.collection.fetch({
						success : function() {
							that.collection.each(function(model) {
								that.addModel(model);
							})
							that.setValue(that.modelValues);
							that.collectionLoaded = true;
							that.$el.chosen({
								no_results_text : "Nenhuma informação encontrada"
							});

							that.$el.on('change', function(evt) {
								var $this = $(evt.target);
								console.log($this)
							});

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
					that.setValue(that.modelValues);
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
				return this.getValue();
			},

			getValue : function() {
				var arrayValue = [];
				var ids = this.$el.val();

				if (this.collection) {
					this.collection.each(function(model) {
						if (_.contains(ids, '' + model.id)) {
							arrayValue.push(model.toJSON());
						}
					});
					return arrayValue;
				}
				return null;
			},

			setValue : function(models) {
				var ids = [];
				if (_.isArray(models)) {
					_.each(models, function(model) {
						ids.push('' + model.id)
					})
				} else if (models) {
					models.each(models, function(model) {
						ids.push('' + model.id)
					})
				}
				this.modelValues = models; 
				this.$el.val(ids).trigger('chosen:updated')
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
						that.setValue(that.modelValues);
						that.collectionLoaded = true;
						that.collection.url = oldUrl;
						that.$el.chosen({
							no_results_text : "Nenhuma informação encontrada"
						});
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