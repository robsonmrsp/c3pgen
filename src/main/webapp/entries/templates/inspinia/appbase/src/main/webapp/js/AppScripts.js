define([ 'adapters/jquery-adapter' ], function($) {

	var initialize = function() {
		// Add body-small class if window less than 768px
		if ($(window).width() < 769) {
			$('body').addClass('body-small')
		} else {
			$('body').removeClass('body-small')
		}

		// MetsiMenu
		$('#side-menu').metisMenu();

		// Collapse ibox function
		$('.collapse-link').click(function() {
			var ibox = $(this).closest('div.ibox');
			var button = $(this).find('i');
			var content = ibox.find('div.ibox-content');
			content.slideToggle(200);
			button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
			ibox.toggleClass('').toggleClass('border-bottom');
			setTimeout(function() {
				ibox.resize();
				ibox.find('[id^=map-]').resize();
			}, 50);
		});

		// Close ibox function
		$('.close-link').click(function() {
			var content = $(this).closest('div.ibox');
			content.remove();
		});

		// Close menu in canvas mode
		$('.close-canvas-menu').click(function() {
			$("body").toggleClass("mini-navbar");
			//SmoothlyMenu();
		});

		// Open close right sidebar
		$('.right-sidebar-toggle').click(function() {
			$('#right-sidebar').toggleClass('sidebar-open');
		});

		// Initialize slimscroll for right sidebar
		$('.sidebar-container').slimScroll({
			height : '100%',
			railOpacity : 0.4,
			wheelStep : 10
		});

		// Open close small chat
		$('.open-small-chat').click(function() {
			$(this).children().toggleClass('fa-comments').toggleClass('fa-remove');
			$('.small-chat-box').toggleClass('active');
		});

		// Initialize slimscroll for small chat
		$('.small-chat-box .content').slimScroll({
			height : '234px',
			railOpacity : 0.4
		});

		// Small todo handler
		$('.check-link').click(function() {
			var button = $(this).find('i');
			var label = $(this).next('span');
			button.toggleClass('fa-check-square').toggleClass('fa-square-o');
			label.toggleClass('todo-completed');
			return false;
		});

		// Append config box / Only for demo purpose
		// Uncomment on server mode to enable XHR calls
//		$.get("skin-config.html", function(data) {
//			if (!$('body').hasClass('no-skin-config'))
//				$('body').append(data);
//		});

		// Minimalize menu
		$('.navbar-minimalize').click(function() {
			$("body").toggleClass("mini-navbar");
//			SmoothlyMenu();

		});

		// Tooltips demo
		$('.tooltip-demo').tooltip({
			selector : "[data-toggle=tooltip]",
			container : "body"
		});

		// Move modal to body
		// Fix Bootstrap backdrop issu with animation.css
		$('.modal').appendTo("body");

		// Full height of sidebar
		function fix_height() {
			var heightWithoutNavbar = $("body > #wrapper").height() - 61;
			$(".sidebard-panel").css("min-height", heightWithoutNavbar + "px");

			var navbarHeigh = $('nav.navbar-default').height();
			var wrapperHeigh = $('#page-wrapper').height();

			if (navbarHeigh > wrapperHeigh) {
				$('#page-wrapper').css("min-height", navbarHeigh + "px");
			}

			if (navbarHeigh < wrapperHeigh) {
				$('#page-wrapper').css("min-height", $(window).height() + "px");
			}

		}
		fix_height();

		// Fixed Sidebar
		$(window).bind("load", function() {
			if ($("body").hasClass('fixed-sidebar')) {
				$('.sidebar-collapse').slimScroll({
					height : '100%',
					railOpacity : 0.9
				});
			}
		})

		// Move right sidebar top after scroll
		$(window).scroll(function() {
			if ($(window).scrollTop() > 0 && !$('body').hasClass('fixed-nav')) {
				$('#right-sidebar').addClass('sidebar-top');
			} else {
				$('#right-sidebar').removeClass('sidebar-top');
			}
		});

		$(document).bind("load resize scroll", function() {
			if (!$("body").hasClass('body-small')) {
				fix_height();
			}
		});

		$("[data-toggle=popover]").popover();

		// Add slimscroll to element
		$('.full-height-scroll').slimscroll({
			height : '100%'
		})

		// GERAL
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
