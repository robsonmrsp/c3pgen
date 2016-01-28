define(function(require) {
	var Joint = require('joint');
	var AttributeModel = require('models/AttributeModel');
	var EntityModel = require('models/EntityModel');

	var PortVisualEntity = Joint.shapes.basic.Generic.extend(_.extend({}, Joint.shapes.basic.PortsModelInterface, {
		markup : [ '<g class="rotatable">', '<g class="scalable">', '<rect class="uml-class-name-rect body"/><rect class="uml-class-attrs-rect"/><rect class="uml-class-relationships-rect"/>', '</g>',
				'<text class="uml-class-name-text"/><text class="uml-class-attrs-text"/><text class="uml-class-relationships-text"/>', '<g class="inPorts" />', +'<g class="outPorts" />', '</g> ' ].join(''),

		portMarkup : '<g class="port port<%= id %>"><circle class="port-body"/><text class="port-label"/></g>',

		defaults : Joint.util.deepSupplement({

			type : 'devs.Model',
			size : {
				width : 1,
				height : 1
			},

			inPorts : [],
			outPorts : [],

			attrs : {
				'.' : {
					magnet : false
				},
				rect : {
					'width' : 200
				},

				'.body' : {
					width : 250,
					height : 250,
					stroke : '#000000'
				},
				'.port-body' : {
					r : 5,
					magnet : true,
					stroke : '#000000'
				},
				text : {
					'pointer-events' : 'none'
				},
				'.label' : {
					text : 'PortModelModel',
					'ref-x' : .5,
					'ref-y' : 10,
					ref : '.body',
					'text-anchor' : 'middle',
					fill : '#000000'
				},
				'.inPorts .port-label' : {
					x : -15,
					dy : 4,
					'text-anchor' : 'end',
					fill : '#000000'
				},
				'.outPorts .port-label' : {
					x : 15,
					dy : 4,
					fill : '#000000'
				},

				'.uml-class-name-rect' : {
					fill : '#ff8450',
					'max-height' : '45px',
					stroke : '#fff',
					'stroke-width' : 0.5
				},
				'.uml-class-attrs-rect' : {
					fill : '#fe976a',
					stroke : '#fff',
					'stroke-width' : 0.5,
				},

				'.uml-class-relationships-rect' : {
					fill : '#fe976a',
					stroke : '#fff',
					'stroke-width' : 0.5,
				},
				'.uml-class-attrs-text' : {
					'ref-y' : 0.5,
					'fill' : 'black',
					'y-alignment' : 'middle',
					'ref' : '.uml-class-attrs-rect',
					'ref-x' : 5,
					'fill' : 'black',
					'font-size' : 12,
					'font-family' : 'Times New Roman'

				},

				'.uml-class-name-text' : {
					'ref' : '.uml-class-name-rect',
					'ref-y' : .5,
					'ref-x' : .5,
					'text-anchor' : 'middle',
					'y-alignment' : 'middle',
					'font-weight' : 'bold',
					'fill' : 'black',
					'font-size' : 12,
					'font-family' : 'Times New Roman'
				},

				'.uml-class-relationships-text' : {
					'ref' : '.uml-class-relationships-rect',
					'ref-y' : 5,
					'ref-x' : 5,
					'fill' : 'black',
					'font-size' : 12,
					'font-family' : 'Times New Roman'
				},

			}

		}, Joint.shapes.basic.Generic.prototype.defaults),

		getPortAttrs : function(portName, index, total, selector, type) {

			var attrs = {};

			var portClass = 'port' + index;
			var portSelector = selector + '>.' + portClass;
			var portLabelSelector = portSelector + '>.port-label';
			var portBodySelector = portSelector + '>.port-body';

			attrs[portLabelSelector] = {
				text : portName
			};
			attrs[portBodySelector] = {
				port : {
					id : portName || _.uniqueId(type),
					type : type
				}
			};
			attrs[portSelector] = {
				ref : '.body',
				'ref-y' : (index + 0.5) * (1 / total)
			};

			if (selector === '.outPorts') {
				attrs[portSelector]['ref-dx'] = 0;
			}

			return attrs;
		}
	}));
	return PortVisualEntity;
});