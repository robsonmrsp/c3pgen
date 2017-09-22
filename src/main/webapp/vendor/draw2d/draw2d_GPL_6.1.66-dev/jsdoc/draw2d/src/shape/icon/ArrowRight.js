
/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************/

/**
 * @class draw2d.shape.icon.ArrowRight

 * See the example:
 *
 *     @example preview small frame
 *     
 *     var icon =  new draw2d.shape.icon.ArrowRight();
 *     
 *     canvas.add(icon,50,10);
 *     
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */
draw2d.shape.icon.ArrowRight = draw2d.shape.icon.Icon.extend({
    NAME : "draw2d.shape.icon.ArrowRight",

    /**
     * 
     * @constructor
     * Creates a new icon element which are not assigned to any canvas.
     * 
     * @param {Object} attr the configuration of the shape
     */
    init: function(attr, setter, getter ) {
      this._super($.extend({width:50,height:50},attr), setter, getter);
    },

    /**
     * @private
     * @returns
     */
    createSet: function() {
        return this.canvas.paper.path("M6.684,25.682L24.316,15.5L6.684,5.318V25.682z");
    }
});

