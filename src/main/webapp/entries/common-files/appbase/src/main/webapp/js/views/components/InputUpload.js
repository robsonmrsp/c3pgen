/* generated: 22/09/2014 11:14:50 */
define(function(require) {
	// Start "Import´s" Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var BaseModel = require('models/BaseModel');
	var Marionette = require('marionette');

	var UploadTemplate = require('text!views/components/tpl/InputUploadTemplate.html');

	var InputUpload = Marionette.ItemView.extend({
		template : _.template(UploadTemplate),

		events : {
			'change .input-upload-file' : "sendFile",
			'click .input-image' : "forceClickInputUploadFile"
		},

		ui : {
			imageView : '.input-image',
			inputUploadFile : '.input-upload-file',
		},

		forceClickInputUploadFile : function(evt) {
			this.ui.inputUploadFile.trigger('click');
		},

		initialize : function(options) {
			var that = this
			this.onSuccess = options.onSuccess;
			this.onError = options.onError;

			this.bindElement = options.bindElement;

			if (!this.bindElement) {
				throw new TypeError("Voce DEVE informar o elemento input que está associado ao upload: ex : #inputFoto1, .inputImagemUsuario");
			}

			this.on('show', function() {
				if (that._getBindEl() && that._getBindEl().val()) {
					this.ui.imageView.attr('src', that._getBindEl().val());
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
				contentType : 'multipart/form-data',
				parse : false,
				processData : false,
				data : dataFile,
			});
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