define(function(require) {
	var Back = require('backbone');
	var Utils = require('utilities/Utils');
	var LocalStor = require('localStorage');

	LocalStor.prototype.destroy = function(model) {
		model.set('syncOperation', 'DELETE');
		model.set('lastUpdateDatetime', Utils.now());
		this.update(model);
	}
	
	LocalStor.prototype.findAll = function(sync) {
		var result = [];
		// teste ROBSON
		// No fururo, verificar até que ponto isso pode gerar um erro
		var store = this.localStorage().getItem(this.name);
		this.records = (store && store.split(",")) || [];

		for (var i = 0, id, data; i < this.records.length; i++) {
			id = this.records[i];
			data = this.serializer.deserialize(this.localStorage().getItem(this._itemName(id)));
			// adiciona a critica para não exibir os itens que foram deletados.
			if (sync) {
				if (data != null && data.syncOperation != 'NONE')
					result.push(data);
			} else {
				if (data != null && data.syncOperation != 'DELETE') {
					result.push(data);
				}
			}
		}
		return result;
	};

	return Back;
});
