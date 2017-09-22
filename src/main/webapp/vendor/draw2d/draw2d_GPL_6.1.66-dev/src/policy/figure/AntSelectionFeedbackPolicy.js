
/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************/

/**
 * @class draw2d.policy.figure.AntSelectionFeedbackPolicy 
 * 
 * Provide support for selecting and positioning a non-resizable figure. 
 * Selection is indicated via rectangular handle that outlines the figure with a 1-pixel black 
 * dotted line. 
 * 
 * See the example:
 *
 *     @example preview small frame
 *       circle =new draw2d.shape.basic.Circle({diameter:50, x:90, y:50});
 *       circle.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
 *       canvas.add(circle);
 *
 *       canvas.add(new draw2d.shape.basic.Label({text:"Click on the circle to see the selection feedback"}),20,10);
 *       
 * @author Andreas Herz
 * @extends draw2d.policy.figure.SelectionFeedbackPolicy
 */
draw2d.policy.figure.AntSelectionFeedbackPolicy = draw2d.policy.figure.SelectionFeedbackPolicy.extend({

    NAME : "draw2d.policy.figure.AntSelectionFeedbackPolicy",
    
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
     * Called by the framework of the Policy should show a resize handle for the given shape
     *
     * @param {draw2d.Canvas} canvas the responsible canvas
     * @param {draw2d.Figure} figure the figure to decorate with a selection feedback
     * @param {Boolean} [isPrimarySelection]
     */
    onSelect: function(canvas, figure, isPrimarySelection)
    {
        if (figure.selectionHandles.isEmpty()) {
            var box = new draw2d.shape.basic.Rectangle({bgColor:null, dasharray:"- ", color:"#2C70FF"});
            box.hide= function(){
                // IMPORTANT
                // don't add/remove this rectangle to the canvas resizeHandles. This rect isn't responsible for any hitTest or
                // dragDrop operation
                //canvas.resizeHandles.remove(box);
                box.setCanvas(null);
            };
            box.show= function(canvas){
                box.setCanvas(canvas);
                // IMPORTANT
                // don't add/remove this rectangle to the canvas resizeHandles. This rect isn't responsible for any hitTest or
                // dragDrop operation
                //canvas.resizeHandles.remove(box);
                //canvas.resizeHandles.add(box);
                box.shape.toFront();
            };
            box.show(canvas);
            figure.selectionHandles.add(box);

            // add a bee line to the parent if a parent is given and if the bounding box
            // of the parent and the figure didn't have intersections
            if(figure.getParent()!==null){
                var line = new draw2d.shape.basic.Line({opacity:0.5, bgColor:null, dasharray:"- ", color:"#2C70FF"});
                //line.setStartPosition(figure.getBoundingBox().getCenter());
                //line.setEndPosition(figure.getParent().getBoundingBox().getCenter());
                line.show= function(canvas) {
                    line.setCanvas(canvas);
                };
                line.hide= function(){
                    line.setCanvas(null);
                };
                line.show(canvas);
                figure.selectionHandles.add(line);
                this._updateBeeLine(line, figure);
            }
        }
        this.moved(canvas, figure);
   },
    
    
    /**
     * @method
     * Callback if the figure has been moved
     * 
     * @param figure
     * 
     * @template
     */
    moved: function(canvas, figure)
    {
        if(figure.selectionHandles.isEmpty()){
            return; // silently
        }
        var box= figure.selectionHandles.first();
        box.setPosition(figure.getAbsolutePosition().translate(-2.5,-2.5));
        box.setDimension(figure.getWidth()+4, figure.getHeight()+4);
        box.setRotationAngle(figure.getRotationAngle());

        if(figure.selectionHandles.getSize()>1){
            var line = figure.selectionHandles.get(1);
            this._updateBeeLine( line, figure);
        }
    },

    /**
     *
     * @param {draw2d.shape.basic.Line} line
     * @param {draw2d.Figure} figure
     * @private
     */
    _updateBeeLine: function(line, figure){
        var parent = figure.getParent();

        if(parent===null){
            return;
        }

        if(parent instanceof draw2d.shape.basic.Line){
            var center =figure.getBoundingBox().getCenter();
            var projection= parent.pointProjection(center);
            if(projection===null){
                var p1= line.getStartPosition();
                var p2= line.getEndPosition();
                var d1= center.distance(p1);
                var d2= center.distance(p1);
                projection=d1<d2?p1:p2;
            }
            var intersection =figure.getBoundingBox().intersectionWithLine(center, projection);
            if(intersection.getSize()>0) {
                line.setStartPosition(figure.getBoundingBox().intersectionWithLine(center, projection).get(0))
                    .setEndPosition(projection);
            }
            else{
                line.setStartPosition(figure.getBoundingBox().getCenter())
                    .setEndPosition(projection);
            }
        }
        else {
            var rect1 = figure.getBoundingBox(),
                rect2 = parent.getBoundingBox();

            var center1 = rect1.getCenter();
            var center2 = rect2.getCenter();
            // the rectangle overlaps -> return the center of booth
            if (rect1.intersects(rect2)) {
                line.setStartPosition(center1)
                    .setEndPosition(center2);
            }
            // one rect is inside the other rect
            //
            else if (rect1.hitTest(center2) || rect2.hitTest(center1)) {
                line.setStartPosition(center1)
                    .setEndPosition(center2);
            }
            else {
                rect1.scale(3, 3);
                rect2.scale(3, 3);

                line.setStartPosition(rect1.intersectionWithLine(center1, center2).get(0))
                    .setEndPosition(rect2.intersectionWithLine(center1, center2).get(0));
            }
        }
    }
}); 