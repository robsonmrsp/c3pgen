
/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************/

/**
 * @class draw2d.layout.connection.DirectRouter
 *
 * Router for direct connections between two ports. Beeline
 * <br>
 * <br>
 * See the example:
 *
 *     @example preview small frame
 *
 *     var createConnection=function(){
 *        var con = new draw2d.Connection();
 *        con.setRouter(new draw2d.layout.connection.DirectRouter());
 *        return con;
 *     };
 *
 *     // install a custom connection create policy
 *     //
 *     canvas.installEditPolicy(  new draw2d.policy.connection.DragConnectionCreatePolicy({
 *            createConnection: createConnection
 *     }));
 *
 *     // create and add two nodes which contains Ports (In and OUT)
 *     //
 *     var start = new draw2d.shape.node.Start();
 *     var end   = new draw2d.shape.node.End();
        
 *     // ...add it to the canvas 
 *     canvas.add( start, 50,50);
 *     canvas.add( end, 230,80);
 *          
 *     // first Connection
 *     //
 *     var c = createConnection();
 *     c.setSource(start.getOutputPort(0));
 *     c.setTarget(end.getInputPort(0));
 *     canvas.add(c);
 * 
 * 
 * @inheritable
 * @author Andreas Herz
 * 
 * @extends  draw2d.layout.connection.ConnectionRouter
 */
draw2d.layout.connection.DirectRouter = draw2d.layout.connection.ConnectionRouter.extend({

    NAME : "draw2d.layout.connection.DirectRouter",

    /**
	 * @constructor 
	 * Creates a new Router object
	 */
    init: function()
    {
        this._super();
    },
    
    
    /**
     * @method
     * Callback method if the router has been assigned to a connection.
     * 
     * @param {draw2d.Connection} connection The assigned connection
     * @template
     * @since 2.7.2
     */
    onInstall: function(connection)
    {
        connection.installEditPolicy(new draw2d.policy.line.LineSelectionFeedbackPolicy());
    },


    /**
     * @method
     * Invalidates the given Connection
     */
    invalidate: function()
    {
    },


    /**
     * @inheritdoc
     */
    route: function( connection, routingHints)
    {
       var start =connection.getStartPoint();
       var end = connection.getEndPoint();
       
       // required for hit tests
       //
       connection.addPoint(start);
       connection.addPoint(end);
       
       // calculate the path
       var path = ["M",start.x," ",start.y];
       path.push("L", end.x, " ", end.y);

       connection.svgPathString = path.join("");
    }
});
