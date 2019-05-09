define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var NProgress = require('nprogress');
	var download = require('download');
	var moment = require('moment');
	var Spinner = require('spin');
	var numeral = require('numeral');

	Number.prototype.formatMoney = function(c, d, t) {
		var n = this, c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "." : d, t = t == undefined ? "," : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
		return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
	};

	LOG_FILE = window.logFile || new List();

	window.logFile = LOG_FILE;
	numeral.register('locale', 'pt-br', {
		delimiters : {
			thousands : '.',
			decimal : ','
		},
		abbreviations : {
			thousand : 'mil',
			million : 'milhões',
			billion : 'b',
			trillion : 't'
		},
		ordinal : function(number) {
			return 'º';
		},
		currency : {
			symbol : 'R$'
		}
	});
	numeral.locale("pt-br");

	function decimalAdjust(type, value, exp) {
		// If the exp is undefined or zero...
		if (typeof exp === 'undefined' || +exp === 0) {
			return Math[type](value);
		}
		value = +value;
		exp = +exp;
		// If the value is not a number or the exp is not an integer...
		if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
			return NaN;
		}
		// Shift
		value = value.toString().split('e');
		value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
		// Shift back
		value = value.toString().split('e');
		return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
	}

	// Decimal round
	if (!Math.round10) {
		Math.round10 = function(value, exp) {
			return decimalAdjust('round', value, exp);
		};
	}

	ion.sound({
		sounds : [ {
			name : "beer_can_opening"
		}, {
			name : "Siren_Noise"
		}, {
			name : "bell_ring"
		}, {
			name : "branch_break"
		}, {
			name : "button_click"
		} ],

		// main config
		path : "sounds/",
		preload : true,
		multiplay : true,
		volume : 0.9
	});

	window.addLogEntry = function(entry) {
		if (window.logFile.length > 1000) {
			window.logFile.shift();
		}
		window.logFile.add('\n[ ' + location.toString() + ' ][ ' + moment().format('DD/MM/YYYY HH:mm:ss SSS') + ' ]' + entry);
		window.store('\n[ ' + location.toString() + ' ][ ' + moment().format('DD/MM/YYYY HH:mm:ss SSS') + ' ]' + entry);
	}

	window.store = function(entry) {
		var log = window.localStorage.getItem('appweb');
		window.localStorage.setItem('appweb', log + '\n  ' + entry);
	}

	window.showStoreLog = function() {
		var log = window.localStorage.getItem('appweb') || 'NO LOG ENTRY';
		console.log(log.replace(/  /g, '\n'));
	};
	window.showLog = function() {
		window.logFile.forEach(function(entr) {
			console.log(entr.replace(/  /g, '\n'));
		})

	};

	var spinnerOpts = {
		lines : 11, // The number of lines to draw
		length : 7, // The length of each line
		width : 6, // The line thickness
		radius : 10, // The radius of the inner circle
		corners : 1, // Corner roundness (0..1)
		rotate : 22, // The rotation offset
		direction : 1, // 1: clockwise, -1: counterclockwise
		color : '#000', // #rgb or #rrggbb or array of colors
		speed : 1.1, // Rounds per second
		trail : 65, // Afterglow percentage
		shadow : false, // Whether to render a shadow
		hwaccel : false, // Whether to use hardware acceleration
		className : 'spinner', // The CSS class to assign to the
		// spinner
		zIndex : 2e9, // The z-index (defaults to 2000000000)
		top : '50%', // Top position relative to parent
		left : '50%' // Left position relative to parent
	};
	var spinner = new Spinner(spinnerOpts);

	util = {
		moment : moment,
		NProgress : NProgress.configure({
			minimum : 0.2,
		}),

		escapeById : function(id, numeric) {

			// .replace(/\./g, '').replace(/\,/g, '.')
			var returnValue = null;
			var object = $('#' + id) || $("input:radio[name ='" + id + "']");

			if (object) {
				if (object.prop('tagName') && object.prop('tagName')) {
					var tagName = object.prop('tagName').toUpperCase();
					if (tagName === 'SELECT') {
						returnValue = object.children(":selected").attr("value") || null;
					}
				}
				var type = object.attr('type');
				if (type === 'checkbox' || type === 'radio') {
					returnValue = object.is(':checked');
				} else {
					var text = object.val();
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
		},

		// Implementação feita exclusivamente para obter valor de Radio Group
		escapeByName : function(name) {
			var object = $("input:radio[name ='" + name + "']:checked");
			if (object) {
				return object.val();
			}
			return '';
		},

		setVal : function(id, value) {
			var object = $('#' + id) || $("input:radio[name ='" + id + "'][value='" + value + "']");
			if (object) {
				var type = object.attr('type');
				if (type === 'checkbox' || type === 'radio') {
					object.prop('checked', value)
				} else {
					object.val(value);
				}
			}
		},
		escapeByAttr : function(id, attr) {
			return _.escape($('#' + id).attr(attr));
		},

		escapeByIdSelect : function(id) {
			return _.escape($('#' + id + ' option:selected').text());
		},

		resfresh : function(time, functionRefresh) {
			if (this.intervalName) {
				clearInterval(this.intervalName);
			}
			this.intervalName = window.setInterval(function() {
				if (functionRefresh) {
					functionRefresh();
				}
			}, time * 1000 || 30000);
		},

		markActiveItem : function(itemId) {
			try {
				var itens = $('.nav .sub li a');
				itens.parent().removeClass('active-sub');
				itens.parent().parent().removeClass('show');
				itens.removeClass('active-link');
				itens.removeClass('active-sub');

				$('#mainnav-menu > li').removeClass('open');
				$('#' + itemId).addClass('active-link');

				var parent = $('#' + itemId).parent();
				if (parent) {
					$('#mainnav-menu').find('li').removeClass('active-sub')
					$('#mainnav-menu').find('li').removeClass('active-link')
					parent.parent().addClass('active-sub').addClass('open');
					parent.find('li').removeClass('active-link');
					parent.addClass('collapse in');
					$('#' + itemId).addClass('active-link');
				}
				itens.parent().parent().addClass('show')
			} catch (exception) {
				console.log(exception);
			}
		},

		// Para uso dessa função é necessário a existencia de um div com
		// id="messages"
		showSuccessMessage : function(message, containerMessage) {
			this.showMessage('success', message, containerMessage);
		},
		showErrorMessage : function(message, xhr, containerMessage) {
			var _xhrMessage = '';

			if (xhr) {
				if (this.getJson(xhr.responseText).legalMessage) {
					_xhrMessage = this.getJson(xhr.responseText).legalMessage;
					this.showMessage('error', _xhrMessage, containerMessage)
				} else {
					this.showMessage('error', message, containerMessage);
				}
				this.logError(xhr);
			} else {
				this.showMessage('error', message, containerMessage);
			}
		},
		showMessage : function(type, message, containerMessage) {
			var container = containerMessage || 'messages_div';
			var divAlert = $('#' + container);
			var icon = "<i class='fa fa-info-circle'></i> "
			if (type == 'success') {
				icon = "<i class='fa fa-thumbs-o-up'></i> ";
			} else if (type == 'error') {
				icon = "<i class='fa fa-exclamation-triangle'></i> ";
				type = 'danger'
			}
			if (!containerMessage) {
				$("body,html").animate({
					scrollTop : 0
				})
			}
			divAlert.html("<div class='alert alert-" + type + " '> <strong> " + icon + " </strong>	&nbsp;" + message + "<a class='close' data-dismiss='alert' href='#' aria-hidden='true'>&times;</a>	</div>");
			divAlert.show();
			if (type !== 'danger') {
				setTimeout(function() {
					divAlert.slideUp(400);
				}, 3000);
			}
		},

		goNewLocalTab : function(hash, wait) {
			window.open("#" + hash);
		},
		goPage : function(hash, wait) {
			if (wait)
				window.setTimeout(function() {
					window.location.hash = hash;
				}, 1200);
			else {
				window.location.hash = hash;
			}
		},

		getUrl : function(url) {
			var urlCompleta = location.pathname;
			urlCompleta = urlCompleta.split("/");
			urlCompleta = urlCompleta[1];
			urlCompleta = '/' + urlCompleta + url;
			return urlCompleta;
		},

		goExtUrl : function(url) {
			var that = this;
			var _url = that.getUrl(url);
			location.hash = "";
			location.pathname = _url;
		},

		uploadImage : function(elementName, successFunction, errorFunction) {
			$('form').ajaxSubmit({
				success : successFunction,
				error : errorFunction
			});
		},
		clear : function(element) {
			var inputElemento = $('#' + element);

			// disparar o evento abaixo é necessário para garantir que os campos
			// de input do tipo multiselect com o chosen sejam limpos.
			inputElemento.val('').trigger('chosen:updated')
			var type = inputElemento.attr('type');
			if (type === 'checkbox' || type === 'radio') {
				inputElemento.prop('checked', false);
				inputElemento.attr('checked', false);
			}

		},

		/*
		 * Usage: breadcrumb({iconClass:'',itemLabel:'',
		 * itemSubFolderName:'',url:''});
		 */
		breadcrumb : function(itemMenu) {

			if (itemMenu) {
				$('.breadcrumb').removeClass('hide');
				$('.page-name').text(itemMenu.itemLabel);
				$('.breadcrumb-label').text(itemMenu.itemLabel);
				$('.breadcrumb-item').text(itemMenu.itemSubFolderName);
			}
		},

		// Para poder adicionar uma view dinamicamente como é feita no Layout,
		// só que usando um CompositeView
		appendView : function(container, view) {
			container.append(view.render().el);
			Marionette.triggerMethod.call(view, "show");
		},
		showSpinner : function(target) {
			var target = document.getElementById(target);
			// if (target)
			// spinner.spin(target);
		},
		stopSpinner : function() {
			// spinner.stop();
		},

		scrollTop : function() {
			$("body,html").animate({
				scrollTop : 0
			})
		},
		scrollDownModal : function() {
			$(".modal-body").animate({
				"scrollTop" : 800
			})
		},
		scrollUpModal : function() {
			$(".modal-body").animate({
				"scrollTop" : -800
			})
		},
		getWrappedModel : function(even) {
			var parent = $(even.target).parent();
			if (!parent)
				return null
			var model = parent.data('model');
			return model;
		},
		enterPressed : function(e) {
			var code = (e.keyCode ? e.keyCode : e.which);
			return code == 13;
		},

		isNumeric : function(valor) {
			return $.isNumeric(valor);
		},

		cepFormatado : function(valor) {
			var _cep = valor.replace(/[^0-9]+/, '');
			_cep = _cep.replace(/^(\d{5})(\d)/, "$1-$2")
			return _cep;
		},
		validCep : function(valor) {
			var cep = valor.replace(/[^0-9]+/, '');

			return cep.length == 8 && this.isNumeric(cep);
		},

		clearChecked : function(element) {
			var inputElemento = $('#' + element);
			inputElemento.attr("checked", false);
		},

		getJson : function(text) {
			var json = {};
			try {
				if (typeof text == 'string') {
					json = JSON.parse(text);
				} else if (typeof text == 'object') {
					json = text;
				}
			} catch (e) {
				console.error(e);
			}
			return json;
		},
		toStrNumber : function(num) {
			var newNumber = '';
			if (typeof num == 'number') {
				newNumber = newNumber + num;
				newNumber = newNumber.replace(/\./g, ',');
			} else {
				newNumber = '' + num;
			}
			return newNumber.replace(/[^\d.,-]/g, '')
		},

		// problemas com arredondamento de muitas casas decimais... evitar...
		// use o formatNumeric
		formatFinalNumber : function(num) {
			var number = this.formatNumber(num);
			if (number.indexOf(',') < 0) {
				return number + ',00';
			} else {
				return number;
			}
		},

		formatNumber : function(num) {

			if (_.isNumber(num)) {
				num = this.toStrNumber(parseFloat(num.toFixed(2)));
			} else {
				num = this.toStrNumber(num);
			}

			var str = num.toString().replace("$", ""), parts = false, output = [], i = 1, formatted = null;
			if (str.indexOf(",") > 0) {
				parts = str.split(",");
				str = parts[0];
			}
			str = str.split("").reverse();
			for (var j = 0, len = str.length; j < len; j++) {
				if (str[j] != ".") {
					output.push(str[j]);
					i++;
				}
			}
			formatted = output.reverse().join("");
			return (formatted + ((parts) ? "," + parts[1].substr(0, 2) : ""));
		},

		formatMoney : function(num) {

			num = this.toStrNumber(num);

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
			return (formatted + ((parts) ? "," + parts[1].substr(0, 2) : ""));
		},

		onlyNumber : function(valor) {
			if (valor)
				return valor.replace(/[^0-9]+/, '');
			return '';
		},
		toJsNumber : function(strNumber) {
			var numb = numeral(strNumber);
			numb.value();

			return numb.value();
		},

		notificationError : function(options) {

			$.gritter.add({
				title : options.title || 'Aviso !',
				text : options.text,
				time : 10000, // 10 segundos
				sticky : false,
				// close_icon : 'fa fa-times',
				icon : options.icon || 'fa fa-exclamation-circle',
				class_name : options.className || 'warn-notice',
			});

			return false;
		},
		validateUnique : function(options) {
			var that = this;
			if (!options.collection) {
				console.error('Deveria ser passado uma collection para a consulta...')
				return;
			}
			var localCol = new options.collection();
			if (!options.view) {
				console.error('Deveria ser passado a view a ser validada')
				return;
			}
			var validateField = options.view.ui.inputId;

			var data = {};
			if (!options.element.val())
				return;
			var fieldValue = options.element.val()
			if (options.onlyNumber)
				fieldValue = fieldValue.replace(/\D/g, '');
			if (options.uppercase)
				fieldValue = options.element.val().toUpperCase();
			data[options.fieldName] = fieldValue;
			localCol.filterEqual({
				success : function() {
					localCol.each(function(obj) {
						if (obj.get('id') != validateField.val()) {
							that.notificationError({
								title : 'Erro',
								text : options.text || 'Já existe registro com ' + (options.displayFieldName || options.fieldName) + ' ' + fieldValue,
							})
							options.element.val('');
						}
					});
				},
				error : function(_col, _resp, _opts) {
					console.log(_col, _resp, _opts);
					console.error(_resp.responseText || _resp.getResponseHeader('exception'));
				},
				data : data,
			});
		},

		handleError : function(xhr, resp, opt) {
			if (xhr.status === 0 && xhr.readyState === 0) {
				this.notificationError({
					title : 'Sem conexão',
					className : 'error-notice',
					icon : 'fa fa-chain-broken',
					text : 'Aparentemente voce não está conectado',
				})
			} else if (xhr.responseText.indexOf('DOCTYPE') > 0 && xhr.responseText.indexOf('login') > 0) {
				this.goExtUrl('/j_spring_security_logout');
			} else if (opt === "Forbidden") {
				this.notificationError({
					title : 'Acesso Negado',
					className : 'error-notice',
					icon : 'fa fa-chain-broken',
					text : 'Aparentemente voce não está conectado',
				})
			}
			this.logError(xhr);
		},

		// no futuro será verificado a melhor maneira de fazer isso
		getCurrencySymbol : function() {
			return "R$";
		},

		// Campeão dos campeões.
		formatNumeric : function(number, places) {

			if (_.isNull(number) || _.isUndefined(number) || number.length === 0) {
				return 0;
			}
			if (_.isNumber(number) === false) {
				throw new Error('Cannot format [' + number + ' ]as number');
			}
			var _number = 0 + number;
			return _number.formatMoney(places, ',', '.')
		},
		getStatusOrderDescription : function(statusOrder) {

			if (statusOrder == 'AguardandoPagamento') {
				return "Aguardando Pagamento";
			}

			return statusOrder;
		},
		configureSuggest : function(suggestConfig) {
			var bloodhound = new Bloodhound({
				datumTokenizer : Bloodhound.tokenizers.obj.whitespace(suggestConfig.showValue),
				queryTokenizer : Bloodhound.tokenizers.whitespace,
				prefetch : false,
				remote : {
					url : suggestConfig.collection.url + '/filterAlike?' + (suggestConfig.queryValue || suggestConfig.showValue) + '=%QUERY' + '&' + (suggestConfig.extraQuery || ''),
					wildcard : '%QUERY',
					cache : false
				}
			});

			var field = $(suggestConfig.field);
			field.typeahead({
				hint : false,
				minLength : 3,
				highlight : true,
				highlighter : function(item) {
					var regex = new RegExp('(' + this.query + ')', 'gi');
					return item.replace(regex, "<strong>$1</strong>");
				},
			}, {
				name : 'modal-jsetup-input-suggest',
				display : function(item) {
					if (suggestConfig.display) {
						var showValues = suggestConfig.display.split(',')
						if (showValues.length == 1)
							return item[showValues[0]];
						if (showValues.length == 2)
							return item[showValues[0]] + ' - ' + item[showValues[1]];
						if (showValues.length == 3)
							return item[showValues[0]] + ' - ' + item[showValues[1]] + ' - ' + item[showValues[2]];
					}
					return item[suggestConfig.showValue];
				},
				source : bloodhound,
				limit : 15,
				templates : {
					empty : [ '<div class="empty-message"> &nbsp;', ' Sem resultados...', '</div>' ].join('\n'),
					suggestion : _.template(suggestConfig.template || '<div>{{' + suggestConfig.showValue + '}} </div>')
				}
			});

			field.bind('typeahead:select', function(evt, model) {
				if (suggestConfig.onSelect) {
					suggestConfig.onSelect(model);
				}
			})

			field.bind('change', function(evt) {
				if (!field.val()) {
					if (suggestConfig.onSelect) {
						suggestConfig.onSelect(null);
					}
				}
			})
			field.bind('typeahead:change', function(evt, model) {
				if (!field.val()) {
					if (suggestConfig.onSelect) {
						suggestConfig.onSelect(null);
					}
				}
			})
		},

		logError : function(_resp) {
			var entry = '';
			try {
				if (_resp.responseText) {
					var _en = this.getJson(_resp.responseText);
					var error = _en.error || _en;
					entry = error.errorMessage + ' \n\n [ Parametros da requisição: ]-> ' + JSON.stringify(error.parameters);
				} else {
					entry = _resp.getResponseHeader && _resp.getResponseHeader('exception')
				}
			} catch (e) {
			}
			window.addLogEntry(entry);

			console.error("veja no console o erro: [ window.showStoreLog()]");
		},

		alert : function(options) {
			swal(options.title || "Info", options.text || "!!", options.type || "success");
		},

		confirm : function(options) {
			swal({
				title : options.title || "IMPORTANTE!",
				text : options.text || "Are You Sure?",
				type : options.type || "error",
				showCancelButton : true,
				closeOnConfirm : false,
				showLoaderOnConfirm : false,
			}, function() {
				if (options.onConfirm) {
					options.onConfirm();
				}
			});
		},

		prompt : function(options) {
			swal({
				title : options.title || "IMPORTANTE!",
				text : options.text || "Are You Sure?",
				type : 'input',
				inputType : options.inputType || "text",
				showCancelButton : true,
				closeOnConfirm : false,
			}, function(inputValue) {
				if (_.isString(inputValue)) {
					if (options.onConfirm) {
						options.onConfirm(inputValue);
					}
				}
			});
		},
		truncDate : function(dateTime) {
			if (dateTime.length > 10) {
				return dateTime.substring(0, 11);
			}
			return dateTime;
		},
		playSound : function(sound) {
			if (sound === "SIREN") {
				this.toSiren();
			} else {
				this.toRing()
			}
		},

		toRing : function() {
			ion.sound.play("bell_ring");
		},

		toSiren : function() {
			ion.sound.play("Siren_Noise");
		},

		truncHour : function(dateTime) {
			if (dateTime.length > 10) {
				return dateTime.substring(10, dateTime.length + 1);
			}
			return dateTime;
		},

		formatTelefone : function(numTelefone) {

			if (!numTelefone) {
				return "";
			}

			var v = numTelefone.replace(/\D/g, ""); // Remove tudo o que não é

			if (v.substring(0, 1) === "0") {
				v = v.substring(1, v.length)
			}
			var len = v.length;

			if (len > 9) {
				v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
			}

			v = v.replace(/(\d)(\d{4})$/, "$1-$2");
			return v;
		},
		getFiletype : function(responseType) {
			if (responseType === 'images/jpeg') {
				return 'JPEG'
			}
			if (responseType === 'images/png') {
				return 'PNG'
			}
			if (responseType === 'text/html') {
				return 'HTML'
			}
			if (responseType === 'text/plain') {
				return 'TEXT'
			}
			if (responseType === 'application/pdf') {
				return 'PDF'
			}
		},

		now : function(withoutTime) {
			if (withoutTime) {
				return moment().format('DD/MM/YYYY');
			}
			return moment().format('DD/MM/YYYY HH:mm');
		},

		disableAll : function(element) {
			element.find('input').prop('disabled', 'disabled');
			element.find('select').prop('disabled', 'disabled');
			element.find('button').prop('disabled', 'disabled');
			element.find('textarea').prop('disabled', 'disabled');
			element.find('a').bind('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				return false;
			})
			element.find('div').bind('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				return false;
			})
			element.find('button').bind('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				return false;
			})
			element.find('*').bind('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				return false;
			})
		},

		loadButton : function($el) {
			if (!_.isUndefined($el) && _.isString($el)) {
				return false;
			}
			if (_.isFunction($el.button)) {
				$el.button('loading');
			}

		},
		resetButton : function($el) {
			if (!_.isUndefined($el) && _.isString($el)) {
				return false;
			}

			if (_.isFunction($el.button)) {
				$el.button('reset');
			}

		},

		Colors : {
			DODGER_BLUE : '#1E90FF',
			DARK_ORANGE : '#FF8C00',
			MED_SPRING_GREEN : '#00FA9A',
			SKY_BLUE : '#87CEEB',
			INDIAN_RED : '#CD5C5C',
			YELLOW_GREEN : '#9ACD32',
			DARK_KHAKI : '#BDB76B',
			DEEP_SKY_BLUE : '#00BFFF',
			GOLD : '#FFD700',
			TAN2 : '#EE9A49',
			LIGHT_GREEN : '#90EE90',
			LIGHT_GREY : '#D3D3D3',
			DARK_CYAN : '#008B8B',
			TOMATO : '#FF6347',
		},

		WAY_PAYMENT_TYPES : [ {
			'id' : 'CARD',
			'value' : 'Cartão'
		}, {
			'id' : 'CHECK',
			'value' : 'Cheque'
		}, {
			'id' : 'CASH',
			'value' : 'Dinheiro'
		}, {
			'id' : 'BANK_SLIP',
			'value' : 'Boleto Bancário'
		}, {
			'id' : 'DEBIT',
			'value' : 'Cartão de Débito'
		}, {
			'id' : 'VOUCHER',
			'value' : 'Voucher'
		} ],

		DAYS_OF_THE_WEEK : [ {
			'id' : 'SUNDAY',
			'value' : 'Domingo'
		},

		{
			'id' : 'MONDAY',
			'value' : 'Segunda'
		},

		{
			'id' : 'TUESDAY',
			'value' : 'Terça'
		},

		{
			'id' : 'WEDNESDAY',
			'value' : 'Quarta'
		},

		{
			'id' : 'THURSDAY',
			'value' : 'Quinta'
		},

		{
			'id' : 'FRIDAY',
			'value' : 'Sexta'
		}, {
			'id' : 'SATURDAY',
			'value' : 'Sábado'
		},

		],

		getAppName : function() {
			var path = location.pathname.split('/');
			return path[1];
		},

		getAppUrl : function() {
			return location.origin + "/" + this.getAppName() + "/";
		},
		downloadFile : function(uri) {
			//
			if (uri && uri.indexOf('http') < 0) {
				download(this.getAppUrl() + uri);
			} else {
				download(uri);
			}
		},

		isImageFile : function(file) {
			var file = "" + file.toUpperCase();
			if (file.endsWith("PNG") || file.endsWith("JPG") || file.endsWith("JPEG") || file.endsWith("GIF")) {
				return true
			}
			return false;
		},

		getNumber : function(num) {
			if (_.isNumber(num)) {
				return num;
			}

			if (_.isString(num)) {
				return new Number(num);
			}
			return null;
		},

		addressComponentsToJson : function(address_components, formatted_address) {
			var enderecoCompleto = {
				lineAddress : '',
				complement : '',
				numero : '',
				complemento : '',
				state : '',
				city : '',
				district : '',
				zipCode : '',
			}
			_.each(address_components, function(address_component) {
				if (address_component.types[0] === 'administrative_area_level_1') {
					enderecoCompleto['state'] = address_component.long_name;
				}
				if (address_component.types[0] === 'locality' || address_component.types[0] === 'administrative_area_level_2') {
					enderecoCompleto['city'] = address_component.long_name;
				}
				if (address_component.types[0] === 'street_number') {
					enderecoCompleto['number'] = address_component.long_name;
				}
				if (address_component.types[0] === 'route') {
					enderecoCompleto['lineAddress'] = address_component.long_name;
				}
				if (address_component.types[0] === 'political' || address_component.types[0] === 'sublocality_level_1' || address_component.types[1] === 'sublocality') {
					enderecoCompleto['district'] = address_component.long_name;
				}
				if (address_component.types[0] === 'postal_code') {
					enderecoCompleto['zipCode'] = address_component.long_name;
				}
			});
			return enderecoCompleto;
		},

		resultGeocodeToJson : function(result) {
			var enderecoCompleto = this.addressComponentsToJson(result.address_components, result.formatted_address);
			enderecoCompleto.latitude = result.geometry.location.lat();
			enderecoCompleto.longitude = result.geometry.location.lng();
			return enderecoCompleto;
		},

		addressToQueryString : function(address) {
			return address.lineAddress + " n. " + address.number + " " + address.district + " " + address.state;
		}
	};

	window.util = util;
	return util;

});