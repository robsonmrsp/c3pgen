
/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************/

/**
 * @class draw2d.policy.canvas.ReadOnlySelectionPolicy
 * 
 *
 * @author Andreas Herz
 * @extends draw2d.policy.canvas.SelectionPolicy
 */
draw2d.policy.canvas.ReadOnlySelectionPolicy = draw2d.policy.canvas.SelectionPolicy.extend({

    NAME : "draw2d.policy.canvas.ReadOnlySelectionPolicy",
    
    /**
     * @constructor 
     * Creates a new Router object
     */
    init: function( attr, setter, getter)
    {
        this._super( attr, setter, getter);
    },
    
    /**
     * @method
     * Called by the host if the policy has been installed.
     * 
     * @param {draw2d.Canvas/draw2d.Canvas} canvas
     */
    onInstall: function(canvas)
    {
        this._super(canvas);
        canvas.getAllPorts().each(function(i,port){
            port.setVisible(false);
        });
    },
    
    /**
     * @method
     * Called by the host if the policy has been uninstalled.
     * 
     * @param {draw2d.Canvas} canvas
     */
    onUninstall: function(canvas)
    {
        canvas.getAllPorts().each(function(i,port){
            port.setVisible(true);
        });

        this._super(canvas);
    },
    
    /**
     * @method
     * 
     * @param {draw2d.Canvas} canvas
     * @param {Number} dx The x diff between start of dragging and this event
     * @param {Number} dy The y diff between start of dragging and this event
     * @param {Number} dx2 The x diff since the last call of this dragging operation
     * @param {Number} dy2 The y diff since the last call of this dragging operation
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @template
     */
    onMouseDrag: function(canvas, dx, dy, dx2, dy2, shiftKey, ctrlKey)
    {
        var area = canvas.getScrollArea();
        area.scrollTop(area.scrollTop()-dy2);
        area.scrollLeft(area.scrollLeft()-dx2);
    }
});
