define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var LocalStorage = require('localStorage');
	var BaseModel = require('models/BaseModel');
	var RemoteBaseModel = require('models/RemoteBaseModel');
	<#list application.entities as entity>
		<#if entity.hasMobile == true>
	var ${entity.name}Collection = require('collections/${entity.name}Collection');
		</#if>
	</#list>
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
			<#list application.entities as entity>
				<#if entity.hasMobile == true>
				
			this.initTable${entity.name}();
			model.set('${firstLower(entity.name)}s', this.${firstLower(entity.name)}Collection.getToSync());
				</#if>
			</#list>
			model.set('clientId', 'mobile_xpto');//ainda falta decidir como obter essa informação do SO 
			model.save({}, {
				success : function(col, resp, opt) {
					console.info('sincronizado : ', col, resp, opt);
			<#list application.entities as entity>
				<#if entity.hasMobile == true>
				
					that.${firstLower(entity.name)}Collection.resetAndstore(_model.get('${firstLower(entity.name)}s'));
					console.info('atualizando firstLower(entity.name)}' ); 
				</#if>
			</#list>					
				},
				error : function(col, resp, opt) {
					console.error('Erro ao sincronizar: ', col, resp, opt);
				},
				ajaxSync : true,
			})
		},
		
		<#list application.entities as entity>
		<#if entity.hasMobile == true>
		initTable${entity.name} : function() {		
			if (!this.${firstLower(entity.name)}Collection) {
				this.${firstLower(entity.name)}Collection = new ${entity.name}Collection({
					localStorage : new Backbone.LocalStorage("table_${firstLower(entity.name)}"),
				})
			}
			this.${firstLower(entity.name)}Collection.fetch();		
		},
		</#if>
		</#list>
	}
	window.DataBaseHelper = DataBaseHelper;
	return DataBaseHelper;
});
