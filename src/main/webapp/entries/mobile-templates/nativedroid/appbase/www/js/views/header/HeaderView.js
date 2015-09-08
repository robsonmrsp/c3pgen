define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var LeftPanelView = require('views/leftPanel/LeftPanelView');
	var RightPanelView = require('views/rightPanel/RightPanelView');
	var Marionette = require('marionette');
	var Waves = require('waves');
	var HeaderViewTemplate = require('text!views/header/tpl/HeaderViewTemplate.html');

	var HeaderView = Marionette.LayoutView.extend({
		template : _.template(HeaderViewTemplate),

		regions : {
			leftPanelRegion : '.left-panel-content',
			rightPanelRegion : '.right-panel-content'
		},
		ui : {
			leftButton : '#leftButton',
			rightButton : '#rightButton',
			headerTitle : '#headerTitle',
		},
		setTitle : function(title) {
			this.ui.headerTitle.text(title);
		},
		initialize : function(opt) {
			this.headerTitle = opt.headerTitle || {};
			this.leftPanel = new LeftPanelView();
			this.rightPanel = new RightPanelView();

			this.on('show', function() {
				this.leftPanelRegion.show(this.leftPanel);
				this.rightPanelRegion.show(this.rightPanel);
				this.ui.headerTitle.text(this.headerTitle);
				Waves.init();
			})
		}
	});

	return HeaderView;
});
