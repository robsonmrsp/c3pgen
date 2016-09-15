define([ 'jquery', 'bootbox', 'bootstrap', 'jqueryNumeric', 'jqueryMaskInput', 'jqueryScrollTo', 'jqueryValidatorEngine', 'jqueryValidatorEnginePtBr', 'morris', 'raphael', 'datetimepicker', 'bootbox', 'datetimepicker_lang_pt_BR', 'jqueryUI', 'nprogress', 'aceSettings', 'ace',
		'aceSidebar', 'jqueryGritter', 'selectize', 'jqueryForm' ], function($) {
	$.mask.definitions['h'] = "[A-Fa-f0-9]";
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
			newNumber = newNumber.replace(/\./g, ',');
		} else {
			newNumber = num
		}
		return newNumber.replace(/[^\d,]+/g, '')
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
	$.fn.formatNumber = function(places) {
		var oldVal = this.val();
		var newNumber = "" + oldVal;
		newNumber = newNumber.replace(/\./g, ',');

		this.val(formatNumber(newNumber, places || 2));

		this.on('keyup', function(evt) {
			var $this = $(this);
			$this.val(formatNumber($this.val(), places || 2));
		})
	};
	return $;
});
