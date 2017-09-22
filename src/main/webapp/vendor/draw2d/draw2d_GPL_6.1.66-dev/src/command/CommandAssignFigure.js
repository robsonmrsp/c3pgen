
/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************/

/**
 * @class draw2d.command.CommandAssignFigure
 * 
 * Assign a figure to a compiste
 *
 * @author Andreas Herz
 * 
 * @extends draw2d.command.Command
 * @since 4.9.0
 */
draw2d.command.CommandAssignFigure = draw2d.command.Command.extend({
    NAME : "draw2d.command.CommandAssignFigure", 
  
    /**
     * @constructor
     * Create a new Command objects which can be execute via the CommandStack.
     *
     * @param {draw2d.Figure} figure the figure to assign
     * @param {draw2d.Figure} composite the composite where the figure should assign
     */
    init: function(figure, composite)
    {
        this._super(draw2d.Configuration.i18n.command.assignShape);
        
        this.figure    = figure;
        this.composite = composite;
        this.assignedConnections = new draw2d.util.ArrayList();
        this.isNode = this.figure instanceof draw2d.shape.node.Node;
        this.oldBoundingBox = composite.getBoundingBox();
        this.newBoundingBox = null; // see execute/redo
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
        this.composite.assignFigure(this.figure);
        this.newBoundingBox = this.composite.getBoundingBox();
        
        // get all connections of the shape and check if source/target node
        // part of the composite. In this case the connection will be part of
        // the composite as well
        if(this.isNode===true){
            var connections = this.figure.getConnections();
            var _this = this;
            connections.each(function(i, connection){
                if(connection.getSource().getParent().getComposite()===_this.composite && connection.getTarget().getParent().getComposite()===_this.composite){
                    if(connection.getComposite()!==_this.composite){
                        _this.assignedConnections.add({oldComposite:connection.getComposite(), connection:connection});
                        _this.composite.assignFigure(connection);
                    }
                }
            });
        }
    },
    
    /**
     * @method
     *
     * Undo the move command
     *
     **/
    undo: function()
    {
       this.composite.unassignFigure(this.figure);
       this.assignedConnections.each(function(i, entry){
           if(entry.oldComposite!==null){
               entry.oldComposite.assignFigure(entry.connection);
           }
           else{
               entry.connection.getComposite().unassignFigure(entry.connection);
           }
       });
       this.composite.stickFigures=true;
       this.composite.setBoundingBox(this.oldBoundingBox);
       this.composite.stickFigures=false;
    },
    
    /**
     * @method
     * 
     * Redo the move command after the user has undo this command
     *
     **/
    redo: function()
    {
       this.composite.setBoundingBox(this.oldBoundingBox);
       this.composite.assignFigure(this.figure);
       var _this=this;
       this.assignedConnections.each(function(i, entry){
           _this.composite.assignFigure(entry.connection);
       });
    }
});





