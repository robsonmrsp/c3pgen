Ext.data.JsonP.draw2d_layout_connection_ManhattanConnectionRouter({"tagname":"class","name":"draw2d.layout.connection.ManhattanConnectionRouter","autodetected":{},"files":[{"filename":"ManhattanConnectionRouter.js","href":"ManhattanConnectionRouter.html#draw2d-layout-connection-ManhattanConnectionRouter"}],"inheritable":true,"author":[{"tagname":"author","name":"Andreas Herz","email":null}],"extends":"draw2d.layout.connection.ConnectionRouter","members":[{"name":"constructor","tagname":"method","owner":"draw2d.layout.connection.ManhattanConnectionRouter","id":"method-constructor","meta":{}},{"name":"_route","tagname":"method","owner":"draw2d.layout.connection.ManhattanConnectionRouter","id":"method-_route","meta":{"private":true}},{"name":"canRemoveSegmentAt","tagname":"method","owner":"draw2d.layout.connection.ConnectionRouter","id":"method-canRemoveSegmentAt","meta":{}},{"name":"canRemoveVertexAt","tagname":"method","owner":"draw2d.layout.connection.ConnectionRouter","id":"method-canRemoveVertexAt","meta":{}},{"name":"getPersistentAttributes","tagname":"method","owner":"draw2d.layout.connection.ConnectionRouter","id":"method-getPersistentAttributes","meta":{}},{"name":"onDrag","tagname":"method","owner":"draw2d.layout.connection.ConnectionRouter","id":"method-onDrag","meta":{}},{"name":"onInstall","tagname":"method","owner":"draw2d.layout.connection.ManhattanConnectionRouter","id":"method-onInstall","meta":{}},{"name":"onUninstall","tagname":"method","owner":"draw2d.layout.connection.ConnectionRouter","id":"method-onUninstall","meta":{"template":true}},{"name":"route","tagname":"method","owner":"draw2d.layout.connection.ManhattanConnectionRouter","id":"method-route","meta":{}},{"name":"setPersistentAttributes","tagname":"method","owner":"draw2d.layout.connection.ConnectionRouter","id":"method-setPersistentAttributes","meta":{}},{"name":"verticesSet","tagname":"method","owner":"draw2d.layout.connection.ConnectionRouter","id":"method-verticesSet","meta":{"protected":true}}],"alternateClassNames":[],"aliases":{},"id":"class-draw2d.layout.connection.ManhattanConnectionRouter","short_doc":"Provides a draw2d.Connection with an orthogonal route between the Connection's source\nand target anchors. ...","component":false,"superclasses":["draw2d.layout.connection.ConnectionRouter"],"subclasses":["draw2d.layout.connection.CircuitConnectionRouter","draw2d.layout.connection.InteractiveManhattanConnectionRouter","draw2d.layout.connection.ManhattanBridgedConnectionRouter","draw2d.layout.connection.MuteableManhattanConnectionRouter","draw2d.layout.connection.SplineConnectionRouter"],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'><a href='#!/api/draw2d.layout.connection.ConnectionRouter' rel='draw2d.layout.connection.ConnectionRouter' class='docClass'>draw2d.layout.connection.ConnectionRouter</a><div class='subclass '><strong>draw2d.layout.connection.ManhattanConnectionRouter</strong></div></div><h4>Subclasses</h4><div class='dependency'><a href='#!/api/draw2d.layout.connection.CircuitConnectionRouter' rel='draw2d.layout.connection.CircuitConnectionRouter' class='docClass'>draw2d.layout.connection.CircuitConnectionRouter</a></div><div class='dependency'><a href='#!/api/draw2d.layout.connection.InteractiveManhattanConnectionRouter' rel='draw2d.layout.connection.InteractiveManhattanConnectionRouter' class='docClass'>draw2d.layout.connection.InteractiveManhattanConnectionRouter</a></div><div class='dependency'><a href='#!/api/draw2d.layout.connection.ManhattanBridgedConnectionRouter' rel='draw2d.layout.connection.ManhattanBridgedConnectionRouter' class='docClass'>draw2d.layout.connection.ManhattanBridgedConnectionRouter</a></div><div class='dependency'><a href='#!/api/draw2d.layout.connection.MuteableManhattanConnectionRouter' rel='draw2d.layout.connection.MuteableManhattanConnectionRouter' class='docClass'>draw2d.layout.connection.MuteableManhattanConnectionRouter</a></div><div class='dependency'><a href='#!/api/draw2d.layout.connection.SplineConnectionRouter' rel='draw2d.layout.connection.SplineConnectionRouter' class='docClass'>draw2d.layout.connection.SplineConnectionRouter</a></div><h4>Files</h4><div class='dependency'><a href='source/ManhattanConnectionRouter.html#draw2d-layout-connection-ManhattanConnectionRouter' target='_blank'>ManhattanConnectionRouter.js</a></div></pre><div class='doc-contents'><p>Provides a <a href=\"#!/api/draw2d.Connection\" rel=\"draw2d.Connection\" class=\"docClass\">draw2d.Connection</a> with an orthogonal route between the Connection's source\nand target anchors.</p>\n\n<p>See the example:</p>\n\n<pre class='inline-example preview small frame'><code>// Override the default connection type. This is used during drag&amp;drop operations of ports.\n//\nvar createConnection=function(sourcePort, targetPort){\n   // return my special kind of connection\n   var con = new <a href=\"#!/api/draw2d.Connection\" rel=\"draw2d.Connection\" class=\"docClass\">draw2d.Connection</a>();\n   con.setRouter(new <a href=\"#!/api/draw2d.layout.connection.ManhattanConnectionRouter\" rel=\"draw2d.layout.connection.ManhattanConnectionRouter\" class=\"docClass\">draw2d.layout.connection.ManhattanConnectionRouter</a>());\n   return con;\n};\n\n// Install a special policy into the canvas to use my own implementation of connection\n// if we drag&amp;drop a port\n//\ncanvas.installEditPolicy(  new <a href=\"#!/api/draw2d.policy.connection.DragConnectionCreatePolicy\" rel=\"draw2d.policy.connection.DragConnectionCreatePolicy\" class=\"docClass\">draw2d.policy.connection.DragConnectionCreatePolicy</a>({\n      createConnection: createConnection\n}));\n\n// create and add two nodes which contains Ports (In and OUT)\n//\nvar start = new <a href=\"#!/api/draw2d.shape.node.Start\" rel=\"draw2d.shape.node.Start\" class=\"docClass\">draw2d.shape.node.Start</a>();\nvar end   = new <a href=\"#!/api/draw2d.shape.node.End\" rel=\"draw2d.shape.node.End\" class=\"docClass\">draw2d.shape.node.End</a>();\n\n// ...add it to the canvas \ncanvas.add( start, 50,50);\ncanvas.add( end, 230,80);\n\n// first Connection\n//\nvar c = createConnection();\nc.setSource(start.getOutputPort(0));\nc.setTarget(end.getInputPort(0));\ncanvas.add(c);\n</code></pre>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='draw2d.layout.connection.ManhattanConnectionRouter'>draw2d.layout.connection.ManhattanConnectionRouter</span><br/><a href='source/ManhattanConnectionRouter.html#draw2d-layout-connection-ManhattanConnectionRouter-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/draw2d.layout.connection.ManhattanConnectionRouter-method-constructor' class='name expandable'>draw2d.layout.connection.ManhattanConnectionRouter</a>( <span class='pre'></span> ) : <a href=\"#!/api/draw2d.layout.connection.ManhattanConnectionRouter\" rel=\"draw2d.layout.connection.ManhattanConnectionRouter\" class=\"docClass\">draw2d.layout.connection.ManhattanConnectionRouter</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Creates a new Router object. ...</div><div class='long'><p>Creates a new Router object.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/draw2d.layout.connection.ManhattanConnectionRouter\" rel=\"draw2d.layout.connection.ManhattanConnectionRouter\" class=\"docClass\">draw2d.layout.connection.ManhattanConnectionRouter</a></span><div class='sub-desc'>\n</div></li></ul><p>Overrides: <a href=\"#!/api/draw2d.layout.connection.ConnectionRouter-method-constructor\" rel=\"draw2d.layout.connection.ConnectionRouter-method-constructor\" class=\"docClass\">draw2d.layout.connection.ConnectionRouter.constructor</a></p></div></div></div><div id='method-_route' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='draw2d.layout.connection.ManhattanConnectionRouter'>draw2d.layout.connection.ManhattanConnectionRouter</span><br/><a href='source/ManhattanConnectionRouter.html#draw2d-layout-connection-ManhattanConnectionRouter-method-_route' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.layout.connection.ManhattanConnectionRouter-method-_route' class='name expandable'>_route</a>( <span class='pre'>conn, fromPt, fromDir, toPt, toDir</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>Internal routing algorithm. ...</div><div class='long'><p>Internal routing algorithm.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>conn</span> : <a href=\"#!/api/draw2d.Connection\" rel=\"draw2d.Connection\" class=\"docClass\">draw2d.Connection</a><div class='sub-desc'>\n</div></li><li><span class='pre'>fromPt</span> : <a href=\"#!/api/draw2d.geo.Point\" rel=\"draw2d.geo.Point\" class=\"docClass\">draw2d.geo.Point</a><div class='sub-desc'>\n</div></li><li><span class='pre'>fromDir</span> : Number<div class='sub-desc'>\n</div></li><li><span class='pre'>toPt</span> : <a href=\"#!/api/draw2d.geo.Point\" rel=\"draw2d.geo.Point\" class=\"docClass\">draw2d.geo.Point</a><div class='sub-desc'>\n</div></li><li><span class='pre'>toDir</span> : Number<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-canRemoveSegmentAt' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/draw2d.layout.connection.ConnectionRouter' rel='draw2d.layout.connection.ConnectionRouter' class='defined-in docClass'>draw2d.layout.connection.ConnectionRouter</a><br/><a href='source/ConnectionRouter.html#draw2d-layout-connection-ConnectionRouter-method-canRemoveSegmentAt' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.layout.connection.ConnectionRouter-method-canRemoveSegmentAt' class='name expandable'>canRemoveSegmentAt</a>( <span class='pre'>index</span> ) : Boolean<span class=\"signature\"></span></div><div class='description'><div class='short'>Callback method for the PolyLine or Connection to verify that a segment is deletable. ...</div><div class='long'><p>Callback method for the PolyLine or Connection to verify that a segment is deletable.</p>\n        <p>Available since: <b>4.2.3</b></p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>index</span> : Number<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-canRemoveVertexAt' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/draw2d.layout.connection.ConnectionRouter' rel='draw2d.layout.connection.ConnectionRouter' class='defined-in docClass'>draw2d.layout.connection.ConnectionRouter</a><br/><a href='source/ConnectionRouter.html#draw2d-layout-connection-ConnectionRouter-method-canRemoveVertexAt' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.layout.connection.ConnectionRouter-method-canRemoveVertexAt' class='name expandable'>canRemoveVertexAt</a>( <span class='pre'>index</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Callback method for the PolyLine or Connection to check if it possible to remove a vertex from\nthe list. ...</div><div class='long'><p>Callback method for the PolyLine or Connection to check if it possible to remove a vertex from\nthe list. The router can send an veto for this.\nPer default it is not possible to remove any vertex from the PolyLine exceptional if any interactive\nrouter is installed.</p>\n        <p>Available since: <b>4.2.3</b></p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>index</span> : Number<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getPersistentAttributes' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/draw2d.layout.connection.ConnectionRouter' rel='draw2d.layout.connection.ConnectionRouter' class='defined-in docClass'>draw2d.layout.connection.ConnectionRouter</a><br/><a href='source/ConnectionRouter.html#draw2d-layout-connection-ConnectionRouter-method-getPersistentAttributes' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.layout.connection.ConnectionRouter-method-getPersistentAttributes' class='name expandable'>getPersistentAttributes</a>( <span class='pre'>line, memento</span> ) : Object<span class=\"signature\"></span></div><div class='description'><div class='short'>Tweak or enrich the polyline persistence data with routing information ...</div><div class='long'><p>Tweak or enrich the polyline persistence data with routing information</p>\n        <p>Available since: <b>2.10.0</b></p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>line</span> : <a href=\"#!/api/draw2d.shape.basic.PolyLine\" rel=\"draw2d.shape.basic.PolyLine\" class=\"docClass\">draw2d.shape.basic.PolyLine</a><div class='sub-desc'>\n</div></li><li><span class='pre'>memento</span> : Object<div class='sub-desc'><p>The memento data of the polyline</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-onDrag' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/draw2d.layout.connection.ConnectionRouter' rel='draw2d.layout.connection.ConnectionRouter' class='defined-in docClass'>draw2d.layout.connection.ConnectionRouter</a><br/><a href='source/ConnectionRouter.html#draw2d-layout-connection-ConnectionRouter-method-onDrag' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.layout.connection.ConnectionRouter-method-onDrag' class='name expandable'>onDrag</a>( <span class='pre'>dx, dy, dx2, dy2</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>The draw2d.Connection delegates the drag operation to the router. ...</div><div class='long'><p>The <a href=\"#!/api/draw2d.Connection\" rel=\"draw2d.Connection\" class=\"docClass\">draw2d.Connection</a> delegates the drag operation to the router. The router can\nhandle the different constraints of the connection.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>dx</span> : Number<div class='sub-desc'><p>the x difference between the start of the drag drop operation and now</p>\n</div></li><li><span class='pre'>dy</span> : Number<div class='sub-desc'><p>the y difference between the start of the drag drop operation and now</p>\n</div></li><li><span class='pre'>dx2</span> : Number<div class='sub-desc'><p>The x diff since the last call of this dragging operation</p>\n</div></li><li><span class='pre'>dy2</span> : Number<div class='sub-desc'><p>The y diff since the last call of this dragging operation</p>\n</div></li></ul></div></div></div><div id='method-onInstall' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='draw2d.layout.connection.ManhattanConnectionRouter'>draw2d.layout.connection.ManhattanConnectionRouter</span><br/><a href='source/ManhattanConnectionRouter.html#draw2d-layout-connection-ManhattanConnectionRouter-method-onInstall' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.layout.connection.ManhattanConnectionRouter-method-onInstall' class='name expandable'>onInstall</a>( <span class='pre'>connection</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Callback method if the router has been assigned to a connection. ...</div><div class='long'><p>Callback method if the router has been assigned to a connection.</p>\n        <p>Available since: <b>2.7.2</b></p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>connection</span> : <a href=\"#!/api/draw2d.Connection\" rel=\"draw2d.Connection\" class=\"docClass\">draw2d.Connection</a><div class='sub-desc'><p>The assigned connection</p>\n</div></li></ul><p>Overrides: <a href=\"#!/api/draw2d.layout.connection.ConnectionRouter-method-onInstall\" rel=\"draw2d.layout.connection.ConnectionRouter-method-onInstall\" class=\"docClass\">draw2d.layout.connection.ConnectionRouter.onInstall</a></p></div></div></div><div id='method-onUninstall' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/draw2d.layout.connection.ConnectionRouter' rel='draw2d.layout.connection.ConnectionRouter' class='defined-in docClass'>draw2d.layout.connection.ConnectionRouter</a><br/><a href='source/ConnectionRouter.html#draw2d-layout-connection-ConnectionRouter-method-onUninstall' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.layout.connection.ConnectionRouter-method-onUninstall' class='name expandable'>onUninstall</a>( <span class='pre'>connection</span> )<span class=\"signature\"><span class='template' >template</span></span></div><div class='description'><div class='short'>Callback method if the router has been removed from the connection. ...</div><div class='long'><p>Callback method if the router has been removed from the connection.</p>\n        <p>Available since: <b>2.7.2</b></p>\n      <div class='rounded-box template-box'>\n      <p>This is a <a href=\"#!/guide/components\">template method</a>.\n         a hook into the functionality of this class.\n         Feel free to override it in child classes.</p>\n      </div>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>connection</span> : <a href=\"#!/api/draw2d.shape.basic.PolyLine\" rel=\"draw2d.shape.basic.PolyLine\" class=\"docClass\">draw2d.shape.basic.PolyLine</a><div class='sub-desc'><p>The related connection</p>\n</div></li></ul></div></div></div><div id='method-route' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='draw2d.layout.connection.ManhattanConnectionRouter'>draw2d.layout.connection.ManhattanConnectionRouter</span><br/><a href='source/ManhattanConnectionRouter.html#draw2d-layout-connection-ManhattanConnectionRouter-method-route' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.layout.connection.ManhattanConnectionRouter-method-route' class='name expandable'>route</a>( <span class='pre'>connection, oldVertices, [routingHints]</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Routes the Connection. ...</div><div class='long'><p>Routes the Connection.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>connection</span> : <a href=\"#!/api/draw2d.Connection\" rel=\"draw2d.Connection\" class=\"docClass\">draw2d.Connection</a><div class='sub-desc'><p>The Connection to route</p>\n\n</div></li><li><span class='pre'>oldVertices</span> : <a href=\"#!/api/draw2d.util.ArrayList\" rel=\"draw2d.util.ArrayList\" class=\"docClass\">draw2d.util.ArrayList</a><div class='sub-desc'><p>old/existing vertices of the Connection</p>\n\n</div></li><li><span class='pre'>routingHints</span> : Object (optional)<div class='sub-desc'><p>some helper attributes for the router</p>\n\n<ul><li><span class='pre'>startMoved</span> : Boolean (optional)<div class='sub-desc'><p>is true if just the start location has moved</p>\n\n</div></li><li><span class='pre'>endMoved</span> : Boolean (optional)<div class='sub-desc'><p>is true if the destination location has changed</p>\n\n</div></li><li><span class='pre'>oldVertices</span> : <a href=\"#!/api/draw2d.util.ArrayList\" rel=\"draw2d.util.ArrayList\" class=\"docClass\">draw2d.util.ArrayList</a> (optional)<div class='sub-desc'><p>the vertices before the reroute has been triggered</p>\n\n</div></li></ul></div></li></ul><p>Overrides: <a href=\"#!/api/draw2d.layout.connection.ConnectionRouter-method-route\" rel=\"draw2d.layout.connection.ConnectionRouter-method-route\" class=\"docClass\">draw2d.layout.connection.ConnectionRouter.route</a></p></div></div></div><div id='method-setPersistentAttributes' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/draw2d.layout.connection.ConnectionRouter' rel='draw2d.layout.connection.ConnectionRouter' class='defined-in docClass'>draw2d.layout.connection.ConnectionRouter</a><br/><a href='source/ConnectionRouter.html#draw2d-layout-connection-ConnectionRouter-method-setPersistentAttributes' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.layout.connection.ConnectionRouter-method-setPersistentAttributes' class='name expandable'>setPersistentAttributes</a>( <span class='pre'>memento</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>set the attributes for the polyline with routing information ...</div><div class='long'><p>set the attributes for the polyline with routing information</p>\n        <p>Available since: <b>2.10.0</b></p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>memento</span> : Object<div class='sub-desc'><p>the JSON data to read</p>\n</div></li></ul></div></div></div><div id='method-verticesSet' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/draw2d.layout.connection.ConnectionRouter' rel='draw2d.layout.connection.ConnectionRouter' class='defined-in docClass'>draw2d.layout.connection.ConnectionRouter</a><br/><a href='source/ConnectionRouter.html#draw2d-layout-connection-ConnectionRouter-method-verticesSet' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.layout.connection.ConnectionRouter-method-verticesSet' class='name expandable'>verticesSet</a>( <span class='pre'></span> )<span class=\"signature\"><span class='protected' >protected</span></span></div><div class='description'><div class='short'>@methid\nCalled by the connection if the vertices set outside. ...</div><div class='long'><p>@methid\nCalled by the connection if the vertices set outside.\nThis enforce the router to avoid full autoroute. E.g. InteractiveManhattanRouter</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'></span> : <a href=\"#!/api/draw2d.shape.basic.Line\" rel=\"draw2d.shape.basic.Line\" class=\"docClass\">draw2d.shape.basic.Line</a><div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});