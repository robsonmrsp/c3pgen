define(function(require) {
	// Start "Import´s" Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var util = require('utilities/utils');

	var Suggestbox = Backbone.View.extend({
		getValue : function() {
			this.fieldVal;
		},

		getJsonValue : function() {
			if (this.fieldVal) {
				return this.fieldVal.toJSON();
			}
			return null;
		},

		clear : function() {
			this.objSelectize.clear();
		},

		setParam : function(jsonParam) {
			this.param = jsonParam
		},

		initialize : function(options) {
			var that = this;
			this.fieldVal = null;

			if (options.collectionEntity === undefined || options.collectionEntity === null) {
				throw new TypeError('ERROR creating AutoSearchBox [ You must define collectionEntity! ]');
			}
			if (options.idAttribute === undefined || options.idAttribute === null) {
				throw new TypeError('ERROR creating AutoSearchBox [ You must define idAttribute! ]');
			}
			if (options.searchAttribute === undefined || options.searchAttribute === null) {
				throw new TypeError('ERROR creating AutoSearchBox [ You must define searchAttribute! ]');
			}

			this.collection = new options.collectionEntity();
			var data = {};

			this.selectize = this.$el.selectize({

				onChange : options.onChange,

				load : function(query, callback) {

					data[options.searchAttribute] = query;

					if (that.param) {
						for ( var name in that.param) {
							data[name] = that.param[name];
						}
					}

					if (!query.length || query.length < 3)
						return callback();
					that.collection.filter({
						success : function(a, resp, c) {
							if (resp.itens)
								callback(resp.itens);
							else
								callback(resp);

						},
						error : function(a, b, c) {
							console.log(a, b, c);
						},
						data : data,
					})
				},
				valueField : options.idAttribute || 'id',
				searchField : options.searchAttribute || 'name',
				labelField : options.searchAttribute || 'name',
				create : false,
				render : {
					option : function(item, escape) {

						return '<div class="profile-activity clearfix">' + //
						'	<div>                               ' + //
						'		<strong> ' + item[options.idAttribute] + '</strong>      ' + //
						'		' + item[options.searchAttribute] + '   ' + //
						'	</div>                              ' + //
						'</div>                                 '; //
						//

					}
				},
				onItemAdd : function(value, $item) {
					var theModel;
					that.collection.each(function(model) {
						if (model.get(options.idAttribute) + '' === value) {
							theModel = model;
						}
					})

					that.fieldVal = theModel;
				},

			});
			this.objSelectize = this.selectize[0] && this.selectize[0].selectize;
		},
	});
	return Suggestbox;
});