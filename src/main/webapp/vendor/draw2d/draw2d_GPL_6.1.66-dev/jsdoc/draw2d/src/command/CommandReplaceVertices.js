
/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************/

/**
 * @class draw2d.command.CommandReplaceVertices
 * 
 * Replace the vertices of a polyline.
 *
 * @inheritable
 * @author Andreas Herz
 * 
 * @extends draw2d.command.Command
 */
draw2d.command.CommandReplaceVertices = draw2d.command.Command.extend({
    NAME : "draw2d.command.CommandReplaceVertices", 
  
    /**
     * @constructor
     * Create a new Command objects which add a segment to a PolyLine / Polygon.
     *
     * @param {draw2d.shape.basic.PolyLine} line the related line
     * @param {draw2d.util.ArrayList} originalVertices the original vertices of the polyline
     * @param {draw2d.util.ArrayList} newVertices the new vertices of the polyline
     */
    init: function(line, originalVertices, newVertices)
    {
        this._super(draw2d.Configuration.i18n.command.addSegment);
        
        this.line = line;
        this.originalVertices = originalVertices;
        this.newVertices = newVertices;
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
      return true;
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
     *
     * Undo the move command
     *
     **/
    undo: function()
    {
        this.line.setVertices(this.originalVertices);
    },
    
    /**
     * @method
     * 
     * Redo the move command after the user has undo this command
     *
     **/
    redo: function()
    {
        this.line.setVertices(this.newVertices);
    }
});