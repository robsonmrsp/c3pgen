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
	var CabineCollection = require('collections/CabineCollection');
	var CargoCollection = require('collections/CargoCollection');
	var ClienteCollection = require('collections/ClienteCollection');
	var CorCollection = require('collections/CorCollection');
	var EmbalagemCollection = require('collections/EmbalagemCollection');
	var GeneradorCollection = require('collections/GeneradorCollection');
	var LatadaCollection = require('collections/LatadaCollection');
	var PackingCollection = require('collections/PackingCollection');
	var SacolaCollection = require('collections/SacolaCollection');
	var VariedadeCollection = require('collections/VariedadeCollection');
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
				
			this.initTableCabine();
			model.set('cabines', this.cabineCollection.getToSync());
				
			this.initTableCargo();
			model.set('cargos', this.cargoCollection.getToSync());
				
			this.initTableCliente();
			model.set('clientes', this.clienteCollection.getToSync());
				
			this.initTableCor();
			model.set('cors', this.corCollection.getToSync());
				
			this.initTableEmbalagem();
			model.set('embalagems', this.embalagemCollection.getToSync());
				
			this.initTableGenerador();
			model.set('generadors', this.generadorCollection.getToSync());
				
			this.initTableLatada();
			model.set('latadas', this.latadaCollection.getToSync());
				
			this.initTablePacking();
			model.set('packings', this.packingCollection.getToSync());
				
			this.initTableSacola();
			model.set('sacolas', this.sacolaCollection.getToSync());
				
			this.initTableVariedade();
			model.set('variedades', this.variedadeCollection.getToSync());
			model.set('clientId', 'mobile_xpto');//ainda falta decidir como obter essa informação do SO 
			model.save({}, {
				success : function(col, resp, opt) {
					console.info('sincronizado : ', col, resp, opt);
				
					that.apontamentoQualidadePackingCollection.resetAndstore(_model.get('apontamentoQualidadePackings'));
					console.info('atualizando firstLower(entity.name)}' ); 
				
					that.bolsaoCollection.resetAndstore(_model.get('bolsaos'));
					console.info('atualizando firstLower(entity.name)}' ); 
				
					that.cabineCollection.resetAndstore(_model.get('cabines'));
					console.info('atualizando firstLower(entity.name)}' ); 
				
					that.cargoCollection.resetAndstore(_model.get('cargos'));
					console.info('atualizando firstLower(entity.name)}' ); 
				
					that.clienteCollection.resetAndstore(_model.get('clientes'));
					console.info('atualizando firstLower(entity.name)}' ); 
				
					that.corCollection.resetAndstore(_model.get('cors'));
					console.info('atualizando firstLower(entity.name)}' ); 
				
					that.embalagemCollection.resetAndstore(_model.get('embalagems'));
					console.info('atualizando firstLower(entity.name)}' ); 
				
					that.generadorCollection.resetAndstore(_model.get('generadors'));
					console.info('atualizando firstLower(entity.name)}' ); 
				
					that.latadaCollection.resetAndstore(_model.get('latadas'));
					console.info('atualizando firstLower(entity.name)}' ); 
				
					that.packingCollection.resetAndstore(_model.get('packings'));
					console.info('atualizando firstLower(entity.name)}' ); 
				
					that.sacolaCollection.resetAndstore(_model.get('sacolas'));
					console.info('atualizando firstLower(entity.name)}' ); 
				
					that.variedadeCollection.resetAndstore(_model.get('variedades'));
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
		initTableCabine : function() {		
			if (!this.cabineCollection) {
				this.cabineCollection = new CabineCollection({
					localStorage : new Backbone.LocalStorage("table_cabine"),
				})
			}
			this.cabineCollection.fetch();		
		},
		initTableCargo : function() {		
			if (!this.cargoCollection) {
				this.cargoCollection = new CargoCollection({
					localStorage : new Backbone.LocalStorage("table_cargo"),
				})
			}
			this.cargoCollection.fetch();		
		},
		initTableCliente : function() {		
			if (!this.clienteCollection) {
				this.clienteCollection = new ClienteCollection({
					localStorage : new Backbone.LocalStorage("table_cliente"),
				})
			}
			this.clienteCollection.fetch();		
		},
		initTableCor : function() {		
			if (!this.corCollection) {
				this.corCollection = new CorCollection({
					localStorage : new Backbone.LocalStorage("table_cor"),
				})
			}
			this.corCollection.fetch();		
		},
		initTableEmbalagem : function() {		
			if (!this.embalagemCollection) {
				this.embalagemCollection = new EmbalagemCollection({
					localStorage : new Backbone.LocalStorage("table_embalagem"),
				})
			}
			this.embalagemCollection.fetch();		
		},
		initTableGenerador : function() {		
			if (!this.generadorCollection) {
				this.generadorCollection = new GeneradorCollection({
					localStorage : new Backbone.LocalStorage("table_generador"),
				})
			}
			this.generadorCollection.fetch();		
		},
		initTableLatada : function() {		
			if (!this.latadaCollection) {
				this.latadaCollection = new LatadaCollection({
					localStorage : new Backbone.LocalStorage("table_latada"),
				})
			}
			this.latadaCollection.fetch();		
		},
		initTablePacking : function() {		
			if (!this.packingCollection) {
				this.packingCollection = new PackingCollection({
					localStorage : new Backbone.LocalStorage("table_packing"),
				})
			}
			this.packingCollection.fetch();		
		},
		initTableSacola : function() {		
			if (!this.sacolaCollection) {
				this.sacolaCollection = new SacolaCollection({
					localStorage : new Backbone.LocalStorage("table_sacola"),
				})
			}
			this.sacolaCollection.fetch();		
		},
		initTableVariedade : function() {		
			if (!this.variedadeCollection) {
				this.variedadeCollection = new VariedadeCollection({
					localStorage : new Backbone.LocalStorage("table_variedade"),
				})
			}
			this.variedadeCollection.fetch();		
		},
	}
	window.DataBaseHelper = DataBaseHelper;
	return DataBaseHelper;
});
