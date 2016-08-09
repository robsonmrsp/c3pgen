//
// ...the magic starts here...
//
/////////////////////////////////

// ND2 Widgets
(function($) {

	$.widget("nd2.gallery", {
		options : {
			count : 15,
			delay : 100,
			duration : 400,
			cols : 5
		},
		_create : function() {
			var el = this.element;
			var opts = $.extend(this.options, el.data("options"));
			$(document).trigger("creategallery");
			var _html = "";
			for (var i = 1; i <= opts.count; i++) {
				var calcDelay = (Math.round(i * (opts.delay / 1000) * 10) / 10);
				_delay = (calcDelay > 2) ? (i % 5 / 10) : calcDelay;
				_html += "<div class='dummybox wow zoomIn' data-wow-duration='" + opts.duration + "' data-wow-delay='" + _delay + "s'>" + i + "</div>";
			}
			el.html(_html);
		},
		_update : function() {

		},
		refresh : function() {
			return this._update();
		}
	});

	$(document).bind("pagecreate", function(e) {
		$(document).trigger("gallerybeforecreate");
		return $("nd2-gallery", e.target).gallery();
	});

	// nd2-include
	$.widget("nd2.include", {
		options : {
			src : null,
			post : {}
		},
		_create : function() {
			var el = this.element;
			var opts = $.extend(this.options, el.data("options"));
			$(document).trigger("createinclude");

			if (opts.src !== null) {
				el.load(opts.src, opts.post, function() {
					el.enhanceWithin();

					// Apply waves.js
					if (typeof Waves !== "undefined") {
						Waves.attach('a', [ 'waves-button' ]);
						Waves.attach('button', [ 'waves-button' ]);
						Waves.init();

						$("body").find(".ui-flipswitch-on").removeClass("waves-effect");
						Waves.attach('.ui-flipswitch', [ 'waves-button', 'waves-light' ]);

					}

				});
			}
		},
		_update : function() {
			console.log("update?");
		},
		refresh : function() {
			return this._update();
		}
	});

	$(document).bind("pagecreate", function(e) {
		$(document).trigger("includebeforecreate");
		return $("nd2-include", e.target).include();
	});

	// nd2-ad
	$.widget("nd2.ad", {
		options : {
			banner : null,
			path : null,
			active : null,
			extension : null,
			post : {}
		},
		_create : function() {

			var _self = this;

			window.setTimeout(function() {

				if (typeof window.nd2 !== 'undefined' && typeof window.nd2.settings !== 'undefined' && typeof window.nd2.settings.advertising !== 'undefined') {
					if (typeof window.nd2.settings.advertising.path !== 'undefined') {
						_self.options.path = window.nd2.settings.advertising.path;
					}
					if (typeof window.nd2.settings.advertising.active !== 'undefined') {
						_self.options.active = window.nd2.settings.advertising.active;
					}
					if (typeof window.nd2.settings.advertising.extension !== 'undefined') {
						_self.options.extension = window.nd2.settings.advertising.extension;
					}
				}

				var el = _self.element;
				var opts = $.extend(_self.options, el.data("options"));
				$(document).trigger("createinclude");

				if (opts.active && opts.banner !== null) {
					var src = (opts.path || "") + opts.banner + (opts.extension || "");
					el.addClass("nd2-banner");
					el.load(src, opts.post, function() {
						el.enhanceWithin();
					});
				}

			}, 600);

		},
		_update : function() {
			// console.log("update?");
		},
		refresh : function() {
			return this._update();
		}
	});

	$(document).bind("pagecreate", function(e) {
		$(document).trigger("includebeforecreate");
		return $("nd2-ad", e.target).ad();
	});

	// nd2-tabs
	$.widget("nd2.tabs", {
		options : {},
		settings : {
			activeTab : false,
			activeIdx : 0
		},
		_create : function() {
			var _self = this;
			var el = this.element;
			el.addClass("nd2Tabs");

			el.find("li[data-tab]").each(function(idx) {
				$(this).addClass("nd2Tabs-nav-item");
				if ($(this).data("tab-active") && !_self.settings.activeTab) {
					$(this).addClass("nd2Tabs-active");
					_self.settings.activeTab = $(this).data("tab");
					_self.settings.activeIdx = idx;
				}
			});

			// Select First if activeTab is not set
			if (!_self.settings.activeTab) {
				var firstEl = el.find("li[data-tab]").first();
				if (firstEl.length > 0) {
					firstEl.addClass("nd2Tabs-active");
					_self.settings.activeTab = firstEl.data("tab");
				} else {
					_self.destroyTabs();
				}
			}

			// Waves.js
			if (typeof Waves !== "undefined") {
				Waves.attach('.nd2Tabs-nav-item', [ 'waves-button', 'waves-light' ]);
				Waves.init();
			}

			// Bind Events
			el.on("click", ".nd2Tabs-nav-item:not('.nd2Tabs-active')", function(e) {
				e.preventDefault();
				_self.switchTab($(this), $(this).data('tab'), $(".nd2Tabs-nav-item").index($(this)[0]));
			});

			if (_self.settings.activeTab) {
				_self.prepareTabs();
			}

		},
		_update : function() {
		},
		refresh : function() {
			return this._update();
		},
		destroyTabs : function() {
			this.element.remove();
		},
		switchTab : function(obj, tabKey, toIdx) {
			var _self = this;

			var direction = (parseInt(toIdx, 10) > _self.settings.activeIdx) ? "right" : "left";
			var directionTo = (parseInt(toIdx, 10) < _self.settings.activeIdx) ? "right" : "left";

			obj.parent().find(".nd2Tabs-active").removeClass("nd2Tabs-active");

			obj.addClass('nd2Tabs-active');

			_self.settings.activeIdx = parseInt(toIdx, 10);
			_self.settings.activeTab = tabKey;

			// Activate Content Tab
			var oldContent = $("body").find(".nd2Tabs-content-tab.nd2Tab-active");

			oldContent.addClass("to-" + directionTo);
			window.setTimeout(function() {
				oldContent.removeClass("nd2Tab-active to-" + directionTo);
			}, 400);

			var newContent = $("body").find(".nd2Tabs-content-tab[data-tab='" + _self.settings.activeTab + "']");

			newContent.addClass("nd2Tab-active from-" + direction);

			window.setTimeout(function() {
				newContent.removeClass("from-" + direction);
			}, 150);

		},
		prepareTabs : function() {
			var _self = this;
			var tabs = $("body").find("[data-role='nd2tab']");
			if (tabs.length > 0) {
				tabs.addClass("nd2Tabs-content-tab");
				tabs.each(function(idx) {
					if ($(this).data('tab') == _self.settings.activeTab) {
						$(this).addClass('nd2Tab-active');
					}
				});
			} else {
				_self.destroyTabs();
			}
		}
	});

	$(document).bind("pagecreate", function(e) {
		$(document).trigger("includebeforecreate");
		return $("[data-role='nd2tabs']", e.target).tabs();
	});

	// nd2Toast
	(function($) {
		$.nd2Toast = function(options) {

			var _self = this;

			_self.defaults = {
				message : "",
				action : {
					link : null,
					title : null,
					fn : null,
					color : "lime"
				},
				ttl : 3000
			};

			_self.isClosed = false;

			_self.toastId = null;

			_self.options = $.extend(_self.defaults, options);

			_self.getToast = function() {
				return $("body").find("#" + _self.toastId);
			};

			_self.hasPendingToasts = function() {
				return ($("body").find(".nd2-toast").length > 0);
			};

			_self.getOtherToast = function() {
				return $("body").find(".nd2-toast");
			}

			_self.hasAction = function() {
				return (_self.options.action.title && (_self.options.action.link || _self.options.action.fn));
			};

			_self.getAction = function() {
				return (_self.hasAction()) ? "<span class='nd2-toast-action'><a href='javascript:void(-1)' class='ui-btn ui-btn-inline clr-btn-accent-" + _self.options.action.color + "'>" + _self.options.action.title + "</a></span>" : "";
			};

			_self.getMessage = function() {
				return "<span class='nd2-toast-message'>" + _self.options.message + "</span>";
			};

			_self.generateId = function() {
				_self.toastId = "toast" + Math.random().toString(16).slice(2);
			};

			_self.create = function() {

				if (!_self.hasPendingToasts()) {

					_self.generateId();

					var hasActionClass = (!_self.hasAction()) ? "no-action" : "";
					var toast = "<div id='" + _self.toastId + "' class='nd2-toast nd2-toast-off " + hasActionClass + "'><div class='nd2-toast-wrapper'>" + _self.getMessage() + _self.getAction() + "</div></div>";

					$("body").append(toast);

					window.setTimeout(function() {
						_self.bindAction();
						_self.show();
					}, 50);

				} else {
					window.setTimeout(function() {
						_self.abortOtherToasts();
					}, 100);
				}
			};

			_self.bindAction = function() {
				if (_self.hasAction()) {

					var toast = _self.getToast();
					var hasLink = (_self.options.action.link);
					var hasEvent = (_self.options.action.fn && typeof _self.options.action.fn === "function");

					toast.find(".nd2-toast-action a").on("click", function() {
						if (hasEvent) {
							_self.options.action.fn();
						}
						if (hasLink) {
							$("body").pagecontainer("change", _self.options.action.link);
						}
						_self.hide();
					});

				}
			};

			_self.show = function() {
				var toast = _self.getToast();
				toast.removeClass("nd2-toast-off");

				$("body").addClass("nd2-toast-open");

				window.setTimeout(function() {
					_self.hide();
				}, _self.options.ttl);

			};

			_self.hide = function() {
				if (_self.isClosed)
					return;

				_self.isClosed = true;

				var toast = _self.getToast();
				if (toast.length > 0) {

					toast.addClass("nd2-toast-off");

					if (_self.hasPendingToasts()) {
						$("body").removeClass("nd2-toast-open");
					}

					window.setTimeout(function() {
						_self.destroyToast();
					}, 400);
				}

			};

			_self.destroyToast = function() {
				var toast = _self.getToast();
				toast.remove();
			};

			_self.abortOtherToasts = function() {

				if (_self.hasPendingToasts()) {

					var toast = _self.getOtherToast();
					if (toast) {

						toast.addClass("nd2-toast-off");

						$("body").removeClass("nd2-toast-open");

						window.setTimeout(function() {

							toast.remove();
							_self.create();

						}, 400);

					}

				}

			};

			_self.create();

		}

		$("body").on("click", "[data-role='toast']", function(e) {
			e.preventDefault();
			var options = {
				action : {}
			};

			if ($(this).data('toast-message')) {
				options.message = $(this).data('toast-message');
			}
			if ($(this).data('toast-ttl')) {
				options.ttl = $(this).data('toast-ttl');
			}
			if ($(this).data('toast-action-title')) {
				options.action.title = $(this).data('toast-action-title');
			}
			if ($(this).data('toast-action-link')) {
				options.action.link = $(this).data('toast-action-link');
			}
			if ($(this).data('toast-action-color')) {
				options.action.color = $(this).data('toast-action-color');
			}

			new $.nd2Toast(options);

		})

	}(jQuery));

	// nd2 Project Settings
	(function($) {
		$.nd2 = function(options) {

			var _self = this;

			_self.defaults = {
				stats : {
					analyticsUA : null
				// Your UA-Code for Example: 'UA-123456-78'
				},
				advertising : {
					active : false, // true | false
					path : null, // "/examples/fragments/adsense/",
					extension : null
				// ".html"
				}
			};

			_self.options = $.extend(_self.defaults, options);

			_self.build = function() {

				console.log("nd2 Project settings: ");
				console.log(_self.options);

				_self.globalSettings();
				_self.bindNavigationSwipe();
				_self.iniWow();
				_self.iniWaves();
				_self.iniSmoothTransition();
				_self.iniGoogleAnalytics();

			};

			_self.globalSettings = function() {
				window.nd2 = {
					settings : _self.options
				};
			};

			_self.bindNavigationSwipe = function() {
				$(".ui-page:not('.nd2-no-menu-swipe')").on("swiperight swipeleft", function(e) {
					if ($(".ui-page-active").jqmData("panel") !== "open") {
						if (e.type === "swiperight") {
							$(".ui-panel.ui-panel-position-left:first").panel("open");
						}
					}
				});
			};

			_self.iniWow = function() {
				if (typeof WOW !== "undefined") {
					new WOW().init();
				}
			};

			_self.iniWaves = function() {
				if (typeof Waves !== "undefined") {
					Waves.attach('a', [ 'waves-button' ]);
					Waves.attach('button', [ 'waves-button' ]);
					Waves.init();
					$("body").find(".ui-flipswitch-on").removeClass("waves-effect");
					Waves.attach('.ui-flipswitch', [ 'waves-button', 'waves-light' ]);
				}
			};

			_self.iniSmoothTransition = function() {
				$("body").addClass("nd2-ready");
				$(document).on("pagechange", function() {
					$("body").removeClass("nd2-ready");
				});
			};

			_self.getUrlParts = function(url) {
				var a = document.createElement('a');
				a.href = url;

				return {
					href : a.href,
					host : a.host,
					hostname : a.hostname,
					port : a.port,
					pathname : a.pathname,
					protocol : a.protocol,
					hash : a.hash,
					search : a.search
				};
			};

			_self.iniGoogleAnalytics = function() {

				var _ga = {
					send : function(url) {
						(!url) ? ga('send', 'pageview') : ga('send', 'pageview', url);
					}
				};

				if (_self.options.stats.analyticsUA) {
					(function(i, s, o, g, r, a, m) {
						i['GoogleAnalyticsObject'] = r;
						i[r] = i[r] || function() {
							(i[r].q = i[r].q || []).push(arguments)
						}, i[r].l = 1 * new Date();
						a = s.createElement(o), m = s.getElementsByTagName(o)[0];
						a.async = 1;
						a.src = g;
						m.parentNode.insertBefore(a, m)
					})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

					ga('create', _self.options.stats.analyticsUA, 'auto');
					_ga.send(null);

					// Trigger Page Change

					$("body").on("pagechange", function(evt, data) {
						_ga.send(_self.getUrlParts(data.options.absUrl).pathname);
					});

				}

			};

			_self.build();

		}

	}(jQuery));

})(jQuery);

