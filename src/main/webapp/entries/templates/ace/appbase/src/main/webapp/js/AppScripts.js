define([ 'adapters/jquery-adapter' ], function($) {

	var initialize = function() {

		try {

			if (AceTemplate && AceTemplate.enableSidebar)
				AceTemplate.enableSidebar();
		} catch (e) {
			console.error(e);
		}

		setTimeout(function() {
			var blockerPanel = $('#loadInitialPanel');
			blockerPanel.on('transitionend', function() {
			});
			blockerPanel.remove()
			blockerPanel.addClass("fadedOut");
		}, 200);

		$(window).scroll(function() {
			if ($(this).scrollTop()) {
				$('#toTop').fadeIn(1000);
			} else {
				$('#toTop').fadeOut(1000);
			}
		});
		$("#toTop").click(function() {
			// 1 second of animation time
			// html works for FFX but not Chrome
			// body works for Chrome but not FFX
			// This strange selector seems to work universally
			$("html, body").animate({
				scrollTop : 0
			}, 500);
		});

	};
	return {
		initialize : initialize
	};
});
