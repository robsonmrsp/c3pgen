
/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************/

/**
 * @class draw2d.policy.canvas.ZoomPolicy
 * Generic zoom policy installable into a canvas object.
 * This is the legacy implementation of the very first zooming in
 * Draw2D. You can use this implementation if you want backward compatible.
 * 
 *
 * @author Andreas Herz
 * @extends draw2d.policy.canvas.CanvasPolicy
 * @since 5.8.0
 */
draw2d.policy.canvas.ZoomPolicy = draw2d.policy.canvas.CanvasPolicy.extend({

    NAME : "draw2d.policy.canvas.ZoomPolicy",
    
    /**
     * @constructor 
     */
    init: function()
    {
        this._super();
    },

    onInstall: function(canvas)
    {
        this._super(canvas);
        canvas.setZoom(1);
    },

    onUninstall: function(canvas)
    {
        this._super(canvas);
    },

    /** @method
    * Set the new zoom factor for the canvas. The value must be between [0.01..10]
    *
    *      // you can register an eventhandler to listen to the zoom factor of the canvas.
     *     //
    *      canvas.on("zoom", function(emitterFigure, zoomData){
    *          alert("canvas zoomed to:"+zoomData.factor);
    *      });
    *
    * @param {Number} zoomFactor new zoom factor.
    * @param {Boolean} [animated] set it to true for smooth zoom in/out
    **/
    setZoom: function( zoomFactor, animated)
    {
        var canvas = this.canvas;

        var _zoom = function(z){
            canvas.zoomFactor = Math.min(Math.max(0.01,z),10);

            var viewBoxWidth  = (canvas.initialWidth*(canvas.zoomFactor))|0;
            var viewBoxHeight = (canvas.initialHeight*(canvas.zoomFactor))|0;

            canvas.paper.setViewBox(0, 0, viewBoxWidth, viewBoxHeight);

            canvas.fireEvent("zoom", {value:canvas.zoomFactor});
        };

        if(animated){
            var myTweenable = new Tweenable();
            myTweenable.tween({
                from:     { 'x': canvas.zoomFactor  },
                to:       { 'x': zoomFactor },
                duration: 300,
                easing : "easeOutSine",
                step: function (params) {
                    _zoom(params.x);
                },
                finish: function (state) {
                    canvas.fireEvent("zoomed", {value:canvas.zoomFactor});
                }
            });
        }
        else{
            _zoom(zoomFactor);
            canvas.fireEvent("zoomed", {value:canvas.zoomFactor});
        }
    }
});
