define(function(require) {
	var $ = require('adapters/jquery-adapter');

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

		// limpado

	};
	var prepare = function() {

		function tog(v) {
			return v ? 'addClass' : 'removeClass';
		}

		$(document).on('input', '.clearable', function() {
			$(this)[tog(this.value)]('x');
		}).on('mousemove', '.x', function(e) {
			$(this)[tog(this.offsetWidth - 18 < e.clientX - this.getBoundingClientRect().left)]('onX');
		}).on('touchstart click', '.onX', function(ev) {
			ev.preventDefault();
			$(this).removeClass('x onX').val('').change();
		});

	}

	return {
		initialize : initialize,
		prepare : prepare,
	};
});
