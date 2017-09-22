
/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************/
/**
 * @class draw2d.shape.basic.LineResizeHandle
 * Base class for selection handle for connections and normal lines.
 * 
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.basic.Circle
 */
draw2d.shape.basic.LineResizeHandle = draw2d.shape.basic.Circle.extend({
    NAME : "draw2d.shape.basic.LineResizeHandle",

    init: function(figure, index)
    {
        this._super();
        this.owner = figure;
        this.index = index;

        // required in the SelectionEditPolicy to indicate the type of figure
        // which the user clicks
        this.isResizeHandle=true;
         
        if (draw2d.isTouchDevice) {
            this.setDimension(20, 20);
        }
        else {
            this.setDimension(10, 10);
        }

        this.setBackgroundColor("#5bcaff");
        this.setStroke(1);
        this.setSelectable(false);

        this.currentTarget = null;
    },

    /**
     * @inheritdoc
     */
    createShapeElement: function()
    {
        var shape= this._super();
        
        shape.attr({"cursor":"move"});
        return shape;
     },
     
     /**
      * @inheritdoc
      **/
      setBackgroundColor: function(color)
      {
          color = new draw2d.util.Color(color);
          
          this.bgGradient= "r(.4,.3)"+color.hash()+"-"+color.darker(0.1).hash()+":60-"+color.darker(0.2).hash();
          this._super(color);
          this.setColor(color.darker(0.3));
          
          return this;
      },
   
    
    /**
     * @method
     * Return the port below the ResizeHandle.
     * 
     * @template
     * @return {draw2d.Port}
     */
    getRelatedPort: function()
    {
      return null;
    },
    

    /**
     * @method
     * Return the port of the other side of the related connection.
     * 
     * @template
     * @return {draw2d.Port}
     */
    getOppositePort: function()
    {
      return null;
    },
    
    
    /**
     * @inheritdoc
     */
    repaint: function(attributes)
    {
        if(this.repaintBlocked===true || this.shape===null){
            return;
        }
        
        attributes= attributes || {};

        
        if(this.bgColor.hash()==="none"){
            attributes.fill=this.bgColor.hash();
        }
        else if(this.getAlpha()<0.9){
            attributes.fill=this.bgColor.hash();
        }
        else{
            attributes.fill=this.bgGradient;
        }
        
        
        this._super(attributes);
    },

    /**
     * Called if the drag and drop action beginns. You can return [false] if you
     * want avoid the that the figure can be move.
     *
     * @param {Number} x the x-coordinate of the mouse up event
     * @param {Number} y the y-coordinate of the mouse up event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @type {Boolean}
     **/
    onDragStart: function(x, y, shiftKey, ctrlKey)
    {
        this.command = this.owner.createCommand(new draw2d.command.CommandType(draw2d.command.CommandType.MOVE_BASEPOINT));
        // no drag&drop allowed if we didn'T have a valid command.
        // This is one way to send a veto for Connection reconnect
        if(this.command !==null){
            this.command.setIndex(this.index);
        }

        this.setAlpha(0.2);
        this.shape.attr({"cursor":"crosshair"});

        // fire an event
        // @since 5.3.3
        this.fireEvent("dragstart",{x:x, y:y, shiftKey:shiftKey, ctrlKey:ctrlKey});

        return true;
    },
    
     
    /**
     * @method
     * Called from the framework during a drag&drop operation
     * 
     * @param {Number} dx the x difference between the start of the drag drop operation and now
     * @param {Number} dy the y difference between the start of the drag drop operation and now
     * @param {Number} dx2 The x diff since the last call of this dragging operation
     * @param {Number} dy2 The y diff since the last call of this dragging operation
     * @return {Boolean}
     * @private
     **/
    onDrag: function(dx, dy, dx2, dy2)
    {
        this.setPosition(this.x + dx2, this.y + dy2);

        var port = this.getOppositePort();

        var target = port!==null?port.getCanvas().getBestFigure(this.getX(), this.getY(), [this, this.owner]): null;

        // the hovering element has been changed
        if (target !== this.currentTarget) {

            if (this.currentTarget !== null) {
                this.currentTarget.onDragLeave(port);
                this.currentTarget.setGlow(false);
                this.currentTarget.fireEvent("dragLeave", {draggingElement:port});
            }

            if (target !== null) {
                this.currentTarget = target.delegateTarget(port);
                if(this.currentTarget!==null){
                    this.currentTarget.setGlow(true);
                    this.currentTarget.onDragEnter(port); // legacy
                    this.currentTarget.fireEvent("dragEnter", {draggingElement:port});
                }
            }
        }

        return true;
    },
    
    /**
     * @method Called after a drag and drop action.<br>
     *         Sub classes can override this method to implement additional stuff. Don't forget to call the super implementation via <code>this._super();</code>
     *         
     * @param {Number} x the x-coordinate of the mouse event
     * @param {Number} y the y-coordinate of the mouse event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * 
     * @return {Boolean}
     */
    onDragEnd: function( x, y, shiftKey, ctrlKey)
    {
        if (!this.isDraggable()) {
            return false;
        }

        this.shape.attr({"cursor":"move"});
 
        var port = this.getOppositePort();
        if (port !== null) {
            if (this.currentTarget !== null) {
                
                this.onDrop(this.currentTarget, x, y, shiftKey, ctrlKey);
                this.currentTarget.onDragLeave(port);
                this.currentTarget.setGlow(false);
                this.currentTarget.fireEvent("dragLeave", {draggingElement:port});
                this.currentTarget.onCatch(this, x, y, shiftKey, ctrlKey);
                this.currentTarget = null;
            }
        }
        
        this.owner.isMoving=false;
        // A Connection is stuck to the corresponding ports. So we must reset the position
        // to the origin port if we doesn't drop the ResizeHandle on a other port.
        //
        if (this.owner instanceof draw2d.Connection) {
            if (this.command !== null) {
                this.command.cancel();
            }
        }
        //
        else {
            // An non draggable resizeHandle doesn't create a move/resize command.
            // This happens if the selected figure has set "isResizeable=false".
            //
            if (this.command !== null) {
                this.getCanvas().getCommandStack().execute(this.command);
            }
        }
        this.command = null;

        this.setAlpha(1);

        // fire an event
        // @since 5.3.3
        this.fireEvent("dragend",{x:x, y:y, shiftKey:shiftKey, ctrlKey:ctrlKey});
    },


    /**
     * @method
     * Controls the position of the ResizeHandle
     * Called by the framework.
     *
     **/
    relocate: function()
    {

        return this;
    },
    
    
    /**
     * @method
     * The LineResizeHandle didn't support the SnapToHelper feature if the
     * corresponding object is an Connection. A Connection is always bounded to
     * Port. In this case it makes no sense to use a Grid or Geometry for snapping.
     *
     * @return {Boolean} return false if the corresponding object didn't support snapTo
     **/
    supportsSnapToHelper: function()
    {
      if(this.owner instanceof draw2d.Connection){
        return false;
      }
        
      return true;
    },
    
    /**
     * @method
     * Show the ResizeHandle and add it to the canvas.<br>
     * Additional bring it in to the front of other figures.
     *
     * @param {draw2d.Canvas} canvas the canvas to use
     * @param {Number} x the x-position
     * @param {Number} y the y-position
     **/
    show: function(canvas, x, y)
    {
      // don't call the parent function. The parent functions make this object selectable/deleteable
      // and a resize handle can't be deleted.
      this.setCanvas(canvas);
 //     this.setPosition(x,y);
      this.shape.toFront();
      this.canvas.resizeHandles.add(this);
    },
    
    /**
     * @method
     * Hide the resize handle and remove it from the canvas.
     *
     **/
    hide: function()
    {
      // don't call the parent function. The parent functions delete this object
      // and a resize handle shouldn't be deleted.
      if(this.shape===null){
        return;
      }
      
      this.canvas.resizeHandles.remove(this);
      this.setCanvas(null);
    },
    
    /**
     * @method
     * Override this method and redirect them to the canvas. A ResizeHandle didn't support
     * Keyboard interaction at the moment.
     *
     * @param {Number} keyCode the id of the pressed key
     * @param {Boolean} ctrl true if the user has pressed the CTRL/STRG key as well.
     **/
    onKeyDown: function(keyCode, ctrl)
    {
      // don't call the parent function. The parent functions delete this object
      // and a resize handle can't be deleted.
      this.canvas.onKeyDown(keyCode,ctrl);
    }
});