
/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************/

/**
 * @class draw2d.layout.connection.RubberbandRouter
 * Router for direct connections between two ports with a rubber band effect
 * 
 * See the example:
 *
 *     @example preview small frame
 *
 *     var RubberConnection= draw2d.Connection.extend({
 *         NAME: "RubberConnection",
 *
 *         init:function(attr, setter, getter)
 *         {
 *           this._super($.extend({
 *               color: "#33691e",
 *               stroke:1,
 *               outlineStroke:0,
 *               outlineColor:null
 *           },attr),
 *           setter,
 *           getter);
 *
 *
 *           this.setRouter(new draw2d.layout.connection.RubberbandRouter());
 *         },
 *
 *         repaint:function(attributes)
 *         {
 *             if (this.repaintBlocked===true || this.shape === null){
 *                 return;
 *             }
 *             attributes= attributes || {};
 *             // enrich the rendering with a "fill" attribute
 *             if(typeof attributes.fill === "undefined"){
 *             	   attributes.fill = "#aed581";
 *             }
 *             this._super(attributes);
 *        }
 *     });
 *
 *     var createConnection=function(){
 *        var con = new RubberConnection();
 *        return con;
 *     };
 *
 *     // install a custom connection create policy
 *     //
 *     canvas.installEditPolicy(  new draw2d.policy.connection.DragConnectionCreatePolicy({
 *            createConnection: createConnection
 *     }));
 *
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
draw2d.layout.connection.RubberbandRouter = draw2d.layout.connection.ConnectionRouter.extend({

    NAME : "draw2d.layout.connection.RubberbandRouter",

    /**
	 * @constructor 
	 * Creates a new Router object
	 */
    init: function(){
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
    onInstall: function(connection){
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
       var thickness = 10;
       
       var start  = connection.getStartPoint();
       var end    = connection.getEndPoint();
       
       // 1. Calculate the vector AB→ by subtracting the coordinates of A from the coordinates of B. 
       //    Let's say you get (u,v) as the vector components.
       //
       // 2. normalize the vector (u,v,) to a length of |1|
       //
       // 3. The vector (−v,u) is AB→ rotated by 90 degrees counterclockwise. (Why? Look up "rotation matrix").
       //
       // 4. Add (−v,u) to A to get C. Also add (−v,u) to B to get D.

       var uv = end.subtract(start);
       var uv2 = uv.clone();
       var length = uv.length();

       var strength = 1-Math.min(0.75,(1/500*length)); 
       var first  = start.lerp(end,0.25*strength);     // go closer to the start point if the strength grows
       var second = start.lerp(end,0.5);
       var third  = start.lerp(end,1-(0.25*strength)); // go closer to the end point if the strengths grows

       thickness = Math.max(5,thickness *strength); 
       
       uv.x = uv.x/length*thickness;
       uv.y = uv.y/length*thickness;

       uv2.x = uv2.x/length*(thickness*(strength));
       uv2.y = uv2.y/length*(thickness*(strength));

       // anchor points for the 180 arc at the start point of the connection
       //
       var start90  = new draw2d.geo.Point(-uv.y+start.x, uv.x+start.y);
       var start270 = new draw2d.geo.Point( uv.y+start.x,-uv.x+start.y);
       
       // anchor point in the first segment ( on the upside/downside) of the connection
       //
       var first90   = new draw2d.geo.Point(-uv2.y+first.x, uv2.x+first.y);
       var first270  = new draw2d.geo.Point( uv2.y+first.x,-uv2.x+first.y);
       
       // center upside/downside anchor point of the connection
       //
       var second90  = new draw2d.geo.Point(-uv2.y+second.x, uv2.x+second.y);
       var second270 = new draw2d.geo.Point( uv2.y+second.x,-uv2.x+second.y);
       
       // anchor point in the third segment of the connection
       //
       var third90   = new draw2d.geo.Point(-uv2.y+third.x, uv2.x+third.y);
       var third270  = new draw2d.geo.Point( uv2.y+third.x,-uv2.x+third.y);

       // anchor point for the 180 arc at the end
       //
       var end90  = new draw2d.geo.Point(-uv.y+end.x, uv.x+end.y);
       var end270 = new draw2d.geo.Point( uv.y+end.x,-uv.x+end.y);

       // required for hit tests
       //
       connection.addPoint(start);
       connection.addPoint(end);
       
       // calculate the path
       var path = ["M",start90.x,",",start90.y];
       path.push("A", thickness,",", thickness, "0 0 1 ", start270.x,",",start270.y);
       path.push("C", start270.x,",", start270.y, first270.x,",", first270.y, second270.x,",",second270.y);
       path.push("C", second270.x,",", second270.y, third270.x,",", third270.y, end270.x,",",end270.y);
       path.push("A", thickness,",", thickness, "0 0 1", end90.x,",",end90.y);
       path.push("C", end90.x,",", end90.y, third90.x,",", third90.y, second90.x,",",second90.y);
       path.push("C", second90.x,",", second90.y, first90.x,",", first90.y, start90.x,",",start90.y);
       
       connection.svgPathString = path.join(" ");
    }
});
