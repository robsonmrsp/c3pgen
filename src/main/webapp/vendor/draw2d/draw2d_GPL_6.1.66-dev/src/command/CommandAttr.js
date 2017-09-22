
/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************/

/**
 * @class draw2d.command.CommandAattr
 * 
 *Command to change attributes of a shape with undo/redo support
 *
 * @inheritable
 * @author Andreas Herz
 * 
 * @extends draw2d.command.Command
 */
draw2d.command.CommandAttr = draw2d.command.Command.extend({
    NAME : "draw2d.command.CommandAttr",
  
    /**
     * @constructor
     * Create a new Command objects which provides undo/redo for attributes.
     *
     * @param {draw2d.Figure} figure the figure to handle
     * @param {Number} x the x coordinate for the new vertex
     * @param {Number} y the y coordinate for the new vertex
     */
    init: function(figure, newAttributes)
    {
        var _this = this;

        this._super(draw2d.Configuration.i18n.command.changeAttributes);


        this.figure = figure;
        this.newAttributes = newAttributes;
        this.oldAttributes = {};
        $.each(newAttributes, function(key, value){
            _this.oldAttributes[key] = figure.attr(key);
        });
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
        this.figure.attr(this.oldAttributes);
    },
    
    /**
     * @method
     * 
     * Redo the move command after the user has undo this command
     *
     **/
    redo: function()
    {
        this.figure.attr(this.newAttributes);
    }
});