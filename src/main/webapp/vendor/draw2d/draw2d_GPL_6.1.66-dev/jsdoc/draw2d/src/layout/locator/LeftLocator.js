
/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************/

/**
 * @class draw2d.layout.locator.LeftLocator
 * 
 * A LeftLocator is used to place figures to the left of a parent shape.
 *
 * 
 * See the example:
 *
 *     @example preview small frame
 *     
 *
 *     // create a basic figure and add a Label/child via API call
 *     //
 *     var start = new draw2d.shape.node.Start();
 *     start.add(new draw2d.shape.basic.Label({text:"Left Label"}), new draw2d.layout.locator.LeftLocator({
 *      margin:10  // distance to the parent shape
 *     }));
 *     canvas.add( start, 100,50);
 *
 *     
 * @author Andreas Herz
 * @extend draw2d.layout.locator.Locator
 */
draw2d.layout.locator.LeftLocator= draw2d.layout.locator.Locator.extend({
    NAME : "draw2d.layout.locator.LeftLocator",
    
    /**
     * @constructor
     * Constructs a locator with associated parent.
     *
     * @param attr
     */
    init: function(attr)
    {
      this._super();

      this.margin = (attr && ( "margin" in attr))?attr.margin :5;
    },
    
    
    /**
     * @method
     * Relocates the given Figure.
     *
     * @param {Number} index child index of the target
     * @param {draw2d.Figure} target The figure to relocate
     **/
    relocate: function(index, target)
    {
       var parent = target.getParent();
       var boundingBox = parent.getBoundingBox();
       
       // I made a wrong decision in the port handling: anchor point
       // is in the center and not topLeft. Now I must correct this flaw here, and there, and...
       // shit happens.
       var offset = (parent instanceof draw2d.Port)?boundingBox.h/2:0;
       
       
       if(target instanceof draw2d.Port){
           target.setPosition(0,(boundingBox.h/2)-offset);
       }
       else{
           var targetBoundingBox = target.getBoundingBox();
           target.setPosition(-targetBoundingBox.w-this.margin,(boundingBox.h/2)-(targetBoundingBox.h/2)-offset);
       }
    }
});
