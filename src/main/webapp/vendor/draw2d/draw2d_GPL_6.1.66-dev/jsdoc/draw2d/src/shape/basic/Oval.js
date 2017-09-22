
/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************/

/**
 * @class draw2d.shape.basic.Oval
 * Oval figure.
 * 
 * 
 * See the example:
 *
 *     @example preview small frame
 *     
 *     var oval =  new draw2d.shape.basic.Oval({width:150, height:100, x:50, y:10});
 *     
 *     canvas.add(oval);
 *     
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.VectorFigure
 */
draw2d.shape.basic.Oval = draw2d.VectorFigure.extend({
    NAME : "draw2d.shape.basic.Oval",

    /**
     * 
     * @constructor
     * Creates a new figure element which are not assigned to any canvas.
     * 
     * @param {Object} [attr] the configuration of the shape
     */
    init: function(attr, setter, getter ) 
    {
        this._super( 
                $.extend({
                    bgColor:"#C02B1D", 
                    color:"#1B1B1B"
                    },attr),
                $.extend({
                    center: this.setCenter
                    },setter),
                getter);
    },
      

   /** 
    * @template
    **/
   createShapeElement: function()
   {
     var halfW = this.getWidth()/2;
     var halfH = this.getHeight()/2;
     
     return this.canvas.paper.ellipse(this.getAbsoluteX()+halfW, this.getAbsoluteY()+halfH, halfW, halfH);
   },

   
   /**
    * @method
    * Get the center of the figure
    * 
    */
   getCenter: function(){
       var w2= this.getWidth()/2;
       var h2= this.getHeight()/2;

       return this.getPosition().translate(w2,h2);
   },

   /**
    * @method
    * Set the center of the figure.
    * 
    * @param {Number|draw2d.geo.Point} x the new x coordinate of the center or a draw2d.geo.Point object with the center
    * @param {Number} [y] the y coordinate of the new center of the first argument isn't a draw2d.geo.Point object
    */
   setCenter: function(x, y)
   {
       var pos = new draw2d.geo.Point(x,y);
       var w2= this.getWidth()/2;
       var h2= this.getHeight()/2;

       pos.translate(-w2,-h2);
       this.setPosition(pos);

       this.fireEvent("change:center",{value:{x:x,y:y}});

       return this;
   },
   

   /**
    * @inheritdoc
    * 
    * @template
    **/
   repaint: function(attributes)
   {
       if(this.repaintBlocked===true || this.shape===null){
           return;
       }

       attributes= attributes || {};
       
       
       // don't override cx/cy if inherited class has set the center already.
       if(typeof attributes.rx === "undefined"){
           attributes.rx = this.width/2;
           attributes.ry = this.height/2;
       }
 
       // don't override cx/cy if inherited class has set the center already.
       if(typeof attributes.cx === "undefined"){
           attributes.cx = this.getAbsoluteX()+attributes.rx;
           attributes.cy = this.getAbsoluteY()+attributes.ry;
       }
       
       this._super(attributes);
   },
   
   /**
    * @method
   *
   *   NOTE: Rotation will need to be added to this function
   *
   **/
   intersectionWithLine: function(a1, a2)
   {
	   var rx = this.getWidth()/2;
	   var ry = this.getHeight()/2;
       
	   var result= new draw2d.util.ArrayList();
       
       var origin = new draw2d.geo.Point(a1.x, a1.y);
       var dir    = a2.subtract(a1);
       var center = new draw2d.geo.Point(this.getAbsoluteX()+rx, this.getAbsoluteY()+ry);
       var diff   = origin.subtract(center);
       var mDir   = new draw2d.geo.Point( dir.x/(rx*rx),  dir.y/(ry*ry)  );
       var mDiff  = new draw2d.geo.Point( diff.x/(rx*rx), diff.y/(ry*ry) );

       var a = dir.dot(mDir);
       var b = dir.dot(mDiff);
       var c = diff.dot(mDiff) - 1.0;
       var d = b*b - a*c;

       if ( d < 0 ) {
           // "Outside"
       } else if ( d > 0 ) {
           var root = Math.sqrt(d);
           var t_a  = (-b - root) / a;
           var t_b  = (-b + root) / a;

           if ( (t_a < 0 || 1 < t_a) && (t_b < 0 || 1 < t_b) ) {
               if ( (t_a < 0 && t_b < 0) || (t_a > 1 && t_b > 1) ){
                   //"Outside";
               }
               else{            	   
                   ;//"Inside";
               }
           } else {
               if ( 0 <= t_a && t_a <= 1 )
                   result.add( a1.lerp(a2, t_a) );
               if ( 0 <= t_b && t_b <= 1 )
                   result.add( a1.lerp(a2, t_b) );
           }
       } else {
           var t = -b/a;
           if ( 0 <= t && t <= 1 ) {
               result.add( a1.lerp(a2, t) );
           } else {
               //"Outside";
           }
       }
       
       return result;
   }	 
    
});

