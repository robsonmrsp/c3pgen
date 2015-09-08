define(function(require) {
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var util = require('utilities/utils');

	var ReportViewTemplate = require('text!views/components/tpl/ReportViewTemplate.html');

	var ReportView = Marionette.ItemView.extend({
		template : _.template(ReportViewTemplate),
		tagName : 'section',

		ui : {
			modalReport : '#modalReport',
			iframeReport : '#iframeReport',
		},

		initialize : function(options) {
			var that = this;

			this.on('show', function() {

			});
		},

		showPdfModal : function(url, data, onSuccess, onError) {
			var that = this;
			var reports = new Backbone.Collection();
			reports.url = url;

			reports.fetch({
				success : function(col, reportAddress, xhr) {
					that.ui.modalReport.modal('show');
					that.ui.iframeReport.attr('src', reportAddress.resp);
					if (onSuccess)
						onSuccess()
				},
				error : function(a, b, c) {
					console.error(a, b, c);
					if (onError)
						onError();
				},
				data : data,
			})
		},
	});

	return ReportView;
});
