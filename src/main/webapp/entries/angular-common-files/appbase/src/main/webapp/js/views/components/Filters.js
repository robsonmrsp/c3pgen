//NAO MEXA NESSA BAGACA
define(function(require) {
	var $ = require('adapters/jquery-adapter');
	var angular = require('angular');
	var appFilters = angular.module('appFilters', []);

	var _toStrNumber = function(num) {
		var newNumber = '';
		if (typeof num == 'number') {
			newNumber = newNumber + num;
			newNumber = newNumber.replace(/\./g, ',');
		} else {
			newNumber = '' + num;
		}
		return newNumber.replace(/[^\d.,-]/g, '')
	};

	var _fillWithZeros = function(value, size) {
		while (value.length < size)
			value = '0'.concat(value);
		return value;
	};

	var cpf = function(value) {
		var fullValue = '';
		if (value) {
			value = value.replace(/[^0-9]+/g, '');
			fullValue = _fillWithZeros(value, 11);
			fullValue = fullValue.replace(/([0-9]{3})([0-9]{3})([0-9]{3})([0-9]{2})/, "$1.$2.$3-$4");
		}
		return fullValue;
	};

	var cnpj = function(value) {
		var fullValue = '';
		if (value) {
			value = value.replace(/[^0-9]+/g, '');
			fullValue = _fillWithZeros(value, 14);
			fullValue = fullValue.replace(/([0-9]{2})([0-9]{3})([0-9]{3})([0-9]{4})([0-9]{2})/, "$1.$2.$3/$4-$5");
		}
		return fullValue;
	};

	var cep = function(valor) {
		var _cep = valor.replace(/[^0-9]+/, '');
		_cep = _cep.replace(/^(\d{5})(\d)/, "$1-$2")
		return _cep;
	};

	var telefone = function(value) {
		if (value == null || value == undefined) {
			return '';
		}
		var fullValue = '';
		fullValue = value.replace(/[^0-9]+/g, '');
		if (fullValue.length == 11)
			fullValue = fullValue.replace(/([0-9]{2})([0-9]{5})([0-9]{4})/, "($1) $2 - $3");
		else if (fullValue.length == 10)
			fullValue = fullValue.replace(/([0-9]{2})([0-9]{4})([0-9]{4})/, "($1) $2 - $3");

		return fullValue;
	};

	var formatDecimal = function(num, places) {

		if (!num) {
			return '00,00';
		}

		if (!places) {
			places = 2;
		}
		num = _toStrNumber(num);

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
	// /////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// //////////////////////////////////////DECLARACOES////////////////////////////////////////////////////////////
	// /////////////////////////////////////////////////////////////////////////////////////////////////////////////
	appFilters.filter('formatDecimal', function() {
		return formatDecimal;
	});
	appFilters.filter('cpf', function() {
		return cpf;
	});
	appFilters.filter('cep', function() {
		return cep;
	});
	appFilters.filter('cnpj', function() {
		return cnpj;
	});
	appFilters.filter('telefone', function() {
		return telefone;
	});
});
// appServices
