/* generated: 30/08/2015 20:23:11 */
define(function(require) {
	// Start "Import´s" Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var BaseModel = require('models/BaseModel');
	// End of "Import´s definition"

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨ MAIN BODY
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

	var ApplicationModel = BaseModel.extend({

		urlRoot : 'rs/crud/applications',

		defaults : {
			id : null,
			name : '',
			multitenancy : null,
			useAudit : null,
			skin : null,
			description : '',
			rootPackage : '',
			corePackage : '',
			entities : null,
		},
		updateOnlyApplication : function(obj, options) {
			if (this.get('id')) {
				this.url = this.urlRoot + '/onlyApplication/' + this.get('id');
			}
			this.save(obj, options);
		}
	});
	return ApplicationModel;
});
