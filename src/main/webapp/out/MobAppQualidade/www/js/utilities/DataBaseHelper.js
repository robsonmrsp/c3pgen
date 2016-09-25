define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var LocalStorage = require('localStorage');
	var BaseModel = require('models/BaseModel');
	var RemoteBaseModel = require('models/RemoteBaseModel');
		var ApontamentoQualidadePackingCollection = require('collections/ApontamentoQualidadePackingCollection');
	var BolsaoCollection = require('collections/BolsaoCollection');
	var GeneradorCollection = require('collections/GeneradorCollection');
	var Utils = require('utilities/Utils');
	var Global = require('models/Global');

	var DataBaseHelper = {

		init : function() {
			var that = this;
		},

		ping : function(options) {
			var that = this;
			this.global = new Global();
			var pingModel = new RemoteBaseModel();
			var token = Utils.encodeCredenciais(options.username, options.password);

			pingModel.url = options.url + '/rs/comunication/ping';
			pingModel.set('token', token)

			pingModel.fetch({
				success : function(_model, _resp, _options) {
					options.success('Sucesso no teste de conexão. Salvando credenciais');
					that.global.setCredentials(options);
				},
				error : function(_model, _resp, _options) {
					console.error(_model, _resp, _options);
					options.error('Não foi possivel conectar. Verifique se voce está online e que os valores para usuário, senha e url estão corretos.');
				}
			});
		},

		sync : function(options) {
			if (!this.global)
				this.global = new Global();
			this.global.fetch();
			var url = this.global.get('url');
			if (!url) {
				return console.error('Deve ser configurada a url de acesso')
			}
			var model = new BaseModel();
			model.url = url + '/rs/comunication/sync'
				
			this.initTableApontamentoQualidadePacking();
			model.set('apontamentoQualidadePackings', this.apontamentoQualidadePackingCollection.getToSync());
				
			this.initTableBolsao();
			model.set('bolsaos', this.bolsaoCollection.getToSync());
				
			this.initTableGenerador();
			model.set('generadors', this.generadorCollection.getToSync());
			model.set('clientId', 'mobile_xpto');//ainda falta decidir como obter essa informação do SO 
			model.save({}, {
				success : function(col, resp, opt) {
					console.info('sincronizado : ', col, resp, opt);
				
					that.apontamentoQualidadePackingCollection.resetAndstore(_model.get('apontamentoQualidadePackings'));
					console.info('atualizando firstLower(entity.name)}' ); 
				
					that.bolsaoCollection.resetAndstore(_model.get('bolsaos'));
					console.info('atualizando firstLower(entity.name)}' ); 
				
					that.generadorCollection.resetAndstore(_model.get('generadors'));
					console.info('atualizando firstLower(entity.name)}' ); 
				},
				error : function(col, resp, opt) {
					console.error('Erro ao sincronizar: ', col, resp, opt);
				},
				ajaxSync : true,
			})
		},
		
		initTableApontamentoQualidadePacking : function() {		
			if (!this.apontamentoQualidadePackingCollection) {
				this.apontamentoQualidadePackingCollection = new ApontamentoQualidadePackingCollection({
					localStorage : new Backbone.LocalStorage("table_apontamentoQualidadePacking"),
				})
			}
			this.apontamentoQualidadePackingCollection.fetch();		
		},
		initTableBolsao : function() {		
			if (!this.bolsaoCollection) {
				this.bolsaoCollection = new BolsaoCollection({
					localStorage : new Backbone.LocalStorage("table_bolsao"),
				})
			}
			this.bolsaoCollection.fetch();		
		},
		initTableGenerador : function() {		
			if (!this.generadorCollection) {
				this.generadorCollection = new GeneradorCollection({
					localStorage : new Backbone.LocalStorage("table_generador"),
				})
			}
			this.generadorCollection.fetch();		
		},
	}
	window.DataBaseHelper = DataBaseHelper;
	return DataBaseHelper;
});
