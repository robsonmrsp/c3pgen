
/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************/
/**
 * @class draw2d.shape.composite.Group
 * 
 * A group is a figure that acts as a transparent container for other figures. A group 
 * is a StrongComposite node that controls a set of child figures. The bounding rectangle of 
 * a group is the union of the bounds of its children. Child nodes cannot be selected or 
 * manipulated individually.   
 * 
 *   
 * @author Andreas Herz
 * @extends draw2d.shape.composite.StrongComposite
 * @since 4.8.0
 */
draw2d.shape.composite.Group = draw2d.shape.composite.StrongComposite.extend({
    NAME : "draw2d.shape.composite.Group",

    /**
     * @constructor
     * Creates a new figure element which are not assigned to any canvas.
     * 
     * @param {Object} [attr] the configuration of the shape
     */
    init: function( attr, setter, getter) 
    {
        this._super($.extend({bgColor:null, color:null, resizeable:false},attr), setter, getter);

        // used during figure assignment/unassignment. The Group resizes during figure assignment
        // and we want avoid that already assigned figures are moving during this resize.
        //
        this.stickFigures = false;
    },

    
    /**
     * @method
     * Delegate method to calculate if a figure is selectable. A composite has the right to override the 
     * initial selectable flag of the figure.
     * 
     * @param {draw2d.Figure} figure the figure to test
     * @param {Boolean} selectable the initial selectable flag of the figure
     * @returns
     * 
     */
    isMemberSelectable: function( figure, selectable)
    {
        return false;
    },
    
    /**
     * @method
     * Delegate method to calculate if a figure is draggable. A composite has the right to override the 
     * initial draggable flag of the figure.
     * <br>
     * Returns false because only the complete group is draggable
     * 
     * @param {draw2d.Figure} figure the figure to test
     * @param {Boolean} draggable the initial draggable flag of the figure
     * @returns
     * 
     */
    isMemberDraggable: function( figure, draggable)
    {
        return false;
    },
 
    /**
     * @method
     * Set the position of the object.
     *
     * @param {Number/draw2d.geo.Point} x The new x coordinate of the figure
     * @param {Number} [y] The new y coordinate of the figure 
     **/
    setPosition: function(x, y)
    {
        var oldX = this.x;
        var oldY = this.y;
        
      
        this._super(x,y);
        
        var dx = this.x-oldX;
        var dy = this.y-oldY;
        
        if(dx ===0 && dy===0 ){
            return this;
        }

        if(this.stickFigures===false){
            this.assignedFigures.each(function(i,figure){
                figure.translate(dx,dy);
            });
        }
        
        return this;
    },
    
    /**
     * @method
     * Assign a figure to the given group.
     * The bounding box of the group is recalculated and the union of the current bounding box with the
     * figure bounding box.
     * 
     * @param {draw2d.Figure} figure
     */
    assignFigure: function(figure)
    {
        if(!this.assignedFigures.contains(figure)){
            var _this = this;
            this.stickFigures=true;
            if(this.assignedFigures.isEmpty()===true){
                this.setBoundingBox(figure.getBoundingBox());
            }
            else{
                this.setBoundingBox(this.getBoundingBox().merge(figure.getBoundingBox()));
            }
            this.assignedFigures.add(figure);
            figure.setComposite(this);
            // the selection adapter defines which figure should be selected if the user clicks on
            // "figure". The "group" redirects to the group instead to allowing select the child.
            figure.setSelectionAdapter(function(){
                return _this;
            });
            this.stickFigures=false;
        }
        return this;
    },
    
    /**
     * @method
     * Remove the given figure from the group assignment
     * 
     * @param {draw2d.Figure} figure the figure to remove
     * 
     */
    unassignFigure: function(figure)
    {
        if(this.assignedFigures.contains(figure)){
            this.stickFigures=true;
            figure.setComposite(null);
            figure.setSelectionAdapter(null);
            this.assignedFigures.remove(figure);
            if(!this.assignedFigures.isEmpty()){
                var box = this.assignedFigures.first().getBoundingBox();
                this.assignedFigures.each(function(i,figure){
                    box.merge(figure.getBoundingBox());
                });
                this.setBoundingBox(box);
            }
            this.stickFigures=false;
        }

        return this;
    },

    /**
     * @inheritDoc
     */
    createCommand: function( request)
    {
        if(request===null){
            return null;
        }

        if(request.getPolicy() === draw2d.command.CommandType.DELETE)
        {
            if(!this.isDeleteable()){
                return null;
            }
            return new draw2d.command.CommandDeleteGroup(this);
        }

        return this._super(request);
    }

});






