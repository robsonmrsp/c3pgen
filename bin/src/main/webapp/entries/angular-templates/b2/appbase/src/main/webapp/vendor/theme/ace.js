/**
 * Required. Ace's Basic File to Initiliaze Different Parts and Some Variables.
 */

(function($, undefined) {
	if (!('ace' in window))
		window['ace'] = {}
	if (!('helper' in window['ace']))
		window['ace'].helper = {}
	if (!('vars' in window['ace']))
		window['ace'].vars = {}
	window['ace'].vars['icon'] = ' ace-icon ';
	window['ace'].vars['.icon'] = '.ace-icon';

	ace.vars['touch'] = ('ontouchstart' in document.documentElement);// 

	ace['click_event'] = ace.vars['touch'] && $.fn.tap ? 'tap' : 'click';

	var agent = navigator.userAgent
	ace.vars['webkit'] = !!agent.match(/AppleWebKit/i)
	ace.vars['safari'] = !!agent.match(/Safari/i) && !agent.match(/Chrome/i);
	ace.vars['android'] = ace.vars['safari'] && !!agent.match(/Android/i)
	ace.vars['ios_safari'] = !!agent.match(/OS ([4-9])(_\d)+ like Mac OS X/i) && !agent.match(/CriOS/i)

	ace.vars['ie'] = window.navigator.msPointerEnabled || (document.all && document.querySelector);// 8-11
	ace.vars['old_ie'] = document.all && !document.addEventListener;// 8 and
	// below
	ace.vars['very_old_ie'] = document.all && !document.querySelector;// 7 and
	// below
	ace.vars['firefox'] = 'MozAppearance' in document.documentElement.style;

	ace.vars['non_auto_fixed'] = ace.vars['android'] || ace.vars['ios_safari'];

})(jQuery);

jQuery(function($) {

	enableSidebar();

	function enableSidebar() {
		// initiate sidebar function
		var $sidebar = $('.sidebar');
		if ($.fn.ace_sidebar)
			$sidebar.ace_sidebar();
		if ($.fn.ace_sidebar_scroll)
			$sidebar.ace_sidebar_scroll({
				'scroll_to_active' : true, // scroll to selected item? (one
				'include_shortcuts' : true, // true = include shortcut buttons
				'include_toggle' : false || ace.vars['safari'] || ace.vars['ios_safari'], // true
				'smooth_scroll' : 150, // > 0 means smooth_scroll, time in ms,
				'outside' : false
			});
		if ($.fn.ace_sidebar_hover)
			$sidebar.ace_sidebar_hover({
				'sub_hover_delay' : 750,
				'sub_scroll_style' : 'no-track scroll-thin scroll-margin scroll-visible'
			});
	}
	window.AceTemplate = {};
	window.AceTemplate.enableSidebar = enableSidebar
})

// some functions
ace.helper.redraw = function(elem, force) {
	var saved_val = elem.style['display'];
	elem.style.display = 'none';
	elem.offsetHeight;
	if (force !== true) {
		elem.style.display = saved_val;
	} else {
		// force redraw for example in old IE
		setTimeout(function() {
			elem.style.display = saved_val;
		}, 10);
	}
}

ace.helper.boolAttr = function(elem, attr) {
	return elem.getAttribute(attr) === "true";
}
ace.helper.intAttr = function(elem, attr) {
	return parseInt(elem.getAttribute(attr)) || 0;
}

ace.helper.scrollTop = function() {
	return document.scrollTop || document.documentElement.scrollTop || document.body.scrollTop
	// return $(window).scrollTop();
}
ace.helper.winHeight = function() {
	return window.innerHeight || document.documentElement.clientHeight;
	// return $(window).innerHeight();
}
ace.helper.camelCase = function(str) {
	return str.replace(/-([\da-z])/gi, function(match, chr) {
		return chr ? chr.toUpperCase() : '';
	});
}
ace.helper.removeStyle = 'removeProperty' in document.documentElement.style ? function(elem, prop) {
	elem.style.removeProperty(prop)
} : function(elem, prop) {
	elem.style[ace.helper.camelCase(prop)] = ''
}

ace.helper.hasClass = 'classList' in document.documentElement ? function(elem, className) {
	return elem.classList.contains(className);
} : function(elem, className) {
	return elem.className.indexOf(className) > -1;
}
