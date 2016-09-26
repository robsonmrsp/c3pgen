(function($) {

	$.alerts = {

		// These properties can be read/written by accessing
		// $.alerts.propertyName from your scripts at any time

		verticalOffset : -75, // vertical offset of the dialog from center
		// screen, in pixels
		horizontalOffset : 0, // horizontal offset of the dialog from center
		// screen, in pixels/
		repositionOnResize : true, // re-centers the dialog on window resize
		overlayOpacity : .5, // transparency level of overlay
		overlayColor : '#000', // base color of overlay
		draggable : true, // make the dialogs draggable (requires UI
		// Draggables plugin)
		okButton : '&nbsp;OK&nbsp;', // text for the OK button
		cancelButton : '&nbsp;Cancel&nbsp;', // text for the Cancel button
		dialogClass : null, // if specified, this class will be applied to all

		// dialogs

		// Public methods

		alert : function(message, title, iconType, callback) {
			if (title == null)
				title = 'Alert';
			$('.modal-backdrop').show()
			$.alerts._show(title, message, iconType, null, 'alert', function(result) {
				if (callback) {
					callback(result);
				}
				$('.modal-backdrop').hide()
			});
		},

		prompt : function(message, title, callback, inputElement) {
			if (title == null)
				title = 'Prompt';
			$.alerts._show(title, message, null, 'prompt', null, function(result) {
				$('.modal-backdrop').show()
				if (callback)
					callback(result);
				$('.modal-backdrop').hide()
			}, inputElement);
		},

		confirm : function(message, title,iconType, callback) {
			if (title == null)
				title = 'Confirm';
			$('.modal-backdrop').show()
			$.alerts._show(title, message, iconType, null, 'confirm', function(result) {
				if (callback)
					callback(result);
				$('.modal-backdrop').hide()
			});
		},

		// Private methods

		_show : function(title, msg, iconType, value, type, callback, inputElement) {

			$.alerts._hide();
			$.alerts._overlay('show');
			$.alerts._iconType(iconType);

			var _template = [];

			_template.push("<div id='popup_container' class='nd2-card '> ");
			_template.push("	<div class='card-title has-supporting-text has-avatar bgCardAlert'> ");
			_template.push(" 		<h3 class='card-primary-title-alert descricao'>" + $.alerts._iconType(iconType) + "&nbsp <strong class='title-alert'></strong>");
			_template.push("		</h3>" +
						   "	</div>");
			_template.push("	<div class='card-media'></div>");
			_template.push(" 	<div id='popup_message' class='card-supporting-text has-action'>" + "		<strong>Impossivel realizar acao</strong>" + "	</div> ");
			_template.push(" 	<div class='card-action'> ");
			_template.push(" 		<div class='row between-xs'> ");
			_template.push(" 			<div class='col-xs-12 align-right'> ");
			_template.push(" 				<div id='popup_footer' > ");
			_template.push(" 				</div> ");
			_template.push(" 			</div> ");
			_template.push(" 		</div> ");
			_template.push(" 	</div> ");
			_template.push("</div> ");

			$("BODY").append(_template.join("")).enhanceWithin();

			if ($.alerts.dialogClass)
				$("#popup_container").addClass($.alerts.dialogClass);

			$("#popup_container").css({
				position : 'fixed',
				zIndex : 99999,
				padding : 0,
				margin : 0
			});

			$(".title-alert").text(title);
			// $("#popup_title").text(title);
			$("#popup_content").addClass(type);
			$("#popup_message").text(msg);
			$("#popup_message").html($("#popup_message").text().replace(/\n/g, '<br />'));

			$("#popup_container").css({
			// minWidth : $("#popup_container").outerWidth(),
			// maxWidth : $("#popup_container").outerWidth()
			});

			$.alerts._reposition();
			$.alerts._maintainPosition(true);

			switch (type) {
			case 'alert':

				"<a href='javascript:void(-1)' class='ui-btn ui-btn-inline waves-effect waves-button waves-effect waves-button'>" + $.alerts.okButton + " id='popup_ok' </a>"
				// $("#popup_footer").append('<input class="btn btn-lg
				// btn-success "
				// type="button" value="' + $.alerts.okButton + '" id="popup_ok"
				// />');
				$("#popup_footer").append("<a href='javascript:void(-1)' class='ui-btn ui-btn-inline waves-effect waves-button waves-effect waves-button' id='popup_ok' >" + $.alerts.okButton + " </a>");
				$("#popup_ok").click(function() {
					$.alerts._hide();
					if (callback)
						callback(true);
				});
				$("#popup_ok").focus().keypress(function(e) {
					if (e.keyCode == 13 || e.keyCode == 27)
						$("#popup_ok").trigger('click');
				});
				break;

			case 'confirm':
				$("#popup_footer").append('<input class="btn btn-lg btn-success " type="button" value="Sim" id="popup_ok" /> <input class="btn btn-lg btn-danger" type="button" value="Não" id="popup_cancel" /></div>');
				$("#popup_ok").click(function() {
					$.alerts._hide();
					if (callback)
						callback(true);
				});
				$("#popup_cancel").click(function() {
					$.alerts._hide();
					if (callback)
						callback(false);
				});
				$("#popup_ok").focus();
				$("#popup_ok, #popup_cancel").keypress(function(e) {
					if (e.keyCode == 13)
						$("#popup_ok").trigger('click');
					if (e.keyCode == 27)
						$("#popup_cancel").trigger('click');
				});
				break;

			case 'prompt':
				var inputEl = inputElement || $("<input type='text' size='30' id='popup_prompt'/>")
				if (inputElement) {
					$("#popup_message").append(inputElement);
					$("#popup_footer").append(
							'<div id="popup_panel"><input class="btn btn-lg btn-success " type="button" value="' + $.alerts.okButton + '" id="popup_ok" /> <input class="btn btn-lg btn-danger" type="button" value="' + $.alerts.cancelButton + '" id="popup_cancel" /></div>');
				} else {

					$("#popup_footer").append('<br /><input type="text" size="30" id="popup_prompt" />').after(
							'<div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /> <input type="button" value="' + $.alerts.cancelButton + '" id="popup_cancel" /></div>');
				}

				$("#popup_prompt").width($("#popup_message").width());
				$("#popup_ok").click(function() {
					var val = $(inputElement).val();
					$.alerts._hide();
					if (callback)
						callback(val);
				});
				$("#popup_cancel").click(function() {
					$.alerts._hide();
					if (callback)
						callback(null);
				});
				$("#popup_prompt, #popup_ok, #popup_cancel").keypress(function(e) {
					if (e.keyCode == 13)
						$("#popup_ok").trigger('click');
					if (e.keyCode == 27)
						$("#popup_cancel").trigger('click');
				});
				if (value)
					$("#popup_prompt").val(value);
				$("#popup_prompt").focus().select();
				break;
			}
		},

		_hide : function() {
			$("#popup_container").remove();
			$.alerts._overlay('hide');
			$.alerts._maintainPosition(false);
		},

		_overlay : function(status) {
			switch (status) {
			case 'show':
				$.alerts._overlay('hide');
				$("BODY").append('<div id="popup_overlay"></div>');
				$("#popup_overlay").css({
					position : 'absolute',
					zIndex : 99998,
					top : '0px',
					left : '0px',
					width : '100%',
					height : $(document).height(),
					background : $.alerts.overlayColor,
					opacity : $.alerts.overlayOpacity
				});
				break;
			case 'hide':
				$("#popup_overlay").remove();
				break;
			}
		},

		_reposition : function() {
			var top = (($(window).height() / 2) - ($("#popup_container").outerHeight() / 2)) + $.alerts.verticalOffset;
			var left = (($(window).width() / 2) - ($("#popup_container").outerWidth() / 2)) + $.alerts.horizontalOffset;
			if (top < 0)
				top = 0;
			if (left < 0)
				left = 0;

			// // IE6 fix
			// if ($.browser.msie && parseInt($.browser.version) <= 6)
			// top = top + $(window).scrollTop();

			$("#popup_container").css({
				top : top + 'px',
				left : left + 'px'
			});
			$("#popup_overlay").height($(document).height());
		},

		_maintainPosition : function(status) {
			if ($.alerts.repositionOnResize) {
				switch (status) {
				case true:
					$(window).bind('resize', $.alerts._reposition);
					break;
				case false:
					$(window).unbind('resize', $.alerts._reposition);
					break;
				}
			}
		},

		_iconType : function(iconType) {
			var icon;
			switch (iconType) {
			case 'erro':
				icon = "<i class='zmdi zmdi-alert-triangle zmd-fw'></i>";
				break;

			case 'info':
				icon = "<i class='zmdi zmdi-alert-circle-o zmd-fw'></i>"
				break;
			}
			
			return icon;
		}
	}

	// Shortuct functions

	$.simpleConfirm = function(message, title, iconType, callback) {
		$.alerts.confirm(message, title, iconType, callback);
	};

	$.clearAllAlerts = function() {
		$.alerts._hide();
	};

	$.simpleAlert = function(message, title, iconType, callback) {
		$.alerts.alert (message, title, iconType, callback);
	}
	$.simplePrompt = function(message, title, iconType, callback, element) {
		$.alerts.prompt(message, title, iconType, callback, element);
	}
})(jQuery);

//
// <div class="nd2-card">
// <div class="card-title has-avatar">
// <h3 class="card-primary-title" style="font-size: 38px; padding-top: 12px;
// line-height: 26px;">
// <i class="zmdi zmdi-info-outline zmd-fw"></i>
// Aviso
// </h3>
// </div>
// <div class="card-media"></div>
// <div class="card-supporting-text has-action">
// <strong>Voce deve estar conectado</strong>
// </div>
// <div class="card-action">
// <div class="row between-xs">
// <div class="col-xs-4">
// <div class="box"></div>
// </div>
// <div class="col-xs-8 align-right">
// <div class="box">
// <a href="#" class="ui-btn ui-btn-inline waves-effect waves-button
// waves-effect waves-button">Action</a>
// </div>
// </div>
// </div>
// </div>
// </div>
