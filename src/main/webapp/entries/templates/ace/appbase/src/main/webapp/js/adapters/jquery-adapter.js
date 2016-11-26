define([ 'jquery', 'bootbox', 'bootstrap', 'jqueryScrollTo', 'jqueryValidatorEngine', 'jqueryValidatorEnginePtBr', 'morris', 'raphael', 'datetimepicker', 'bootbox', 'datetimepicker_lang_pt_BR', 'jqueryUI', 'nprogress', 'aceSettings', 'ace', 'aceSidebar', 'jqueryGritter',
		'selectize', 'jqueryForm', 'jqueryInputMask' ], function($) {
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
					output.push("");
				}
				i++;
			}
		}
		formatted = output.reverse().join("");
		return (formatted + ((parts) ? "," + parts[1].substr(0, places) : ""));
	};

	$.fn.escape = function(numeric) {
		var returnValue = null;

		if (this) {
			if (this.prop('tagName') && this.prop('tagName')) {
				var tagName = this.prop('tagName').toUpperCase();
				if (tagName === 'SELECT') {
					returnValue = this.children(":selected").attr("value") || null;
				}
			}
			var type = this.attr('type');
			if (type === 'checkbox' || type === 'radio') {
				returnValue = this.is(':checked');
			} else {
				var text = this.val();
				if (text) {
					returnValue = text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;').replace("'", '&#x27;').trim();
				}
			}
		}
		if (returnValue && numeric) {
			// contemplando numeros negativos
			if (returnValue.indexOf('-') > 0) {
				returnValue = returnValue.replace(/-/g, '').replace(/\./g, '').replace(/\,/g, '.');
			} else {
				returnValue = returnValue.replace(/\./g, '').replace(/\,/g, '.')
			}
		}

		return returnValue;
	}

	$.fn.datetime = function() {
		this.datetimepicker({
			pickTime : true,
			language : 'pt_BR',
		});

		if (this.prop('tagName') && this.prop('tagName')) {
			var tagName = this.prop('tagName').toUpperCase();
			if (tagName === 'INPUT') {
				this.inputmask('datetime');
			}
		}

	};

	$.fn.date = function() {
		this.datetimepicker({
			pickTime : false,
			language : 'pt_BR',
		});

		if (this.prop('tagName') && this.prop('tagName')) {
			var tagName = this.prop('tagName').toUpperCase();
			if (tagName === 'INPUT') {
				this.inputmask('date');
			}
		}

	};

	$.fn.integer = function() {
		this.inputmask('integer');
	}

	$.fn.money = function() {
		this.inputmask('numeric', {
			radixPoint : ',',
			groupSeparator : '.',
			autoGroup : true,
			digits : 2,
			digitsOptional : false,
			placeholder : '0',
		});
	};

	$.fn.percent = function() {
		this.inputmask('numeric', {
			radixPoint : ',',
			groupSeparator : '.',
			autoGroup : true,
			digits : 2,
			digitsOptional : true,
			placeholder : '',
		});
	};
	$.fn.decimal = function() {
		this.inputmask('numeric', {
			radixPoint : ',',
			groupSeparator : '.',
			autoGroup : true,
			digits : 2,
			digitsOptional : true,
			placeholder : '',
		});
	};

	$.fn.cpf = function(places) {

		this.inputmask('999.999.999-99', {
			"clearIncomplete" : true
		});
	}
	$.fn.telefone = function(places) {

		this.inputmask({
			mask : [ '(99) 9999-9999', '(99) 99999-9999' ],
			greedy : false,
			clearIncomplete : true,
		});
	}

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
