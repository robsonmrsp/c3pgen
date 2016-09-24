define([ 'jquery', 'jqueryValidatorEngine', 'jqueryValidatorEnginePtBr', 'datetimepicker', 'datetimepicker_lang_pt_BR', 'bootstrap', 'aceSettings', 'ace', 'aceSidebar', 'jqueryUI', 'bootbox' ], function($) {

	$.fn.datetimepicker.defaults.icons = {
		time : "fa fa-clock-o",
		date : "fa fa-calendar",
		up : "fa fa-arrow-up",
		down : "fa fa-arrow-down"
	}

	// criação do prugin de formatacao de numeros
	var toStrNumber = function(num) {
		var newNumber = '';
		if (typeof num == 'number') {
			newNumber = newNumber + num;
			newNumber = newNumber.replace(/[^\d.-]/g, '')
			newNumber = newNumber.replace(/\./g, ',');
		} else {

			newNumber = num.replace(/[^\d.,-]/g, '');
		}
		return newNumber;
	};

	var formatNumber = function(num, places) {
		num = toStrNumber(num);

		var str = num.toString().replace("$", ""), parts = false, output = [], i = 1, formatted = null;
		if (str.indexOf(",") > 0) {
			parts = str.split(",");
			str = parts[0];
		}
		str = str.split("").reverse();
		for (var j = 0, len = str.length; j < len; j++) {
			if (str[j] != ".") {
				output.push(str[j]);
				if (i % 3 == 0 && j < (len - 1)) {
					output.push(".");
				}
				i++;
			}
		}
		formatted = output.reverse().join("");
		return (formatted + ((parts) ? "," + parts[1].substr(0, places) : ""));
	};
	$.fn.formatNumber = function(opt) {
		var places = null;
		if (opt && opt.places) {
			places = opt.places;
		} else {
			places = opt;
		}

		var oldVal = this.val();
		var newNumber = "" + oldVal;
		newNumber = newNumber.replace(/\./g, ',');

		this.val(formatNumber(newNumber, places || 2));

		this.on('keypress', function(evt) {
			console.log('pressed ' + evt.keyCode);
		})
		this.on('keyup', function(evt) {

			console.log('up' + evt.keyCode);

			var $this = $(this);
			$this.val(formatNumber($this.val(), places || 2));
		})
	};

	$(function() {
		console.info('Carregando o necessário do plugin ace');
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
	});
	return $;
});
