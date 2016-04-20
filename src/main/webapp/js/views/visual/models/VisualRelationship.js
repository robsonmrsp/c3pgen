/* generated: 30/08/2015 20:23:12 */
define(function(require) {
	var Joint = require('joint');
	var AttributeModel = require('models/AttributeModel');
	var EntityModel = require('models/EntityModel');

	var VisualRelationship = Joint.dia.Link.extend({
		defaults : {
			type : 'uml.Relation',
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
			source : {
				x : 10,
				y : 280
			},
			target : {
				x : 740,
				y : 280
			},
			smooth : false,
		// labels : [ {
		// position : 25,
		// attrs : {
		// text : {
		// text : '1..n'
		// }
		// }
		// },

		// { position: 0.45, attrs: { text: { text: 'multiple', fill:
		// 'white', 'font-family': 'sans-serif' }, }},
		// { position: 0.55, attrs: { text: { text: 'labels', fill: 'white',
		// 'font-family': 'sans-serif' }, }},
		// {
		// position : -25,
		// attrs : {
		// text : {
		// text : '*'
		// }
		// }
		// } ]

		},
		setSourceEntity : function(source) {
			this.sourceEntity = source
			if (this.targetEntity) {
				// Ao saber que as duas pontas do relacionamento estão
				// definidas, poderemos alterar o visual da entidade adicionando
				// as informações.
				// podemos lancar um evento ou coisa parecida
			}
		},
		setTargetEntity : function(target) {
			this.targetEntity = target
		}
	});
	return VisualRelationship;

});

