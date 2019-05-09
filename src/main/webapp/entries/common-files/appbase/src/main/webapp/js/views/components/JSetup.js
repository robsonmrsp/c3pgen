define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Backgrid = require('adapters/backgrid-adapter');
	var util = require('utilities/utils');
	var GridTemplate = require('text!views/components/tpl/GridTemplate.html');
	var CounterTemplate = require('text!views/components/tpl/CounterTemplate.html');

	var Combobox = require('views/components/Combobox');
	var RadioGroup = require('views/components/RadioGroup');
	var CheckGroup = require('views/components/CheckGroup');
	var Multiselect = require('views/components/Multiselect');
	var Suggestbox = require('views/components/Suggestbox');
	var BooleanBadgeCell = require('views/components/BooleanBadgeCell');
	/**
	 * ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 * --------------------------------------------------------------------------------------------Constantes--------------------------------------------------------------------------------------------------------------------------------------------------------
	 * ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 */
	var STATE_COLLECTION_MAP = window.STATE_COLLECTION_MAP || new Map();
	window.STATE_COLLECTION_MAP = STATE_COLLECTION_MAP;

	/**
	 * ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 * --------------------------------------------------------------------------------------------BASE MODELS--------------------------------------------------------------------------------------------------------------------------------------------------------
	 * ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 */
	var BaseModel = Backbone.Model.extend({
		initialize : function() {

		},

		get : function(attr) {
			var value = Backbone.Model.prototype.get.call(this, attr);
			return _.isFunction(value) ? value.call(this) : value;
		},

		toJSON : function() {
			var data = {};
			var json = Backbone.Model.prototype.toJSON.call(this);
			_.each(json, function(value, key) {
				data[key] = this.get(key);
			}, this);
			return data;
		}
	});

	var BaseCollection = Backbone.Collection.extend({

		filterEqual : function(options) {
			var that = this;
			var oldUrl = this.url;
			var _success = options.success
			var _error = options.error

			options.success = function(model, data, options) {
				if (_success)
					_success(model, data, options);
			}
			options.error = function(model, data, options) {
				if (_error)
					_error(model, data, options);
			}
			options.complete = function(model, data, options) {
				that.url = oldUrl;
			}

			this.url = oldUrl.replace('all', '');

			this.fetch(options);
		},
		filterAlike : function(options) {
			var that = this;
			var oldUrl = this.url;
			var _success = options.success
			var _error = options.error

			options.success = function(model, data, options) {
				if (_success)
					_success(model, data, options);
			}
			options.error = function(model, data, options) {
				if (_error)
					_error(model, data, options);
			}
			options.complete = function(model, data, options) {
				that.url = oldUrl;
			}

			this.url = oldUrl.replace('all', 'filterAlike');

			this.fetch(options);
		}
	});

	var BasePageableCollection = Backbone.PageableCollection.extend({

		state : {
			firstPage : 1,
			lastPage : null,
			currentPage : 1,
			pageSize : 10,
			totalPages : null,
			totalRecords : null,
			sortKey : null,
			order : -1
		},

		/**
		 * capturing the state
		 */
		parseState : function(resp, queryParams, state, options) {

			STATE_COLLECTION_MAP.add({
				state : state,
				filterQueryParams : this.filterQueryParams
			}, this.model.prototype.urlRoot);

			var state = Backbone.PageableCollection.prototype.parseState.apply(this, arguments);
			return state;
		},

		filterEqual : function(options) {
			var that = this;
			var oldUrl = this.url;
			var _success = options.success
			var _error = options.error

			options.success = function(model, data, options) {
				if (_success)
					_success(model, data, options);
			}
			options.error = function(model, data, options) {
				if (_error)
					_error(model, data, options);
			}
			options.complete = function(model, data, options) {
				that.url = oldUrl;
			}

			options.data.exact = true;
			
			this.fetch(options);
		},
		
		queryParams : {
			totalPages : null,
			pageSize : "pageSize",
			totalRecords : null,
			sortKey : "orderBy",
			order : "direction",
			directions : {
				"-1" : "asc",
				"1" : "desc"
			}
		},
	});
	/**
	 * --------------------------------------------------------------------------------------------END BASE MODELS----------------------------------------------------------------------------------------------------------------------------------------------------
	 */

	/**
	 * ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 * --------------------------------------------------------------------------------------------DATATABLE backgrid, cells, editor and etc--------------------------------------------------------------------------------------------------------------------------------------
	 * ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 */

	var Counter = Marionette.ItemView.extend({
		className : 'counter-component',
		template : _.template(CounterTemplate),
		events : {
			'change  .combo-page-size' : 'changePageSize',
		},
		ui : {

			outputInitialPage : '.initial-page',

			noElementsSpan : '.has-no-elements',

			elementsSpan : '.has-elements',

			outputFinalPage : '.final-page',

			outputTotalRecords : '.total-records',

			inputComboPageSize : '.combo-page-size',
			loadingElements : '.loading-elements'
		},
		changePageSize : function() {
			var newPageSize = parseInt(this.ui.inputComboPageSize.val() || 10);
			this.collection.state.pageSize = newPageSize;
			this.collection.getFirstPage();
		},

		initialize : function(options) {
			this.listenTo(this.collection, "add", this.atualiza);
			this.listenTo(this.collection, "remove", this.atualiza);
			this.listenTo(this.collection, "reset", this.atualiza);

			this.listenTo(this.collection, "request", this.startRequest);
			// this.listenTo(this.collection, "sync", this.endRequest);

			this.on('show', function() {
				this.ui.inputComboPageSize.val(this.collection.state.pageSize);

				this.atualiza();
			});
		},
		startRequest : function() {
			this.ui.noElementsSpan.hide();
			this.ui.elementsSpan.hide();

			this.ui.loadingElements.show();

		},

		atualiza : function() {
			this.ui.elementsSpan.hide();
			var state = this.collection.state;
			if (this.collection.size() == 0) {
				this.ui.noElementsSpan.show();
				this.ui.elementsSpan.hide();
				this.ui.loadingElements.hide();
				this.ui.outputInitialPage.text(0);
				this.ui.outputFinalPage.text(0);
				this.ui.outputTotalRecords.text(0);
			} else if (this.collection && this.collection instanceof Backbone.PageableCollection) {
				this.ui.loadingElements.hide();
				this.ui.noElementsSpan.hide();
				this.ui.elementsSpan.show();
				// this.el.html("testando");
				var a = ((state.currentPage - 1) * state.pageSize) + 1;
				var b = state.currentPage * state.pageSize;
				var c = state.totalRecords;
				if (b > c)
					b = c;
				this.ui.outputInitialPage.text(a);
				this.ui.outputFinalPage.text(b);
				this.ui.outputTotalRecords.text(c);
			}
			// return this;
		},
	});

	var DataTable = Marionette.LayoutView.extend({
		template : _.template(GridTemplate),

		regions : {
			gridRegion : '.grid',
			counterRegion : '.counter',
			paginatorRegion : '.paginator',
		},

		getFirstPage : function(options) {
			this.collection.filterQueryParams = options.filterQueryParams;
			this.collection.getFirstPage(options);
		},

		recoveryLastQuery : function(initialQuery) {

			var stateCollection = STATE_COLLECTION_MAP.get(this.collection.model.prototype.urlRoot);
			if (stateCollection && stateCollection.state)
				this.collection.state = stateCollection.state;

			if (stateCollection && stateCollection.filterQueryParams) {
				this.collection.filterQueryParams = stateCollection.filterQueryParams;
			} else {
				this.collection.filterQueryParams = initialQuery;
			}

			this.collection.fetch();
		},

		initialize : function(options) {
			var that = this;
			options.showCounter = _.isUndefined(options.showCounter) || options.showCounter;
			options.showPaginator = _.isUndefined(options.showPaginator) || options.showPaginator;
			options.showColManager = _.isUndefined(options.showColManager) || options.showColManager;

			if (!options.columns) {
				throw new TypeError("Deve definir as colunas do grid");
			}

			if (!options.collection) {
				throw new TypeError("Deve definir a coleção do grid");
			}

			this.onFetching = options.onFetching;
			this.onFetched = options.onFetched;
			this.context = options.view;
			this.collection = options.collection;

			if (this.onFetching) {
				this.collection.on('fetching', this.onFetching, this.context);
			}
			if (this.onFetched) {
				this.collection.on('fetched', this.onFetched, this.context);
			}

			var colSizes = options.columns.length
			if (colSizes > 0 && options.columns[colSizes - 1].name === 'acoes') {
				options.columns[colSizes - 1].alwaysVisible = true;
			}

			// adicionando uma header compativel com tipos numericos
			_.each(options.columns, function(col) {
				if (col.cell && col.cell.__super__ && col.cell.__super__.className == 'custom-number-cel') {
					col.headerCell = Backgrid.HeaderCell.extend({
						className : 'custom-number-cel'
					})
				}
			})

			var bbColumns = new Backgrid.Columns(options.columns);

			if (options.showColManager) {
				bbColumns.add({
					label : "ColumnManager_visibility_tool",
					cell : "string",
					alwaysVisible : true,
					headerCell : Backgrid.Extension.ColumnManager.ColumnVisibilityHeaderCell
				});

				var colManager = new Backgrid.Extension.ColumnManager(bbColumns, {
					initialColumnsVisible : 6,
					saveState : true,
					loadStateOnInit : true
				});

				var colVisibilityControl = new Backgrid.Extension.ColumnManagerVisibilityControl({
					columnManager : colManager
				});
			}

			this.grid = new Backgrid.Grid({
				row : options.row,
				className : options.className || options.gridClass || 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : bbColumns,

				emptyText : options.emptyText || "Sem registros",
				collection : options.collection
			});

			if (options.showCounter)
				this.counter = new Counter({
					collection : options.collection,
				});

			if (options.showPaginator)
				this.paginator = new Backgrid.Extension.Paginator({
					columns : bbColumns,
					windowSize : options.paginatorWindowSize || 10,
					collection : options.collection,
					className : ' paging_simple_numbers',
					uiClassName : 'pagination',
				});

			this.on('show', function() {
				that.gridRegion.show(that.grid);
				if (options.showCounter) {
					that.counterRegion.show(that.counter);
				} else {
					that.counterRegion.$el.remove();
					window.counterR = that.counterRegion;
				}
				if (options.showPaginator) {
					that.paginatorRegion.show(that.paginator);
				} else {
					that.paginatorRegion.$el.remove();
				}
			})
		},
	})

	var InputCellNumericEditor = Backgrid.InputCellEditor.extend({

		render : function() {
			var model = this.model;
			this.$el.percent();
			this.$el.val(model.get(this.column.get("name")));
			return this;
		},

	});

	var NumericCell = Backgrid.Cell.extend({
		className : "custom-number-cel",
		type : 'decimal',
		editor : InputCellNumericEditor,

		render : function() {
			this.$el.empty();
			var model = this.model;
			var theColValue = null;

			if (this.column.get("name").indexOf('.') > 0) {// composto
				var fields = this.column.get("name").split('.')
				theColValue = parseFloat(model.get(fields[0]) && model.get(fields[0])[fields[1]]);
			} else {

				if (_.isObject(model.get(this.column.get("name")))) {
					theColValue = model.get(this.column.get("name"));
				} else {
					if (_.isNumber(model.get(this.column.get("name")))) {
						theColValue = model.get(this.column.get("name"));
					} else {
						var value = model.get(this.column.get("name")) || '';
						theColValue = parseFloat(value.replace(/\./g, '').replace(',', '.'));
						model.set(this.column.get("name"), theColValue);
					}
				}
			}

			var theFormattedColValue = '';

			if (theColValue) {
				if (this.type === 'money') {
					if (_.isObject(theColValue)) {
						theFormattedColValue = this.formatter.fromRaw(theColValue, model);
					} else {
						theFormattedColValue = this.formatter.fromRaw(util.formatNumeric(theColValue, 2), model);
					}
					this.$el.text('R$ ' + theFormattedColValue);
				} else if (this.type === 'decimal') {
					if (_.isObject(theColValue)) {
						theFormattedColValue = this.formatter.fromRaw(theColValue, model);
					} else {
						theFormattedColValue = this.formatter.fromRaw(util.formatNumeric(theColValue, 2), model);
					}
					this.$el.text(theFormattedColValue);
				} else if (this.type === 'integer') {
					theFormattedColValue = this.formatter.fromRaw(theColValue, model);
					this.$el.text(theFormattedColValue);

				} else if (this.type === 'percent') {
					if (_.isObject(theColValue)) {
						theFormattedColValue = this.formatter.fromRaw(theColValue, model);
					} else {
						theFormattedColValue = this.formatter.fromRaw(util.formatNumeric(theColValue, 2), model);
					}
					this.$el.text(theFormattedColValue + ' %');
				} else { // só pra garantir, mas aparentemente o integer
					// seria tratado
					theFormattedColValue = this.formatter.fromRaw(theColValue, model);
					this.$el.text(theFormattedColValue);
				}
			}
			this.delegateEvents();
			return this;
		},
	});

	var GeneralCell = Backgrid.Cell.extend({
		buttons : [],
		className : "td-actions",
		editor : Backgrid.CellEditor,

		render : function() {
			var that = this;
			this.$el.empty();
			_.each(this.buttons, function(button) {
				var vetor = [];
				button.type = button.type || 'default';
				vetor.push("<a id='" + button.id + "' href='javascript:void(-1)' class='btn btn-xs button_cell btn-" + button.type + " " + button.customClass + "'  data-toggle='tooltip' data-placement='top' title='' data-original-title='" + button.hint + "' >");
				vetor.push("	<i class='fa " + button.icon + " fa-lg'></i>");
				vetor.push("</a>");

				that.$el.append(vetor.join(' '));

				that.events["click #" + button.id] = function() {
					button.onClick.call(that.context, that.model);
				};
			})
			this.delegateEvents();
			this.$el.ready(function() {
				that.$el.find('a').tooltip();
			})
			return this;
		}
	});

	// Aceita o html explicito na definição da celula na coluna e o objeto
	// carregado pelo require
	var TemplateCell = Backgrid.Cell.extend({
		editor : Backgrid.CellEditor,

		className : "custom-string-cell",
		html : '<div> </div>',

		render : function() {
			this._template = _.template(this.html);
			this.$el.empty();
			var model = this.model;

			this.$el.html(this._template(model && model.toJSON()));

			this.delegateEvents();
			return this;
		},
	});
	var PartialTemplateCell = Backgrid.Cell.extend({
		editor : Backgrid.CellEditor,

		className : "custom-string-cell",
		html : '<div> </div>',

		render : function() {
			this._template = _.template(this.html);
			this.$el.empty();
			var model = this.model;
			var theColValue = null;

			if (this.column.get("name").indexOf('.') > 0) {// composto
				var fields = this.column.get("name").split('.')
				theColValue = model.get(fields[0]) && model.get(fields[0])[fields[1]];
			} else {
				theColValue = model.get(this.column.get("name"));
			}
			if (theColValue)
				this.$el.html(this._template(theColValue));

			this.delegateEvents();
			return this;
		},
	});

	var CustomStringCell = Backgrid.Cell.extend({
		className : "custom-string-cell",
		render : function() {
			this.$el.empty();
			var model = this.model;
			var theColValue = null;

			if (this.column.get("name").indexOf('.') > 0) {// composto
				var fields = this.column.get("name").split('.')
				if (fields.length == 2) {
					theColValue = model.get(fields[0]) && model.get(fields[0])[fields[1]];
				} else if (fields.length == 3) {
					theColValue = model.get(fields[0]) && model.get(fields[0])[fields[1]] && model.get(fields[0])[fields[1]][fields[2]];
				}
			} else {
				theColValue = model.get(this.column.get("name"));
			}

			var theFixedValue = (_.isUndefined(theColValue) || _.isNull(theColValue)) ? '' : theColValue;

			this.$el.text(this.formatter.fromRaw(theFixedValue, model));

			this.delegateEvents();
			return this;
		},
	});

	var EntityCell = Backgrid.Cell.extend({
		editor : Backgrid.CellEditor,
		className : 'general-string-cell',
		fieldName : '',
		/**
		 * Tipos de botão : default primary success info warning danger
		 */
		render : function() {
			var that = this;
			this.$el.empty();
			if (this.fieldName) {
				var fields = this.fieldName.split('.')

				if (fields.length > 1) {
					if (this.model.get(fields[0]))
						that.$el.append(this.model.get(fields[0])[fields[1]])
				} else {
					that.$el.append(this.model.get(fields[0]));
				}
			}
			this.delegateEvents();
			return this;
		}
	});

	var RowClick = Backgrid.Row.extend({
		className : 'custom-row-click',
		render : function() {
			RowClick.__super__.render.apply(this, arguments);
			this.$el.data('model', this.model);
			return this;
		}
	});

	/**
	 * --------------------------------------------------------------------------------------------END DATATABLE-------------------------------------------------------------------------------------------------------------------------------
	 */

	var SimpleView = Marionette.LayoutView.extend({});

	var View = Marionette.LayoutView.extend({
		templateHelpers : util,

		onShow : function() {
			$.validate({
				modules : 'location, date, security, brazil',
				validateOnEvent : true,
				inputParentClassOnSuccess : '',
				addValidClassOnAll : true,
			});

			this.onShowView && this.onShowView();
		},

		isValid : function() {
			// checar se realmente é necessário
			return this.$el.isValid(null, {
				modules : 'location, date, security, brazil',
				validateOnEvent : true,
				inputParentClassOnSuccess : '',
				addValidClassOnAll : true,
			});
		},

		clearForm : function() {
			if (this.customClearForm) {
				this.customClearForm();
			}
			if (this.ui) {
				_.each(this.ui, function(uiItem) {
					if (!uiItem.attr('persist'))
						util.clear(uiItem.attr('id'));
				});
			}
			// TODO ver uma forma mais elegente de limpar os campos de upload;
			var inputImage = $('.jsetup-upload-image');
			inputImage.attr('src', inputImage.attr('no-image-file'));
		}
	});

	/**
	 * ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 * --------------------------------------------------------------------------------------------UPLOADS--------------------------------------------------------------------------------------------------------------------------------------------------------
	 * ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 */
	var UploadAlTemplate = require('text!views/components/tpl/InputAllUploadTemplate.html');

	var InputAllUpload = Marionette.ItemView.extend({
		template : _.template(UploadAlTemplate),

		events : {
			'change .input-upload-file' : "sendFile",
			'click 	.show-preview' : 'showPreview',
			'click .input-image' : "forceClickInputUploadFile"
		},

		ui : {
			imageView : '.input-image',
			inputUploadFile : '.input-upload-file',
			uploadImage : '.jsetup-upload-image',
			modalView : '.modal',
			iframe : '.iframe-modal',
			form : '#formAttachment',
		},

		showPreview : function() {
			this.ui.iframe.attr('src', this.value.filePath);
			this.ui.modalView.modal('show');
		},

		forceClickInputUploadFile : function(evt) {
			this.ui.inputUploadFile.trigger('click');
		},

		initialize : function(options) {
			var that = this
			this.onSuccess = options.onSuccess;
			this.onError = options.onError;
			this.noImage = options.noImage || 'images/file.png';
			this.value = {};

			this.bindElement = options.bindElement;

			if (!this.bindElement) {
				throw new TypeError("Voce DEVE informar o elemento input que está associado ao upload: ex : #inputFoto1, .inputImagemUsuario");
			}

			this.on('show', function() {
				if (that._getBindEl() && that._getBindEl().val()) {
					this.ui.imageView.attr('src', that._getBindEl().val());
				} else {
					this.ui.imageView.attr('src', that.noImage);
				}
				if (that.noImage) {
					this.ui.imageView.attr('no-image-file', that.noImage);
				}
			});
		},

		sendFile : function() {
			var that = this;

			var uploadEl = this.ui.inputUploadFile.get(0);
			if (uploadEl) {
				_.each(uploadEl.files, function(fil) {
					that.uploadOneFile(fil);
				});
			} else {

			}
		},

		uploadOneFile_lixo : function(file) {
			var oMyForm = new FormData();
			oMyForm.append("file", file);
			$.ajax({
				dataType : 'json',
				url : "rs/crud/uploads/file",
				data : oMyForm,
				type : "POST",
				enctype : 'multipart/form-data',
				processData : false,
				contentType : false,
				success : function(result) {
					// ...;
				},
				error : function(result) {
					// ...;
				}
			});
		},

		uploadOneFile : function(file) {
			var that = this;
			var fileType = file.type;
			this.ui.imageView.attr('src', 'images/loading.gif');

			var model = new BaseModel();
			model.url = 'rs/crud/uploads/file';
			var dataFile = new FormData();
			dataFile.append('file', file);
			model.save({}, {
				success : function(_model, _resp, _options) {
					console.log(_model, _resp, _options)

					that.manageFile(fileType, _resp, _options);
					// if the updating file is a image, show it!

				},
				error : function(_model, _resp, _options) {
					that.ui.imageView.attr('src', 'images/uploadfailed.jpg');
					console.error(_model, _resp, _options)
					if (that.onError) {
						that.onError(_resp, _options)
					}
				},
				contentType : false,// 'multipart/form-data',
				parse : false,
				processData : false,
				data : dataFile,
			});
		},

		getValue : function() {
			return this.value;
		},

		setPath : function(path) {
			this.path = path
		},

		setType : function(type) {
			this.type = type
		},

		manageFile : function(fileType, resp, options) {
			var that = this;

			that.value.filePath = resp.dataUrl;
			that.value.fileType = fileType;

			if (fileType === 'image/jpeg' || fileType === 'image/png') {
				that.ui.imageView.attr('src', resp.dataUrl)

				if (that.bindElement) {
					that._getBindEl().val(resp.dataUrl)
				}
				if (that.onSuccess) {
					that.onSuccess(resp, options);
				}
			} else if (fileType === 'text/html') {
				that.ui.imageView.attr('src', 'images/fileicons/html.png')

				if (that.bindElement) {
					that._getBindEl().val('images/fileicons/html.png')
				}
			} else if (fileType === 'text/plain') {
				that.ui.imageView.attr('src', 'images/fileicons/txt.png')

				if (that.bindElement) {
					that._getBindEl().val('images/fileicons/txt.png')
				}
			} else if (fileType === 'application/pdf') {
				that.ui.imageView.attr('src', 'images/fileicons/pdf.png')

				if (that.bindElement) {
					that._getBindEl().val('images/fileicons/pdf.png')
				}
			}
			if (that.onSuccess) {
				that.onSuccess(resp, options);
			}
		},
		clear : function() {
			this.ui.uploadImage.attr('src', this.ui.uploadImage.attr('no-image-file'));
		},

		_getBindEl : function() {
			if (this.bindElement) {
				if (!(this.bindElement instanceof jQuery)) {
					this.bindElement = $(this.bindElement);
				}
				return this.bindElement
			}
			return null;
		},
		bindValueEl : function(_resp) {

			this._getBindEl.val(_resp.dataUrl)

		}
	});

	var UploadButtonTemplate = require('text!views/components/tpl/InputButtonUploadTemplate.html');

	var InputButtonUpload = Marionette.ItemView.extend({
		template : _.template(UploadButtonTemplate),

		events : {
			'change .input-upload-file' : "sendFile",
			'click .jsetup-upload-image' : "forceClickInputUploadFile"
		},

		ui : {
			imageView : '.input-image',
			iconUpload : '.icon-upload',
			inputUploadFile : '.input-upload-file',
			uploadImage : '.jsetup-upload-image',
		},

		forceClickInputUploadFile : function(evt) {
			this.ui.inputUploadFile.trigger('click');
		},

		initialize : function(options) {
			var that = this
			this.onSuccess = options.onSuccess;
			this.onError = options.onError;
			this.noImage = options.noImage || 'images/no_photo.jpg';
			this.value = {};

			this.bindElement = options.bindElement;

			if (!this.bindElement) {
				throw new TypeError("Voce DEVE informar o elemento input que está associado ao upload: ex : #inputFoto1, .inputImagemUsuario");
			}

			this.on('show', function() {
				if (that._getBindEl() && that._getBindEl().val()) {
					this.ui.imageView.attr('src', that._getBindEl().val());
				} else {
					this.ui.imageView.attr('src', that.noImage);
				}
				if (that.noImage) {
					this.ui.imageView.attr('no-image-file', that.noImage);
				}
			});

		},

		getValue : function() {
			return this.value;
		},
		setPath : function(path) {
			this.path = path
		},
		setType : function(type) {
			this.type = type
		},

		sendFile : function() {
			var that = this;

			var uploadEl = this.ui.inputUploadFile.get(0);
			if (uploadEl) {
				_.each(uploadEl.files, function(fil) {
					that.uploadOneFile(fil);
				});
			} else {

			}
		},

		uploadOneFile : function(file) {
			var that = this;

			this.ui.imageView.attr('src', 'images/loading.gif');

			this.ui.iconUpload.addClass('');

			var model = new BaseModel();
			model.url = 'rs/crud/uploads/file';
			var dataFile = new FormData();
			dataFile.append('file', file);
			model.save({}, {
				success : function(_model, _resp, _options) {
					console.log(_model, _resp, _options)
					// if the updating file is a image, show it!
					that.ui.imageView.attr('src', _resp.dataUrl)

					if (that.bindElement) {
						that._getBindEl().val(_resp.dataUrl)
					}

					if (that.onSuccess) {
						that.onSuccess(_resp, _options);
					}

				},
				error : function(_model, _resp, _options) {
					that.ui.imageView.attr('src', 'images/uploadfailed.jpg');
					console.error(_model, _resp, _options)
					if (that.onError) {
						that.onError(_resp, _options)
					}
				},
				contentType : false,// 'multipart/form-data',
				parse : false,
				processData : false,
				data : dataFile,
			});
		},

		clear : function() {
			this.ui.uploadImage.attr('src', this.ui.uploadImage.attr('no-image-file'));
		},

		_getBindEl : function() {
			if (this.bindElement) {
				if (!(this.bindElement instanceof jQuery)) {
					this.bindElement = $(this.bindElement);
				}
				return this.bindElement
			}
			return null;
		},
		bindValueEl : function(_resp) {

			this._getBindEl.val(_resp.dataUrl)

		}
	});

	var UploadTemplate = require('text!views/components/tpl/InputUploadTemplate.html');
	var InputUpload = Marionette.ItemView.extend({
		template : _.template(UploadTemplate),

		events : {
			'change .input-upload-file' : "sendFile",
			'click .input-image' : "forceClickInputUploadFile",
			'click  .remove-preview' : 'removeFile'

		},

		ui : {
			imageView : '.input-image',
			uploadLabel : '.upload-label',
			removePreview : '.remove-preview',
			inputUploadFile : '.input-upload-file',
			uploadImage : '.jsetup-upload-image',
		},

		forceClickInputUploadFile : function(evt) {
			this.ui.inputUploadFile.trigger('click');
		},

		initialize : function(options) {
			var that = this
			this.onSuccess = options.onSuccess;
			this.onError = options.onError;
			this.label = options.label;
			this.noImage = options.noImage || 'images/no_photo.jpg';

			this.bindElement = options.bindElement;

			if (!this.bindElement) {
				throw new TypeError("Voce DEVE informar o elemento input que está associado ao upload: ex : #inputFoto1, .inputImagemUsuario");
			}

			this.on('show', function() {
				if (that._getBindEl() && that._getBindEl().val()) {
					this.ui.imageView.attr('src', that._getBindEl().val());
					this.ui.removePreview.show();
					this.testImage(that._getBindEl().val());

				} else {
					this.ui.imageView.attr('src', that.noImage);
				}
				if (that.noImage) {
					this.ui.imageView.attr('no-image-file', that.noImage);
				}
				if (this.label) {
					this.ui.uploadLabel.text(this.label);
				}
			});

		},
		testImage : function(URL) {
			var that = this;
			var tester = new Image();

			tester.onerror = function() {
				that.clear();
			};

			tester.src = URL;
		},

		sendFile : function() {
			var that = this;

			var uploadEl = this.ui.inputUploadFile.get(0);
			if (uploadEl) {
				_.each(uploadEl.files, function(fil) {
					that.uploadOneFile(fil);
				});
			} else {

			}
		},
		uploadOneFile_lixo : function(file) {
			var oMyForm = new FormData();
			oMyForm.append("file", file);
			$.ajax({
				dataType : 'json',
				url : "rs/crud/uploads/file",
				data : oMyForm,
				type : "POST",
				enctype : 'multipart/form-data',
				processData : false,
				contentType : false,
				success : function(result) {
					// ...;
				},
				error : function(result) {
					// ...;
				}
			});
		},

		removeFile : function() {
			this.clear();
			this._getBindEl().val('')
			this.ui.removePreview.hide();
		},
		uploadOneFile : function(file) {
			var that = this;

			this.ui.imageView.attr('src', 'images/loading.gif');

			var model = new BaseModel();
			model.url = 'rs/crud/uploads/file';
			var dataFile = new FormData();
			dataFile.append('file', file);
			model.save({}, {
				success : function(_model, _resp, _options) {
					console.log(_model, _resp, _options)
					// if the updating file is a image, show it!
					that.ui.imageView.attr('src', _resp.dataUrl)
					that.ui.removePreview.show();

					if (that.bindElement) {
						that._getBindEl().val(_resp.dataUrl)
					}

					if (that.onSuccess) {
						that.onSuccess(_resp, _options);
					}

				},
				error : function(_model, _resp, _options) {
					that.ui.imageView.attr('src', 'images/uploadfailed.jpg');
					console.error(_model, _resp, _options)
					if (that.onError) {
						that.onError(_resp, _options)
					}
				},
				contentType : false,// 'multipart/form-data',
				parse : false,
				processData : false,
				data : dataFile,
			});
		},

		clear : function() {
			this.ui.uploadImage.attr('src', this.ui.uploadImage.attr('no-image-file'));
			this.ui.removePreview.hide();
		},

		_getBindEl : function() {
			if (this.bindElement) {
				if (!(this.bindElement instanceof jQuery)) {
					this.bindElement = $(this.bindElement);
				}
				return this.bindElement
			}
			return null;
		},

		bindValueEl : function(_resp) {

			this._getBindEl.val(_resp.dataUrl)

		}
	});

	var JSetup = {

		View : View,
		SimpleView : SimpleView,
		RowClick : RowClick,

		Counter : Counter,

		Combobox : Combobox,

		Multiselect : Multiselect,

		MoneyCell : NumericCell.extend({
			type : 'money'
		}),

		DecimalCell : NumericCell.extend({
			type : 'decimal'
		}),

		IntegerCell : NumericCell.extend({
			type : 'integer'
		}),

		PercentCell : NumericCell.extend({
			type : 'percent'
		}),

		CustomStringCell : CustomStringCell,

		EntityCell : EntityCell,

		TemplateCell : TemplateCell,
		PartialTemplateCell : PartialTemplateCell,
		ActionCell : GeneralCell,
		BooleanBadgeCell : BooleanBadgeCell,

		DataTable : DataTable,

		InputUpload : InputUpload,
		InputAllUpload : InputAllUpload,
		InputButtonUpload : InputButtonUpload,
		Suggestbox : Suggestbox,

		BaseModel : BaseModel,
		BaseCollection : BaseCollection,
		BasePageableCollection : BasePageableCollection,
		RadioGroup : RadioGroup,
		CheckGroup : CheckGroup,
		Grid : Backgrid.Grid,

	}
	return JSetup;
});