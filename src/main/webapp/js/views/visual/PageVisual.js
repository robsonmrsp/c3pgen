/* generated: 30/08/2015 20:23:12 */
define(function(require) {
	// Start "Import´s Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Backgrid = require('adapters/backgrid-adapter');
	var util = require('utilities/utils');
	var Joint = require('joint');
	var AttributeModel = require('models/AttributeModel');

	var PageVisualTemplate = require('text!views/visual/tpl/PageVisualTemplate.html');
	var VisualEntity = require('views/visual/models/VisualEntity');

	var PageVisual = Marionette.LayoutView.extend({
		template : _.template(PageVisualTemplate),

		regions : {},

		events : {
			'click #clickAki' : 'addRelation',
		},
		addRelation : function() {
			this.createRelation = true;
		},
		addAttribute : function() {
			this.address.addAttribute(new AttributeModel({
				name : 'nome',
				type : {
					className : 'String'
				}
			}));
		},

		ui : {},

		initialize : function() {
			var that = this;
			that.link = new Joint.dia.Link({
				source : {
					x : 10,
					y : 280
				},
				target : {
					x : 740,
					y : 280
				},

				smooth : false,
				attrs : {
					'.marker-source' : {
						fill : '#4b4a67',
						stroke : '#4b4a67',
						d : 'M 10 0 L 0 5 L 10 10 z'
					},
					'.marker-target' : {
						fill : '#4b4a67',
						stroke : '#4b4a67',
						d : 'M 10 0 L 0 5 L 10 10 z'
					}
				},
				labels : [ {
					position : 25,
					attrs : {
						text : {
							text : '1'
						}
					}
				}, {
					position : -25,
					attrs : {
						text : {
							text : 'n'
						}
					}
				} ]
			});
			this.address = new VisualEntity({
				position : {
					x : 30,
					y : 90
				},
				size : {
					width : 160,
					height : 100
				},
				name : 'Pessoa',
			// attributes : [ 'houseNumber: Integer', 'streetName: String',
			// 'town: String', 'postcode: String' ],
			});
			this.address.addAttribute(new AttributeModel({
				name : 'nome',
				type : {
					className : 'String'
				}
			}));
			this.on('show', function() {

				this.graph = new Joint.dia.Graph();
				this.paper = new Joint.dia.Paper({
					el : $('#paper'),
					width : 1800,
					height : 1600,
					gridSize : 1,
					model : that.graph
				});
				this.paper.on('cell:pointerclick', function(cellView, evt, x, y) {

					if (that.createRelation) {
						var rel = new Joint.shapes.uml.Composition({
							source : {
								id : cellView.model.id
							},
							target : {
								x : x + 150,
								y : y
							}
						});
						that.graph.addCell(rel);
					}
				});

				this.graph.addCell(this.address);
				this.graph.addCell(this.link);
			});
		},
	});

	return PageVisual;
});
