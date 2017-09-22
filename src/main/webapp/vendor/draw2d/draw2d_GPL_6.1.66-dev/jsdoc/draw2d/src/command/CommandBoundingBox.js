
/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************/

/**
 * @class draw2d.command.CommandBoundingBox
 * Set the bounding box of a figure with undo/redo support
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.command.Command
 */
draw2d.command.CommandBoundingBox = draw2d.command.Command.extend({
    NAME : "draw2d.command.CommandResize", 

    /**
     * @constructor
     * Create a new resize Command objects which can be execute via the CommandStack.
     *
     * @param {draw2d.Figure} figure the figure to resize
     * @param {draw2d.geo.Rectangle} boundingBox the new bounding box of the figure
     */
    init: function(figure, boundingBox)
    {
        this._super(draw2d.Configuration.i18n.command.resizeShape);
        this.figure = figure;
        this.oldBoundingBox = this.figure.getBoundingBox();
        this.newBoundingBox = boundingBox;
    },
  

    /**
     * @method
     * Returns [true] if the command can be execute and the execution of the
     * command modify the model. A CommandMove with [startX,startX] == [endX,endY] should
     * return false. <br>
     * the execution of the Command doesn't modify the model.
     *
     * @return {Boolean}
     **/
    canExecute: function()
    {
      // return false if we doesn't modify the model => NOP Command
      return !this.oldBoundingBox.equals(this.newBoundingBox);
    },
    
    /**
     * @method
     * Execute the command the first time
     * 
     **/
    execute: function()
    {
       this.redo();
    },
    
    /**
     * @method
     * Undo the command
     *
     **/
    undo: function()
    {
       this.figure.setBoundingBox(this.oldBoundingBox);
    },
    
    /**
     * @method
     * Redo the command after the user has undo this command
     *
     **/
    redo: function()
    {
        this.figure.setBoundingBox(this.newBoundingBox);
    }
});