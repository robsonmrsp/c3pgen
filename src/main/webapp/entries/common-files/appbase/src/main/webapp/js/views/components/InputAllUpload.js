define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var BaseModel = require('models/BaseModel');
	var Marionette = require('marionette');

	var UploadTemplate = require('text!views/components/tpl/InputAllUploadTemplate.html');

	var InputUpload = Marionette.ItemView.extend({
		template : _.template(UploadTemplate),

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

	return InputUpload;
});