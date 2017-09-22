
/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************/

/**
 * @class draw2d.shape.icon.Icon
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.SetFigure
 */
draw2d.shape.icon.Icon = draw2d.SetFigure.extend({
    NAME : "draw2d.shape.icon.Icon",

    /**
     * 
     * @constructor
     * Creates a new figure element which are not assigned to any canvas.
     * 
     * @param {Object} attr the configuration of the shape
     */
    init: function(attr, setter, getter ) {
      this._super($.extend({width:50,height:50},attr), setter, getter);
      this.setBackgroundColor("#333333");
      this.keepAspectRatio = false;
    },

    /**
     * @method
     * propagate all attributes like color, stroke,... to the shape element
     **/
    repaint: function(attributes)
    {
        if(this.repaintBlocked===true || this.shape===null){
            return;
        }

        attributes= attributes || {};
        
        // redirect the bgColor to the inner set and not to the outer container
        //
        attributes.fill="none";
        if(this.svgNodes!==null) {
            this.svgNodes.attr({fill: this.bgColor.hash(), stroke:"none"});
        }
        
        this._super(attributes);
    },

    applyTransformation: function()
    {
       var trans = [];
         
       
       if(this.rotationAngle!==0){
    	   trans.push("R"+this.rotationAngle);
       }
        
       if(this.getRotationAngle()=== 90|| this.getRotationAngle()===270){
           var ratio = this.getHeight()/this.getWidth();
           trans.push("T"+(-this.offsetY) + "," + (-this.offsetX));
           trans.push("S"+ratio+","+1/ratio+",0,0");
       }
       else{
           trans.push("T"+(-this.offsetX) + "," + (-this.offsetY));

       }
       if (this.isResizeable()===true) {
            trans.push(
              		   "T"+ this.getAbsoluteX() + "," + this.getAbsoluteY()+
            		   "S"+this.scaleX+","+this.scaleY+","+this.getAbsoluteX()+","+this.getAbsoluteY()
                       );
       }
       else {
            trans.push("T" + this.getAbsoluteX() + "," + this.getAbsoluteY());
       }

       this.svgNodes.transform(trans.join(" "));
    },
    
    /**
     * @private
     */
    createShapeElement: function()
    {
    	var shape = this._super();
    	
        var bb = this.svgNodes.getBBox();

        this.offsetX = bb.x;
        this.offsetY = bb.y;
       
        return shape;
    }
});

