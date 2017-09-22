
/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************/

/**
 * @class draw2d.layout.locator.TopLocator
 * 
 * A TopLocator  is used to place figures at the top/center of a parent shape.
 *
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *
 *     // create a basic figure and add a Label/child via API call
 *     //
 *     var circle = new draw2d.shape.basic.Circle({
 *         x:100,
 *         y:70,
 *         diameter:80,
 *         stroke: 3,
 *         color:"#A63343",
 *         bgColor:"#E65159"
 *     });
 *
 *     circle.add(new draw2d.shape.basic.Label({text:"Top Label"}), new draw2d.layout.locator.TopLocator());
 *     canvas.add( circle);
 *
 * @author Andreas Herz
 * @extend draw2d.layout.locator.Locator
 */
draw2d.layout.locator.TopLocator= draw2d.layout.locator.Locator.extend({
    NAME : "draw2d.layout.locator.TopLocator",
    
    /**
     * @constructor
     * Constructs a ManhattanMidpointLocator with associated Connection c.
     * 
     */
    init: function()
    {
      this._super();
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
       var offset = (parent instanceof draw2d.Port)?boundingBox.w/2:0;
       

       var targetBoundingBox = target.getBoundingBox();
       if(target instanceof draw2d.Port){
           target.setPosition(boundingBox.w/2-offset,0);
       }
       else{
           target.setPosition(boundingBox.w/2-(targetBoundingBox.w/2)-offset,-(targetBoundingBox.h+2));
       }
    }
});
