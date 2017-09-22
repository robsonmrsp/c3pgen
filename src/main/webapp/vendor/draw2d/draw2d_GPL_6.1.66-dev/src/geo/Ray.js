
/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************/


/**
 * @class draw2d.geo.Ray
 * A ray is a line starting in [0,0,] with some additional
 * helper functions required for some router.
 * 
 * @inheritable
 * @extends draw2d.geo.Point
 * @author Andreas Herz
 */
draw2d.geo.Ray = draw2d.geo.Point.extend({

    NAME : "draw2d.geo.Ray",
    
    /**
     * @constructor 
     * Creates a ray object. 
     * 
     * @param {Number} x
     * @param {Number} y
     */
    init: function( x, y)
    {
        this._super(x,y);
    },
    
    
    isHorizontal: function()
    {
       return this.x != 0;
    },
    
    similarity: function( otherRay)
    {
       return Math.abs(this.dot(otherRay));
    },
    
    getAveraged: function( otherRay)
    {
        return new draw2d.geo.Ray((this.x + otherRay.x) / 2, (this.y + otherRay.y) / 2);
    }

});