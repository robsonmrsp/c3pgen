Ext.data.JsonP.draw2d_Selection({"tagname":"class","name":"draw2d.Selection","autodetected":{},"files":[{"filename":"Selection.js","href":"Selection.html#draw2d-Selection"}],"author":[{"tagname":"author","name":"Andreas Herz","email":null}],"members":[{"name":"constructor","tagname":"method","owner":"draw2d.Selection","id":"method-constructor","meta":{}},{"name":"add","tagname":"method","owner":"draw2d.Selection","id":"method-add","meta":{"chainable":true,"private":true}},{"name":"clear","tagname":"method","owner":"draw2d.Selection","id":"method-clear","meta":{"chainable":true}},{"name":"contains","tagname":"method","owner":"draw2d.Selection","id":"method-contains","meta":{}},{"name":"each","tagname":"method","owner":"draw2d.Selection","id":"method-each","meta":{"chainable":true}},{"name":"getAll","tagname":"method","owner":"draw2d.Selection","id":"method-getAll","meta":{}},{"name":"getPrimary","tagname":"method","owner":"draw2d.Selection","id":"method-getPrimary","meta":{}},{"name":"getSize","tagname":"method","owner":"draw2d.Selection","id":"method-getSize","meta":{}},{"name":"remove","tagname":"method","owner":"draw2d.Selection","id":"method-remove","meta":{"chainable":true}},{"name":"setPrimary","tagname":"method","owner":"draw2d.Selection","id":"method-setPrimary","meta":{"chainable":true}}],"alternateClassNames":[],"aliases":{},"id":"class-draw2d.Selection","short_doc":"Represents the current selection in the canvas. ...","component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Files</h4><div class='dependency'><a href='source/Selection.html#draw2d-Selection' target='_blank'>Selection.js</a></div></pre><div class='doc-contents'><p>Represents the current selection in the canvas. The selection element is a pure passive element which\nmanage/store the selection.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='draw2d.Selection'>draw2d.Selection</span><br/><a href='source/Selection.html#draw2d-Selection-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/draw2d.Selection-method-constructor' class='name expandable'>draw2d.Selection</a>( <span class='pre'></span> ) : <a href=\"#!/api/draw2d.Selection\" rel=\"draw2d.Selection\" class=\"docClass\">draw2d.Selection</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Creates a new figure element which are not assigned to any canvas. ...</div><div class='long'><p>Creates a new figure element which are not assigned to any canvas.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/draw2d.Selection\" rel=\"draw2d.Selection\" class=\"docClass\">draw2d.Selection</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-add' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='draw2d.Selection'>draw2d.Selection</span><br/><a href='source/Selection.html#draw2d-Selection-method-add' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.Selection-method-add' class='name expandable'>add</a>( <span class='pre'>figure</span> ) : <a href=\"#!/api/draw2d.Selection\" rel=\"draw2d.Selection\" class=\"docClass\">draw2d.Selection</a><span class=\"signature\"><span class='chainable' >chainable</span><span class='private' >private</span></span></div><div class='description'><div class='short'>Add a figure to the selection. ...</div><div class='long'><p>Add a figure to the selection. No events are fired or update the selection handle. This method just\nadd the figure to the internal management data structure.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>figure</span> : Object<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/draw2d.Selection\" rel=\"draw2d.Selection\" class=\"docClass\">draw2d.Selection</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-clear' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='draw2d.Selection'>draw2d.Selection</span><br/><a href='source/Selection.html#draw2d-Selection-method-clear' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.Selection-method-clear' class='name expandable'>clear</a>( <span class='pre'></span> ) : <a href=\"#!/api/draw2d.Selection\" rel=\"draw2d.Selection\" class=\"docClass\">draw2d.Selection</a><span class=\"signature\"><span class='chainable' >chainable</span></span></div><div class='description'><div class='short'>Reset the current selection ...</div><div class='long'><p>Reset the current selection</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/draw2d.Selection\" rel=\"draw2d.Selection\" class=\"docClass\">draw2d.Selection</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-contains' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='draw2d.Selection'>draw2d.Selection</span><br/><a href='source/Selection.html#draw2d-Selection-method-contains' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.Selection-method-contains' class='name expandable'>contains</a>( <span class='pre'>figure, [checkDescendant]</span> ) : Boolean<span class=\"signature\"></span></div><div class='description'><div class='short'>return true if the given figure part of the selection. ...</div><div class='long'><p>return true if the given figure part of the selection.</p>\n        <p>Available since: <b>2.2.0</b></p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>figure</span> : <a href=\"#!/api/draw2d.Figure\" rel=\"draw2d.Figure\" class=\"docClass\">draw2d.Figure</a><div class='sub-desc'><p>The figure to check</p>\n</div></li><li><span class='pre'>checkDescendant</span> : Boolean (optional)<div class='sub-desc'><p>Check if the figure provided by the argument is a descendant of the selection whether it is a direct child or nested more deeply.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-each' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='draw2d.Selection'>draw2d.Selection</span><br/><a href='source/Selection.html#draw2d-Selection-method-each' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.Selection-method-each' class='name expandable'>each</a>( <span class='pre'>func, [reverse]</span> ) : <a href=\"#!/api/draw2d.Selection\" rel=\"draw2d.Selection\" class=\"docClass\">draw2d.Selection</a><span class=\"signature\"><span class='chainable' >chainable</span></span></div><div class='description'><div class='short'>Iterates over the current selection with func as callback handler. ...</div><div class='long'><p>Iterates over the current selection with <b>func</b> as callback handler.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>func</span> : Function<div class='sub-desc'><p>the callback function to call for each element</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>i</span> : Number<div class='sub-desc'><p>index of the element in iteration</p>\n</div></li><li><span class='pre'>value</span> : Object<div class='sub-desc'><p>value of the element in iteration.</p>\n</div></li></ul></div></li><li><span class='pre'>reverse</span> : Boolean (optional)<div class='sub-desc'><p>optional parameter. Iterate the collection reverse if it set to <b>true</b></p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/draw2d.Selection\" rel=\"draw2d.Selection\" class=\"docClass\">draw2d.Selection</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-getAll' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='draw2d.Selection'>draw2d.Selection</span><br/><a href='source/Selection.html#draw2d-Selection-method-getAll' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.Selection-method-getAll' class='name expandable'>getAll</a>( <span class='pre'>[expand]</span> ) : <a href=\"#!/api/draw2d.util.ArrayList\" rel=\"draw2d.util.ArrayList\" class=\"docClass\">draw2d.util.ArrayList</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Return the complete selection - including the primary selection. ...</div><div class='long'><p>Return the complete selection - including the primary selection.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>expand</span> : Boolean (optional)<div class='sub-desc'><p>expand all StrongComposite and WeakComposite to get all figures. Didn't expand any SetFigures or LayoutFigures</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/draw2d.util.ArrayList\" rel=\"draw2d.util.ArrayList\" class=\"docClass\">draw2d.util.ArrayList</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getPrimary' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='draw2d.Selection'>draw2d.Selection</span><br/><a href='source/Selection.html#draw2d-Selection-method-getPrimary' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.Selection-method-getPrimary' class='name expandable'>getPrimary</a>( <span class='pre'></span> ) : <a href=\"#!/api/draw2d.Figure\" rel=\"draw2d.Figure\" class=\"docClass\">draw2d.Figure</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Return the primary selection. ...</div><div class='long'><p>Return the primary selection. This can only one figure at once.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/draw2d.Figure\" rel=\"draw2d.Figure\" class=\"docClass\">draw2d.Figure</a></span><div class='sub-desc'><p>the primary selected figure</p>\n</div></li></ul></div></div></div><div id='method-getSize' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='draw2d.Selection'>draw2d.Selection</span><br/><a href='source/Selection.html#draw2d-Selection-method-getSize' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.Selection-method-getSize' class='name expandable'>getSize</a>( <span class='pre'></span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Return the size of the selection ...</div><div class='long'><p>Return the size of the selection</p>\n        <p>Available since: <b>4.8.0</b></p>\n</div></div></div><div id='method-remove' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='draw2d.Selection'>draw2d.Selection</span><br/><a href='source/Selection.html#draw2d-Selection-method-remove' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.Selection-method-remove' class='name expandable'>remove</a>( <span class='pre'>figure</span> ) : <a href=\"#!/api/draw2d.Selection\" rel=\"draw2d.Selection\" class=\"docClass\">draw2d.Selection</a><span class=\"signature\"><span class='chainable' >chainable</span></span></div><div class='description'><div class='short'>Remove the given figure from the selection (primary,all) ...</div><div class='long'><p>Remove the given figure from the selection (primary,all)</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>figure</span> : <a href=\"#!/api/draw2d.Figure\" rel=\"draw2d.Figure\" class=\"docClass\">draw2d.Figure</a><div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/draw2d.Selection\" rel=\"draw2d.Selection\" class=\"docClass\">draw2d.Selection</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-setPrimary' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='draw2d.Selection'>draw2d.Selection</span><br/><a href='source/Selection.html#draw2d-Selection-method-setPrimary' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.Selection-method-setPrimary' class='name expandable'>setPrimary</a>( <span class='pre'>figure</span> ) : <a href=\"#!/api/draw2d.Selection\" rel=\"draw2d.Selection\" class=\"docClass\">draw2d.Selection</a><span class=\"signature\"><span class='chainable' >chainable</span></span></div><div class='description'><div class='short'>Set the primary selection. ...</div><div class='long'><p>Set the primary selection.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>figure</span> : <a href=\"#!/api/draw2d.Figure\" rel=\"draw2d.Figure\" class=\"docClass\">draw2d.Figure</a><div class='sub-desc'><p>The new primary selection</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/draw2d.Selection\" rel=\"draw2d.Selection\" class=\"docClass\">draw2d.Selection</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});