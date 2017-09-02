define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var BaseModel = require('models/BaseModel');
	var Marionette = require('marionette');

	var UploadTemplate = require('text!views/components/tpl/InputButtonUploadTemplate.html');

	var InputUpload = Marionette.ItemView.extend({
		template : _.template(UploadTemplate),

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

	return InputUpload;
});