// Small Helpers

var chartThemeGenerator = function(color) {

	var _self = this;

	_self.colorIndex = [ 'red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green', 'light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange', 'brown', 'grey', 'blue-grey' ];
	_self.colorHex = {
		red : '#F44336',
		pink : '#E91E63',
		purple : '#9C27B0',
		deep_purple : '#673AB7',
		indigo : '#3F51B5',
		blue : '#2196F3',
		light_blue : '#03A9F4',
		cyan : '#00BCD4',
		teal : '#009688',
		green : '#4CAF50',
		light_green : '#8BC34A',
		lime : '#CDDC39',
		yellow : '#FFEB3B',
		amber : '#FFC107',
		orange : '#FF9800',
		deep_orange : '#FF5722',
		brown : '#795548',
		grey : '#9E9E9E',
		blue_grey : '#607D8B'
	},

	_self.indexByColor = _self.colorIndex.indexOf(color);

	_self.alpha = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r' ];

	if (_self.indexByColor > -1) {
		var colorArray = [];
		var colorArrayAfter = [];
		var cLoop = 0;
		_self.colorIndex.forEach(function(ci) {
			if (cLoop < _self.indexByColor) {
				colorArrayAfter.push(ci);
			} else {
				colorArray.push(ci);
			}
			cLoop++;
		});

		colorArray = colorArray.concat(colorArrayAfter);

		var css = [];

		for (var i = 0; i < _self.alpha.length; i++) {
			var alpha = _self.alpha[i];
			var colorName = colorArray[i];
			var colorNice = colorName.replace('-', '_');
			var hex = _self.colorHex[colorNice];
			// General
			// css.push(".nd2-chart .ct-series-"+alpha+" .ct-bar, .nd2-chart
			// .ct-series-"+alpha+" .ct-line, .nd2-chart .ct-series-"+alpha+"
			// .ct-point, .nd2-chart .ct-series-"+alpha+" .ct-slice-donut {
			// stroke: "+hex+"; } .nd2-chart .ct-series-"+alpha+" .ct-area,
			// .nd2-chart .ct-series-"+alpha+" .ct-slice-pie { fill: "+hex+"; }
			// ");

			// Color Themes
			css.push(".nd2-chart.clr-theme-" + color + " .ct-series-" + alpha + " .ct-bar, .nd2-chart.clr-theme-" + color + " .ct-series-" + alpha + " .ct-line, .nd2-chart.clr-theme-" + color + " .ct-series-" + alpha + " .ct-point, .nd2-chart.clr-theme-" + color + " .ct-series-"
					+ alpha + " .ct-slice-donut {	stroke: " + hex + "; } .nd2-chart.clr-theme-" + color + " .ct-series-" + alpha + " .ct-area, .nd2-chart.clr-theme-" + color + " .ct-series-" + alpha + " .ct-slice-pie { fill: " + hex + "; } ");
		}

		console.log("/* Chart-Color-Theme: " + color + " */\n" + css.join(" ") + "\n\n");

	}

}

// var tmpClr =
// ['red','pink','purple','deep-purple','indigo','blue','light-blue','cyan','teal','green','light-green','lime','yellow','amber','orange','deep-orange','brown','grey','blue-grey'];
// tmpClr.forEach(function(c) {
// chartThemeGenerator(c);
// });

// Magic ends.
// /////////////
