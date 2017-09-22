
/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************/

/**
 * @class draw2d.shape.basic.Label
 * Implements a simple text label.
 * 
 * See the example:
 *
 *     @example preview small frame
 *     
 *     var shape =  new draw2d.shape.basic.Label({text:"This is a simple label", x:40, y:10});
 *          
 *     canvas.add(shape);
 *     
 * @author Andreas Herz
 * 
 * @extends draw2d.SetFigure
 */
draw2d.shape.basic.Label= draw2d.SetFigure.extend({

	NAME : "draw2d.shape.basic.Label",
	
    FONT_FALLBACK:  {
      'Georgia'            :'Georgia, serif',
      'Palatino Linotype'  :'"Palatino Linotype", "Book Antiqua", Palatino, serif',
      'Times New Roman'    :'"Times New Roman", Times, serif',
      'Arial'              :'Arial, Helvetica, sans-serif',
      'Arial Black'        :'"Arial Black", Gadget, sans-serif',   
      'Comic Sans MS'      :'"Comic Sans MS", cursive, sans-serif',    
      'Impact'             :'Impact, Charcoal, sans-serif',
      'Lucida Sans Unicode':'"Lucida Sans Unicode", "Lucida Grande", sans-serif',  
      'Tahoma, Geneva'     :'Tahoma, Geneva, sans-seri',
      'Trebuchet MS'       :'"Trebuchet MS", Helvetica, sans-serif',
      'Verdana'            :'Verdana, Geneva, sans-serif',
      'Courier New'        :'"Courier New", Courier, monospace',
      'Lucida Console'     :'"Lucida Console", Monaco, monospace'},
      

    /**
     * @constructor
     * Creates a new text element.
     * 
     * @param {Object} [attr] the configuration of the shape
     */
    init: function(attr, setter, getter)
    {
        
        this.text = "";
    	// for performance reasons
        //
        this.cachedWidth  = null;
        this.cachedHeight = null;
        this.cachedMinWidth  = null;
        this.cachedMinHeight = null;
        
        // appearance of the shape
        //
        this.fontSize = 12;
        this.fontColor = new draw2d.util.Color("#080808");
        this.fontFamily = null;
        this.padding = {top:4, right:4, bottom:4,left:4};
        
        this.outlineStroke = 0;
        this.outlineColor = new draw2d.util.Color(null);
        
        this.bold = false;

        // behavior of the shape
        //
        this.editor = null;

        this._super(
            $.extend({stroke:1, width:1,height:1,resizeable:false},attr),
            $.extend({
                /** @attr {String} text the text to show */
                text  : this.setText,
                /** @attr {String} set the editor to use see {@link draw2d.ui.LabelEditor} */
                editor : this.installEditor,
                /** @attr {Number} outlineStroke the line width of the text to draw. Fill color and outline of the text can be different. */
                outlineStroke  : this.setOutlineStroke,
                /** @attr {String|draw2d.util.Color} outlineColor the outline color of the text */
                outlineColor  : this.setOutlineColor,
                /** @attr {String} fontFamily the font to use*/
                fontFamily  : this.setFontFamily,
                /** @attr {Number} fontSize the font size to use */
                fontSize  : this.setFontSize,
                /** @attr {String|draw2d.util.Color} fontColor the font color */
                fontColor  : this.setFontColor,
                /** @attr {Number} padding the padding in pixel around the text */
                padding  : this.setPadding,
                /** @attr {Boolean} bold indicator if bold text should be used*/
                bold  : this.setBold
            }, setter),
            $.extend({
                text          : this.getText,
                outlineStroke : this.getOutlineStroke,
                outlineColor  : this.getOutlineColor,
                fontFamily    : this.getFontFamily,
                fontSize      : this.getFontSize,
                fontColor     : this.getFontColor,
                padding       : this.getPadding,
                bold          : this.isBold
            }, getter));
            

        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());

    
        // some performance improvements
        this.lastAppliedLabelRotation = "";
        this.lastAppliedTextAttributes= {};
    },
    
    /** 
     * @method
     * Creates the shape object for a text node.
     * 
     * @template
     **/
    createSet: function()
    {
    	return this.canvas.paper.text(0, 0, this.text);
    },

    /**
     * @method
     * Set the canvas element of this figures.
     * 
     * @param {draw2d.Canvas} canvas the new parent of the figure or null
     */
    setCanvas: function( canvas )
    {
        this.clearCache();
        this._super(canvas);
        this.clearCache();
    },
    
    /**
     * @method
     * Trigger the repaint of the element and transport all style properties to the visual representation.<br>
     * Called by the framework.
     * 
     * @template
     **/
    repaint: function(attributes)
    {
        if(this.repaintBlocked===true || this.shape===null || (this.parent && this.parent.repaintBlocked===true)){
            return;
        }

        // style the label
        var lattr = this.calculateTextAttr();
        lattr.text = this.text;        
        
        var attrDiff = draw2d.util.JSON.flatDiff(lattr, this.lastAppliedTextAttributes);
        this.lastAppliedTextAttributes= lattr;
      
        // the two "attr" calls takes 2/3 of the complete method call (chrome performance check).
        // now we check if any changes happens and call this method only if neccessary.
        if(!$.isEmptyObject(attrDiff)){
            this.svgNodes.attr(lattr);
            // set of the x/y must be done AFTER the font-size and bold has been set.
            // Reason: the getBBox method needs the font attributes for calculation
            this.svgNodes.attr({
                    x: (this.padding.left+this.stroke),
                    y: (this.svgNodes.getBBox(true).height/2 +this.padding.top + this.getStroke())
                });
        }
        this._super(attributes);
    },
    

    /**
     * 
     * @private
     */
    calculateTextAttr: function()
    {
        var lattr={"text-anchor":"start",
                   "font-size":this.fontSize,
                   "font-weight":(this.bold===true)?"bold":"normal",
                   fill: this.fontColor.hash(),
                   stroke : this.outlineColor.hash(),
                   "stroke-width": this.outlineStroke
                   };
        if(this.fontFamily!==null){
            lattr["font-family"] = this.fontFamily;
        }
        return lattr;
    },

    /**
     * @private
     */
    applyTransformation: function()
    {
        var ts= "R"+this.rotationAngle;
    //    if(ts!==this.lastAppliedLabelRotation){
            this.shape.transform(ts);
            this.lastAppliedLabelRotation = ts;
    //    }
        
        this.svgNodes.transform(
                "R" + this.rotationAngle+
                "T" + this.getAbsoluteX() + "," + this.getAbsoluteY());
        
        return this;
    },

    
    /**
     * @method
     * Set the new font size in [pt].
     *
     * @param {Number} size The new font size in <code>pt</code>
     **/
    setFontSize: function( size)
    {
      this.clearCache();
      this.fontSize = size;
      
      this.repaint();

      this.fireEvent("change:fontSize",{value:this.fontSize});
      this.fireEvent("resize");
      
      // Update the resize handles if the user change the position of the element via an API call.
      //
      var _this = this;
      this.editPolicy.each(function(i,e){
         if(e instanceof draw2d.policy.figure.DragDropEditPolicy){
             e.moved(_this.canvas, _this);
         }
      });
      
    
      return this;
    },
    
    /**
     * @method
     * Return the current used font size in px.
     * 
     * @returns {Number}
     * @since 4.0.1
     */
    getFontSize: function( )
    {
      return this.fontSize;
    },
    

    /**
     * @method
     * Set the label to <b>bold</b> or <b>normal</b> font weight.
     *
     * @param {Boolean} bold The bold flag for the label
     * @since 2.4.1
     **/
    setBold: function( bold)
    {
      this.clearCache();
      this.bold = bold;
      this.repaint();
      
      this.fireEvent("change:bold",{value:this.bold});
      this.fireEvent("resize");
      
      // Update the resize handles if the user change the position of the element via an API call.
      //
      var _this = this;
      this.editPolicy.each(function(i,e){
         if(e instanceof draw2d.policy.figure.DragDropEditPolicy){
             e.moved(_this.canvas, _this);
         }
      });
      
      return this;
    },
    
    /**
     * @method
     * Return the "bold" attribute of the label
     * 
     * @since 5.0.0
     * @returns {Boolean}
     */
    isBold: function()
    {
        return this.bold;
    },
    
    /**
     * @method
     * Set the outline color of the font.
     * 
     * @param {draw2d.util.Color/String} color The new color of the line.
     * @since 4.2.1
     **/
    setOutlineColor: function( color)
    {
      this.outlineColor = new draw2d.util.Color(color);
      this.repaint();
      this.fireEvent("change:outlineColor",{value:this.outlineColor});
      
      return this;
    },

    /**
     * @method
     * The outlien color of the text
     * 
     * @returns {draw2d.util.Color}
     * @since 4.2.1
     */
    getOutlineColor: function()
    {
      return this.outlineColor;
    },
    
    /**
     * @method
     * Set the stroke of the text to use.
     * 
     * @param {Number} w The new line width of the figure
     * @since 4.2.1
     **/
    setOutlineStroke: function( w )
    {
      this.outlineStroke=w;
      this.repaint();
      this.fireEvent("change:outlineStroke",{value:this.outlineStroke});
     
      return this;
    },

    /**
     * @method
     * The used outline line width.
     * 
     * @type {Number}
     * @since 4.2.1
     **/
    getOutlineStroke: function( )
    {
      return this.outlineStroke;
    },

    /**
     * @method
     * Set the color of the font.
     * 
     * @param {draw2d.util.Color/String} color The new color of the line.
     **/
    setFontColor: function( color)
    {
      this.fontColor = new draw2d.util.Color(color);
      this.repaint();
      this.fireEvent("change:fontColor",{value:this.fontColor});
      
      return this;
    },

    /**
     * @method
     * The current used font color
     * 
     * @returns {draw2d.util.Color}
     */
    getFontColor: function()
    {
      return this.fontColor;
    },
    
    /**
     * @method
     * Set the padding of the element
     * 
     *      // Alternatively you can use the attr method:
     *      //
     *      // set the padding for top,left,bottom,right in one call 
     *      figure.attr({
     *        padding: 3
     *      });
     *      
     *      // update the padding left and top
     *      figure.attr({
     *        padding: {left:3, top:30}
     *      });
     * 
     * @param {Number|Object} padding The new padding
     **/
    setPadding: function( padding)
    {
      this.clearCache();
      if(typeof padding ==="number"){
          this.padding = {top:padding, right:padding, bottom:padding, left:padding};
      }
      else{
          $.extend(this.padding, padding);
      }
      this.repaint();
      this.fireEvent("change:padding",{value:this.padding});
      
      return this;
    },

    
    /**
     * @method
     * Get the padding of the element.
     *
     * @since 4.0.1
     **/
    getPadding: function( )
    {
      return this.padding;
    },

    /**
     * @method
     * Set the font family to use. If you use the shown font names the typical fallback 
     * font are installed as well.
     * 
     * <b>Serif Fonts</b>
     * <ul>
     *  <li><span style="font-family:'Georgia'">Georgia</span></li>
     *  <li><span style="font-family:'Palatino Linotype'">Palatino Linotype</span></li>
     *  <li><span style="font-family:'Times New Roman'">Times New Roman</span></li>   
     * </ul>
     * 
     * <b>Sans-Serif Fonts</b>
     * <ul>
     *  <li><span style="font-family:'Arial'">Arial</span></li> 
     *  <li><span style="font-family:'Arial Black'">Arial Black</span></li>  
     *  <li><span style="font-family:'Comic Sans MS'">Comic Sans MS</span></li> 
     *  <li><span style="font-family:'Impact, Charcoal'">Impact, Charcoal</span></li> 
     *  <li><span style="font-family:'Lucida Sans Unicode'">Lucida Sans Unicode</span></li> 
     *  <li><span style="font-family:'Tahoma, Geneva'">Tahoma, Geneva</span></li>
     *  <li><span style="font-family:'Trebuchet MS'">Trebuchet MS</span> </li>  
     *  <li><span style="font-family:'Verdana'">Verdana</span></li>  
     * </ul>
     * 
     * <b>Monospace Fonts</b>
     * <ul>
     *  <li><span style="font-family:'Courier New'">Courier New</span></li>
     *  <li><span style="font-family:'Lucida Console'">Lucida Console</span></li>
     * </ul>
     *
     * @param {String} font The font to use
     **/
    setFontFamily: function( font)
    {
      this.clearCache();
      
      // check for fallback
      //
      if((typeof font!=="undefined") && font!==null && typeof this.FONT_FALLBACK[font] !== "undefined"){
          font=this.FONT_FALLBACK[font];
      }
      
      this.fontFamily = font;
      this.repaint();
      this.fireEvent("change:fontFamily",{value:this.fontFamily});
      
      return this;
    },
    
    
    /**
     * @method
     * Returns the used font family of the label.
     * 
     * @returns {String}
     */
    getFontFamily: function(){
        return this.fontFamily;
    },
    

    /**
     * @method
     * A Label did have "autosize". Do nothing at all.
     *
     **/
    setDimension: function( w, h)
    {
        this.clearCache();
        
        this._super(w,h);
        
        return this;
    },
    
    /**
     * @method
     * clear the internal cache for width/height precalculation
     * @private
     */
    clearCache: function()
    {
        this.portRelayoutRequired=true;
        this.cachedMinWidth  = null;
        this.cachedMinHeight = null;
        this.cachedWidth=null;
        this.cachedHeight=null;
        this.lastAppliedTextAttributes= {};

        return this;
    },
    
    /**
     * @method
     * This value is relevant for the interactive resize of the figure.
     *
     * @return {Number} Returns the min. width of this object.
     */
    getMinWidth: function()
    {
        if (this.shape === null) {
            return 0;
        }
        
        if(this.cachedMinWidth=== null){
            this.cachedMinWidth= this.svgNodes.getBBox(true).width
                                +this.padding.left
                                +this.padding.right
                                +2*this.getStroke();
       }
        
        return this.cachedMinWidth;
    },
    
    /**
     * @method
     * This value is relevant for the interactive resize of the figure.
     *
     * @return {Number} Returns the min. width of this object.
     */
    getMinHeight: function()
    {
        if (this.shape === null) {
            return 0;
        }
        
        if(this.cachedMinHeight=== null){
            this.cachedMinHeight= this.svgNodes.getBBox(true).height
                                 +this.padding.top
                                 +this.padding.bottom
                                 +(2*this.getStroke());
        }
        
        return this.cachedMinHeight;
    },
    
    /**
     * @method
     * Return the calculate width of the set. This calculates the bounding box of all elements.
     *
     * @return {Number} the calculated width of the label
     **/
    getWidth: function()
    {    
        if (this.shape === null) {
            return 0;
        }
        
        if(this.cachedWidth===null){
            if(this.resizeable===true){
                this.cachedWidth = Math.max(this.width, this.getMinWidth());
            }
            else{
                this.cachedWidth = this.getMinWidth();
            }
        }
        
        
        return this.cachedWidth;
    },
    
    /**
     * @method
     * Return the calculated height of the set. This calculates the bounding box of all elements.
     *
     * @return {Number} the calculated height of the label
     */
    getHeight: function()
    {
        if (this.shape === null) {
            return 0;
        }
        
        if(this.cachedHeight===null){
            this.cachedHeight = Math.max(this.height, this.getMinHeight());
        }
        
        return this.cachedHeight;
    },

    /**
     * @method
     * Set an editor for the label. This can be a dialog or inplace editor for the 
     * Text.<br>
     * The editor will be activated if you doubleClick on the label.
     * 
     * @param {draw2d.ui.LabelEditor|String} editor
     */
    installEditor: function( editor )
    {
        if(typeof editor ==="string"){
            editor = eval("new "+editor+"()");
        }
        this.editor = editor;
      
        return this;
    },
    
    /**
     * @method
     * Called when a user dbl clicks on the element
     * 
     */
    onDoubleClick: function()
    {
        if(this.editor!==null){
            this.editor.start(this);
        }
    },
    
    
    /**
     * @method
     * Returns the current text of the label.
     *
     * @returns the current display text of the label
     * @type String
     **/
    getText: function()
    {
      return this.text;
    },
    
    /**
     * @method
     * Set the text for the label. Use \n for multiline text.
     * 
     * @param {String} text The new text for the label.
     **/
    setText: function( text )
    {
      this.clearCache();
      this.text = text;
      
      this.repaint();
      // Update the resize handles if the user change the position of the element via an API call.
      //
      var _this = this;
      this.editPolicy.each(function(i,e){
         if(e instanceof draw2d.policy.figure.DragDropEditPolicy){
             e.moved(_this.canvas, _this);
         }
      });

      this.fireEvent("resize");
      this.fireEvent("change:text",{value:this.text});

      if(this.parent!==null){
          this.parent.repaint();
      }

      return this;
    },
    

    hitTest: function(x, y) 
    {
        // apply a simple bounding box test if the label isn'T rotated
        //
        if( this.rotationAngle === 0){
            return this._super(x,y); 
        }
        
        // rotate the box with the current matrix of the
        // shape
        var matrix = this.shape.matrix;
        var points = this.getBoundingBox().getVertices();
        points.each(function(i,point){
            var x = matrix.x(point.x,point.y);
            var y = matrix.y(point.x,point.y);
            point.x=x;
            point.y=y;
        });

        var polySides=4;
        var i=0;
        var j=polySides-1 ;
        var oddNodes=false;

        for (i=0; i<polySides; i++) {
            var pi = points.get(i);
            var pj = points.get(j);
            if ((pi.y< y && pj.y>=y
            ||   pj.y< y && pi.y>=y)
            &&  (pi.x<=x || pj.x<=x)) {
              if (pi.x+(y-pi.y)/(pj.y-pi.y)*(pj.x-pi.x)<x) {
                oddNodes=!oddNodes; }}
            j=i; }
        return oddNodes; 
     },
     

     /**
      * @method 
      * Return an objects with all important attributes for XML or JSON serialization
      * 
      * @returns {Object}
      */
     getPersistentAttributes: function()
     {
         var memento = this._super();
         
         memento.text = this.text;
         memento.outlineStroke = this.outlineStroke;
         memento.outlineColor = this.outlineColor.hash();
         memento.fontSize = this.fontSize;
         memento.fontColor = this.fontColor.hash();
         memento.fontFamily = this.fontFamily;

         if(this.editor !==null){
             memento.editor = this.editor.NAME;
         }
         return memento;
     },
     
     /**
      * @method 
      * Read all attributes from the serialized properties and transfer them into the shape.
      * 
      * @param {Object} memento
      * @returns 
      */
     setPersistentAttributes: function(memento)
     {
         this._super(memento);
         if(typeof memento.text !=="undefined"){
             this.setText(memento.text);
         }
         if(typeof memento.outlineStroke !=="undefined"){
             this.setOutlineStroke(memento.outlineStroke);
         }
         if(typeof memento.outlineColor !=="undefined"){
             this.setOutlineColor(memento.outlineColor);
         }
         if(typeof memento.fontFamily !=="undefined"){
             this.setFontFamily(memento.fontFamily);
         }
         if(typeof memento.fontSize !=="undefined"){
             this.setFontSize(memento.fontSize);
         }
         if(typeof memento.fontColor !=="undefined"){
             this.setFontColor(memento.fontColor);
         }

         if(typeof memento.editor === "string"){
             this.installEditor( eval("new "+memento.editor+"()"));
         }
     }

});



