define([ 'adapters/jquery-adapter' ], function($) {

	var initialize = function() {
		setTimeout(function() {
			var blockerPanel = $('#block_panel');
			blockerPanel.on('transitionend', function() {
				blockerPanel.remove()
			})
			blockerPanel.addClass("fadedOut");

			$('body').sprFlat({
				colors : {
					white : '#fff',
					dark : '#79859b',
					red : '#f68484',
					blue : '#75b9e6',
					green : '#71d398',
					yellow : '#ffcc66',
					orange : '#f4b162',
					purple : '#af91e1',
					pink : '#f78db8',
					lime : '#a8db43',
					mageta : '#eb45a7',
					teal : '#97d3c5',
					black : '#000',
					brown : '#d1b993',
					gray : '#f3f5f6'
				},
				customScroll : {
					color : '#999', // color of custom scroll
					railColor : '#eee', // color of rail
					size : '5px', // size in pixels
					opacity : '0.5', // opacity
					alwaysVisible : false
				// disable hide in
				},
				header : {
					fixed : true
				// fixed header
				},
				breadcrumbs : {
					auto : true
				// auto populate breadcrumbs via js if is false you need to
				// provide own
				// markup see for example.
				},
				sidebar : {
					fixed : true,// fixed sidebar
					rememberToggle : true, // remember if sidebar is hided
					offCanvas : false, // make sidebar offcanvas in tablet and
					// small
					// screens
					pinnedSearch : false
				// make search to be pinned into top
				},
				sideNav : {
					flyout : false, // make flyout menu ,please put sidebar
					// fixed to
					// false in order to work.
					hover : false, // shows subs on hover or click
					showNotificationNumbers : 'onhover',// show how many
					// elements menu
					// have with notifcation style
					// values - always, onhover,
					// never4
					showSubArrow : {
						showArrows : false,// show arrow icon to indicate sub
						sideNavArrowIcon : 'en-arrow-down5' // arrow icon for
					// navigation
					},
					showSubPlus : {
						showPlus : true,// Show plus icon instead of arrow to
						// indicate
						// sub
						sideNavPlusIcon : 'en-plus3 s16',// icon for expand
						// state of
						// submenu
						sideNavMinusIcon : 'en-minus3 s16'// icon for closed
					// state of
					// submenu
					},
					showIndicator : false,// show indicator when hover links
					notificationColor : 'red', // green, red
					subOpenSpeed : 300,// animation speed for open subs
					subCloseSpeed : 400,// animation speed for close subs
					animationEasing : 'linear',// animation easing
					autoCurrentSystem : {
						active : true,// set on or off the auto current system
						// via
						// javascript
						absoluteUrl : false, // put true if use absolute path
						// links.
						// example http://www.host.com/dashboard
						// instead of /dashboard
						subDir : '' // if you put template in sub dir you need
					// to fill
					// here. example '/html'
					}
				},
				tile : {
					countNumbers : true
				// count numbers from 0 to specified value (required count
				// plugin)
				},
				panels : {
					refreshIcon : 'im-spinner6',// refresh icon for panels
					toggleIcon : 'im-minus',// toggle icon for panels
					collapseIcon : 'im-plus',// colapse icon for panels
					closeIcon : 'im-close', // close icon
					showControlsOnHover : true,// Show controls only on hover.
					overlayRefreshIcon : 'im-spinner5', // loading icon in
					// overlay
					rememberSortablePosition : true
				// remember position in localstorage
				},
				forms : {
					checkAndRadioTheme : 'blue', // theme for radios - aero,
				// blue,flat,
				// green,gray,orange,pink,purple,red,yellow
				},
				tooltips : true, // activate tooltip plugin build in
				// bootstrap
				tables : {
					responsive : true, // make tables resposnive
					customscroll : true
				// ativate custom scroll for responsive tables
				},
				alerts : {
					animation : true, // animation effect toggle
					closeEffect : 'bounceOutDown' // close effect for alerts
				// see
				// http://daneden.github.io/animate.css/
				},
				backToTop : {
					active : true, // activate back to top
					scrolltime : 800, // scroll time speed
					imgsrc : 'images/backtop.png', // image
					width : 48, // width of image
					place : 'bottom-right', // position top-left, top-right,
					// bottom-right, bottom-left
					fadein : 500, // fadein speed
					fadeout : 500, // fadeOut speed
					opacity : 0.5, // opacity
					marginX : 1, // X margin
					marginY : 2
				// Y margin
				},
				dropdownMenu : {
					animation : true, // animation effect for dropdown
					openEffect : 'fadeInDown',// open effect for menu see
				// http://daneden.github.io/animate.css/
				}
			});

			// get settings object
			var sprObject = $('body').data('sprFlat');
			var settings = sprObject.settings;
			
			
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
		}, 300);
	};
	return {
		initialize : initialize
	};
});
