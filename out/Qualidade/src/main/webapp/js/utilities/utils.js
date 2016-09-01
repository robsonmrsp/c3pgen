define([ 'nprogress', 'moment', 'spin', 'adapters/col-adapter', 'bootbox', 'adapters/underscore-adapter', 'adapters/jquery-adapter', 'bootstrap', ], function(NProgress, moment, Spinner, Col, Bootbox, _, $) {
	Number.prototype.formatMoney = function(c, d, t) {
		var n = this, c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "." : d, t = t == undefined ? "," : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
		return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
	};

	LOG_FILE = window.logFile || new Col.List();

	window.logFile = LOG_FILE;

	window.addLogEntry = function(entry) {
		if (window.logFile.size() > 1000) {
			window.logFile.remove(0);
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
		_.each(window.logFile.elements, function(entr) {
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

	return {
		// Uma forma de chamar o moment js sem precisar importar em cada arquivo
		moment : moment,
		Bootbox : bootbox,
		NProgress : NProgress.configure({
			minimum : 0.2,
		// template : '<div class="bar" role="bar"><div
		// class="peg"></div></div><div class="spinner" role="spinner"><div
		// class="spinner-icon"></div></div>'
		// template : '<div class="bar" role="bar"><div
		// class="peg"></div></div><div

		// class="spinner" role="spinner"><div class="spinner-icon_"><i
		// class="fa
		// fa-spinner fa-2x progress-spin"></i></div></div>'
		}),

		displayValidationErrors : function(messages) {
			for ( var key in messages) {
				if (messages.hasOwnProperty(key)) {
					this.addValidationError(key, messages[key]);
				}
			}
			this.showAlert('Erro!', 'Fix validation errors and try again', 'alert-error');
		},

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
						returnValue = text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;').replace("'", '&#x27;');
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

		showErrorMessage : function(idContainer, message) {
			var divAlert = $('#' + idContainer);
			divAlert.css('display', 'visible');

			divAlert.removeClass('alert-info');
			divAlert.addClass('alert-error');
			divAlert.append(message);
		},

		showInfoMessage : function(idContainer, message) {
			var divAlert = $('#' + idContainer);
			divAlert.css('display', 'block');
			divAlert.removeClass('alert-error');
			divAlert.addClass('alert-info');
			divAlert.append(message);
		},
		addValidationError : function(field, message) {
			var controlGroup = $('#' + field).parent().parent();
			controlGroup.addClass('error');
			$('.help-inline', controlGroup).html(message);
		},

		removeValidationError : function(field) {
			var controlGroup = $('#' + field).parent().parent();
			controlGroup.removeClass('error');
			$('.help-inline', controlGroup).html('');
		},

		showAlert : function(title, messages, klass) {
			var text = '';
			$('.alert').removeClass("alert-error alert-warning alert-success alert-info");
			$('.alert').addClass(klass);
			text = '<ul>';
			for ( var key in messages) {
				text += '<li>' + messages[key] + '</li>';
			}
			text += '</ul>';
			$('.alert').html('<strong>' + title + '</strong> ' + text);
			$('.alert').show();
		},

		hideAlert : function() {
			// $('.alert').hide();
		},

		getTodayDate : function() {
			var today = new Date();
			return today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
		},

		getActualHour : function() {

		},
		changeEvent : function(event, model) {
			// Apply the change to the model
			var target = event.target;
			var change = {};
			if (target.name === '')
				return;
			change[target.name] = target.value;
			model.set(change);

			// Run validation rule (if any) on changed item
			var check = model.validateItem(target.id);
			if (check.isValid === false) {
				utils.showAlert('Erro!', check.messages, 'alert-error');
			} else {
				utils.removeValidationError(target.id);
				$('.alert').hide();
			}
		},

		getParameterByName : function(name) {
			name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
			var regexS = "[\\?&]" + name + "=([^&#]*)";
			var regex = new RegExp(regexS);
			var results = regex.exec(window.location.href);
			if (results == null)
				return "";
			else
				return decodeURIComponent(results[1].replace(/\+/g, " "));
		},

		backListEvents : function() {
			var that = this;
			console.log("voltando para a lista de midias");
			window.setTimeout(function() {
				that.navigate('sintsview/showMedias');
			}, 1500);
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
				itens.parent().parent().removeClass('show')
				itens.removeClass('active');

				$('#' + itemId).addClass('active');

				var parent = $('#' + itemId).parent();
				if (parent) {
					$('#nav-accordion').find('li').removeClass('active')
					parent.parent().addClass('active').addClass('open');
					$('#' + itemId).addClass('active');
				}
				itens.parent().parent().addClass('show')
			} catch (exception) {
				console.log(exception);
			}
		},

		adjustMapSize : function() {
			$(function() {
				$('#map').height($(window).height() - 122);
				$('#map').width($(window).width());
				$('#over_map').height($(window).height() - 122);
				$('#_GMapContainer').height($(window).height() - 122);
			});
			$(window).bind('resize load', function(e) {
				$('#map').height($(window).height() - 122);
				$('#_GMapContainer').height($(window).height() - 122);
				$('#map').width($(window).width());
				$('#_GMapContainer').width($(window).width());
				$('#over_map').height($(window).height() - 122);
			})
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

		goPage : function(hash) {
			window.setTimeout(function() {
				window.location.hash = hash;
			}, 1000);
		},

		uploadImage : function(elementName, successFunction, errorFunction) {
			$('form').ajaxSubmit({
				success : successFunction,
				error : errorFunction
			});
		},

		showChooseFile : function(inputFileName, formId, successFunction, errorFunction) {
			$("#" + inputFileName).trigger('click');
			$("#" + inputFileName).change(function() {
				var form = $('#' + formId);
				if (form) {
					form.ajaxSubmit({
						success : successFunction,
						error : errorFunction
					});
				}
			});
		},

		validateInput : function(grupo, elemento) {
			var divGrupo = $('#' + grupo);
			var inputElemento = $('#' + elemento);
			if (inputElemento.val() == null || inputElemento.val() == '') {
				divGrupo.addClass('has-error');
				inputElemento.change(function(evt) {
					var input = $(evt.target);
					if (input.val().length > 0) {
						divGrupo.removeClass('has-error');
					}
				});
				return true;
			}
			return false;
		},

		// camba da porra!
		hasInvalidFields : function(map) {
			var keys = map.keys();
			var validations = new Col.Set();
			for (var index = 0; index < keys.length; index++) {
				var key = keys[index];
				var value = map.get(key)
				validations.add(this.validateInput(key, value));
			}
			return validations.contains(true);
		},
		clear : function(element) {
			var inputElemento = $('#' + element);
			inputElemento.val('');
			var type = inputElemento.attr('type');
			if (type === 'checkbox' || type === 'radio') {
				inputElemento.prop('checked', false);
				inputElemento.attr('checked', false);
			}

		},
		loadCombo : function(combo, collection, view, fieldName) {
			var that = this;
			collection.fetch({
				success : function(_collection, _resp, _options) {
					collection.each(function(type) {
						combo.append('<option value=' + type.get('id') + '>' + type.get('name') + '</option>');
					});
					if (view.model) {
						combo.val(view.model.get(fieldName));
					} else {
						combo.val('');
					}
				},
				error : function(model, xhr, options) {
					that.showMessage('error', 'Problemas ao carregar o combobox!');
				}
			});
		},

		/*
		 * Usage: breadcrumb({iconClass:'',itemLabel:'', itemSubFolderName:'',url:''});
		 */
		breadcrumb : function(itemMenu) {
			if (itemMenu) {
				var content = "<ul class='breadcrumb'>" + "	<li>" + "		<i class='fa " + itemMenu.iconClass + " '></i>" + "		<a href='#" + itemMenu.url + " '> &nbsp; " + itemMenu.itemLabel + "</a>" + "	</li>" + "	<li class='active realce-breadcumb'>" + itemMenu.itemSubFolderName
						+ "</li>" + "</ul>";
				$('#breadcrumbs').html(content);
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

		formatFinalNumber : function(num) {
			var number = this.formatNumber(num);
			if (number.indexOf(',') < 0) {
				return number + ',00';
			} else {
				return number;
			}
		},
		formatNumber : function(num) {

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
			return valor.replace(/[^0-9]+/, '');
		},
		notificationError : function(options) {

			$.gritter.add({
				title : options.title || 'Aviso !',
				text : options.text,
				time : 10000,// 10 segundos
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
			localCol.filter({
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
			} else {
				// console.error(resp.responseText || (resp.getResponseHeader && resp.getResponseHeader('exception')));
			}
		},

		// no futuro será verificado a melhor maneira de fazer isso
		getCurrencySymbol : function() {
			return "R$";
		},

		formatNumeric : function(number, places) {
			var _number = number || 0;
			return _number.formatMoney(places, ',', '.')
		},

		logError : function(_resp) {
			var entry = '';
			try {
				if (_resp.responseText) {
					var _en = this.getJson(_resp.responseText);
					entry = _en.errorMessage + ' \n\n [ Parametros da requisição: ]-> ' + JSON.stringify(_en.parameters);
				} else {
					entry = _resp.getResponseHeader && _resp.getResponseHeader('exception')
				}
			} catch (e) {
			}
			window.addLogEntry(entry);

			console.error("veja no console o erro: [ window.showStoreLog()]");
		}
	};

	return util;
});
