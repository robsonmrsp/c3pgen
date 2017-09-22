
/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************/

/**
 * @class draw2d.layout.connection.ConnectionRouter
 * Routes a {@link draw2d.Connection}, possibly using a constraint.
 *
 * @author Andreas Herz
 */
draw2d.layout.connection.ConnectionRouter = Class.extend({
    NAME : "draw2d.layout.connection.ConnectionRouter",

	/**
	 * @constructor 
	 * Creates a new Router object
	 */
    init: function()
    {
    },
    
    
    /**
     * @method
     * Routes the Connection.
     *
     * @param {draw2d.Connection} connection The Connection to route
     * @param {draw2d.util.ArrayList} oldVertices old/existing vertices of the Connection
     * @param {Object} [routingHints] some helper attributes for the router
     * @param {Boolean} [routingHints.startMoved] is true if just the start location has moved
     * @param {Boolean} [routingHints.endMoved] is true if the destination location has changed
     * @param {draw2d.util.ArrayList} [routingHints.oldVertices] the vertices before the reroute has been triggered
     *
     * @template
     */
    route: function( connection, routingHints)
    {
    	throw "subclasses must implement the method [ConnectionRouter.route]";
    },
    
    _paint: function(conn)
    {
        // calculate the path string for the SVG rendering
        // Important: to avoid subpixel error rendering we add 0.5 to each coordinate
        //            With this offset the canvas can paint the line on a "full pixel" instead
        //            of subpixel rendering.
        var ps = conn.getVertices();
        var p = ps.get(0);
        var radius = conn.getRadius();
        var path = ["M",(p.x|0)+0.5," ",(p.y|0)+0.5];
        var i=1;
        var length,inset, p2;
        if(radius>0){
            var lastP = p;
            length = (ps.getSize()-1);
            for(  ;i<length;i++){
                  p = ps.get(i);
                  inset = draw2d.geo.Util.insetPoint(p,lastP, radius);
                  path.push("L", (inset.x|0)+0.5, ",", (inset.y|0)+0.5);
    
                  p2 = ps.get(i+1);
                  inset = draw2d.geo.Util.insetPoint(p,p2,radius);
                  
                  path.push("Q",p.x,",",p.y," ", (inset.x|0)+0.5, ", ", (inset.y|0)+0.5);
                  lastP = p;
            }
            p = ps.get(i);
            path.push("L", (p.x|0)+0.5, ",", (p.y|0)+0.5);
       }
        else{
            length = ps.getSize();
            for( ;i<length;i++){
                p = ps.get(i);
                path.push("L", (p.x|0)+0.5, ",", (p.y|0)+0.5);
          }
        }
         conn.svgPathString = path.join("");
     },

     

    /**
     * @method
     * Callback method if the router has been assigned to a connection.
     * 
     * @param {draw2d.shape.basic.PolyLine} connection The assigned connection
     * @template
     * @since 2.7.2
     */
    onInstall: function(connection)
    {
    },
    
    /**
     * @method
     * Callback method if the router has been removed from the connection.
     * 
     * @param {draw2d.shape.basic.PolyLine} connection The related connection
     * @template
     * @since 2.7.2
     */
    onUninstall: function(connection)
    {
    },
    
    /**
     * @method
     * Callback method for the PolyLine or Connection to check if it possible to remove a vertex from
     * the list. The router can send an veto for this.
     * Per default it is not possible to remove any vertex from the PolyLine exceptional if any interactive
     * router is installed.
     * 
     * @param {Number} index
     * @since 4.2.3
     */
    canRemoveVertexAt: function(index)
    {
        return false;
    },
    
    /**
     * Callback method for the PolyLine or Connection to verify that a segment is deletable.
     *
     * @param {Number} index
     * @returns {Boolean}
     * @since 4.2.3
     */
    canRemoveSegmentAt: function(index)
    {
        return false;
    },
    
    /**
     * @method 
     * Tweak or enrich the polyline persistence data with routing information
     * 
     * @since 2.10.0
     * @param {draw2d.shape.basic.PolyLine} line
     * @param {Object} memento The memento data of the polyline
     * @returns {Object}
     */
    getPersistentAttributes: function(line, memento)
    {   
        return memento;
    },
    
    /**
     * @method 
     * set the attributes for the polyline with routing information
     * 
     * @since 2.10.0
     * @param {Object} memento the JSON data to read
     */
    setPersistentAttributes: function(line, memento)
    {
    },

    /**
     * @method
     *
     * The draw2d.Connection delegates the drag operation to the router. The router can
     * handle the different constraints of the connection.
     *
     * @param {Number} dx the x difference between the start of the drag drop operation and now
     * @param {Number} dy the y difference between the start of the drag drop operation and now
     * @param {Number} dx2 The x diff since the last call of this dragging operation
     * @param {Number} dy2 The y diff since the last call of this dragging operation
     */
    onDrag: function(line, dx, dy, dx2, dy2)
    {
    },

    /**
     * @methid
     * Called by the connection if the vertices set outside.
     * This enforce the router to avoid full autoroute. E.g. InteractiveManhattanRouter
     *
     * @protected
     * @param {draw2d.shape.basic.Line}
     */
    verticesSet: function(line)
    {
    }
    
});