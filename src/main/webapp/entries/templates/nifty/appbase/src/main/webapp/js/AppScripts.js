define(function(require) {
	var $ = require('adapters/jquery-adapter');
	
	var initialize = function() {

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

			$("html, body").animate({
				scrollTop : 0
			}, 500);
		});

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
