
/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************/
/**
 * @class draw2d.Figure
 * A lightweight graphical object. Figures are rendered to a {@link draw2d.Canvas} object.
 * 
 * @inheritable
 * @author Andreas Herz
 */
draw2d.Figure = Class.extend({
    
	NAME : "draw2d.Figure",
    
	MIN_TIMER_INTERVAL: 50, // minimum timer interval in milliseconds

    // special attributes that should be get/set via method calls
   
    /**
     * @constructor 
     * Creates a new figure element which is not assigned to any canvas.
     * 
     * 
     * @param {Object} [attr] the configuration of the shape
     */
    init: function( attr, setter, getter) {

        this.setterWhitelist = $.extend({
            /** @attr {String} id the unique id of the figure */
            id   : this.setId,
            /** @attr {Number} x the x offset of the figure in relation to the parent figure or canvas */
            x   : this.setX,
            /** @attr {Number} y the y offset of the figure in relation to the parent figure or canvas */
            y   : this.setY,
            /** @attr {Number} width the new width of the figure. Considering the minWidth of the shape */
            width   : this.setWidth,
            /** @attr {Number} height the new height of the figure. Considering the minHeight of the shape */
            height   : this.setHeight,
            /** @attr {draw2d.geo.Rectangle} boundingBox set the new bounding box of the shape */
            boundingBox : this.setBoundingBox,
            /** @attr {Number} minWidth the new min width of the figure. */
            minWidth   : this.setMinWidth,
            /** @attr {Number} minHeight the new min height of the figure. */
            minHeight   : this.setMinHeight,
            /** @attr {String} cssClass the css class of the shape. can be used to style the shape via CSS3 (SVG only) */
            cssClass   : this.setCssClass,
            /** @attr {Object} userData additional custom data which can be stored by the shape */
            userData   : this.setUserData,
            /** @attr {Boolean} resizeable drives the resizeable behaviour of the shape */
            resizeable : this.setResizeable,
            /** @attr {Boolean} selectable drives the selectable behaviour of the shape */
            selectable : this.setSelectable,
            /** @attr {Number} angle the rotation angle of the shape. At the moment only 90 degree increments are possible */
            angle      : this.setRotationAngle,
            /** @attr {Number} alpha the the alpha/opacity of the shape. value must be between [0..1] */
            alpha  : this.setAlpha,
            /** @attr {Number} opacity the the alpha/opacity of the shape. value must be between [0..1] */
            opacity  : this.setAlpha,
            /** @attr {Boolean} glow the glow flag for the shape. The representation of the "glow" depends on the shape */
            glow  : this.setGlow,
            /** @attr {Boolean} visible set the visibility flag of the shape */
            visible  : this.setVisible,
            /** @attr {Boolean} keepAspectRatio indicate if the shape should keep the aspect ratio during resize */
            keepAspectRatio : this.setKeepAspectRatio
            
        },setter);
        
        this.getterWhitelist = $.extend({
            id: this.getId,
            visible: this.isVisible,
            angle: this.getRotationAngle,
            x: this.getX,
            y: this.getY,
            width : this.getWidth,
            height: this.getHeight,
            resizeable : this.isResizeable,
            selectable : this.isSelectable,
            alpha  : this.getAlpha,
            opacity : this.getAlpha
        },getter);
        
        var _this = this;
        
        // all figures has an unique id. Required for figure get and persistence storage
        this.id = draw2d.util.UUID.create();
        
        // required for the SelectionEditPolicy to indicate the type of figure
        // which the user clicks
        this.isResizeHandle=false;
        
        // for undo/redo operation. It holds the command during a drag/drop operation
        // and execute it on the CommandStack if the user drop the figure.
        this.command = null;
        
        // the assigned canvas
        this.canvas = null;
        
        // the RaphaelJS element reference
        this.shape  = null;
        
        // possible decorations ( e.g. a Label) of the Connection
        // children are fixed bounded the figure. Most of the events of the child will bee
        // routed to the parent
        this.children = new draw2d.util.ArrayList();
            
        // behavior flags
        //
        this.selectable = true;
        this.deleteable = true;
        this.resizeable = true;
        this.draggable = true;
        this.visible = true;
        // since 4.1.0. 
        this.keepAspectRatio = false; 
        
        
        this.canSnapToHelper = true;
        this.snapToGridAnchor = new draw2d.geo.Point(0,0);    // hot spot for snap to grid  
        this.editPolicy = new draw2d.util.ArrayList();
        
        
        // timer for animation or automatic update
        //
        this.timerId = -1;
        this.timerInterval = 0;
        
        // possible parent of the figure. 
        // @see: this.children
        this.parent = null;
        
        // a figure can be part of a StrongComposite like a group, ...
        //
        this.composite = null;
        
        // generic handle for the JSON read/write of user defined data
        this.userData = null;
       
        // appearance, position and dim properties
        //
        this.x = 0;
        this.y = 0;
        this.minHeight = 5;
        this.minWidth = 5;
        this.rotationAngle = 0;
        // add the name of the class to the css attribute
        this.cssClass = this.NAME.replace(new RegExp("[.]","g"), "_");
       
        this.width  = this.getMinWidth();
        this.height = this.getMinHeight();

        this.alpha = 1.0;
        
        // internal status flags for the Drag&Drop operation handling and other stuff
        // 
        this.isInDragDrop =false;

        this.ox = 0;
        this.oy = 0;
        this.repaintBlocked=false;
        this.lastAppliedAttributes = {};
        this.selectionHandles = new draw2d.util.ArrayList();
        this.panningDelegate = null;

        // even handling since version 5.0.0
        this.eventSubscriptions = {};

        this.relocateChildrenEventCallback = function(){
            _this.children.each(function(i,e){
                e.locator.relocate(i, e.figure);
            });
        };

        // new approach to delegate selection requests.
        //
        this.defaultSelectionAdapter = this.selectionAdapter = function(){
            return _this;
        };

        // install default selection handler. Can be overridden or replaced
        this.installEditPolicy(new draw2d.policy.figure.RectangleSelectionFeedbackPolicy());


        // the new style attr call with object attributes
        this.attr(attr);
    },
    
    /**
     * @method
     * Read or set shape attributes.<br>
     * When no value is given, reads specified attribute from the element.<br> 
     * When value is given, sets the attribute to that value.
     * Multiple attributes can be set by passing an object with name-value pairs.
     *     
     *     var figure = new draw2d.shape.basic.Rectangle();
     *     figure.attr('x');      //=> read value
     *     figure.attr('x', 30);  //=> set value
     *     
     *     // multiple attributes:
     *     figure.attr({
     *       x: 30,
     *       y: 40,
     *       width : 200,
     *       height: 50,
     *       cssClass: "red_border_figure"
     *     });
     *
     *     // it is possible to override any method of the figure as well
     *     // Instead of inheritance you can just override the callback methods
     *     // like
     *     //
     *     figure.attr({
     *        onClick : function(){
     *            alert("click");
     *        }
     *     });
     *
     *     // or you can pass the attr values in the constructor
     *     //
     *     var clickFigure = new draw2d.shape.basic.Rectangle({
     *        onClick : function(){
     *            alert("click");
     *        }
     *     });
     *
     *
     * Additional you can set the user defined values (userData) with this method 
     * using the dot-notation. User defined values are always part of the exported 
     * JSON data.
     * 
     *     // setting multiple attributes:
     *     figure.attr({
     *       "userData.my.property.x": 30,
     *       "userData.my.property.y": 40
     *     });
     * 
     * Also set using array notation is possible for the userData:
     * 
     *     // dot notation and array brackets:
     *     figure.attr({
     *       "userData.my.names[0]": "John",
     *       "userData.my.names[1]": "Doe"
     *     });
     *     
     *     
     * The Object returned should be the equivalent structured object:
     * 
     *     var obj = figure.getUserData();
     *     
     * That is, where obj is equivalent to:
     * 
     *     var obj = {
     *         my:{
     *             property:{
     *                 x: 30,
     *                 y: 40
     *            },
     *            names:  ["John", "Doe"]
     *        }
     *    }; 
     *
     *
     * 
     * @param {String/Object} name
     * @param {Object} [value]
     * @since 5.0.1
     * @experimental
     * @returns
     **/
    attr: function(name, value){
        var _this = this;
        var orig = this.repaintBlocked;

        try{
            // call of attr as setter method with {name1:val1, name2:val2 }  argument list
            //
            if($.isPlainObject(name)){
                for(var key in name){
                    // user can set the "userData" with path notation. In this case we
                    // expand the path to a real JSON object and set the data.
                    // index/brackets are allowed too.
                    //
                    if(key.substring(0,9)==="userData."){
                        if(this.userData===null){this.userData={};}
                        draw2d.util.JSON.set({userData:this.userData}, key, name[key]);
                        this.fireEvent("change:"+key,{value:name[key]});
                    }
                    else{
                        var func=this.setterWhitelist[key];
                        if(func){
                            func.call(this,name[key]); 
                        }
                        // maybe the user adds a function as property to the attr call
                        // e.g.:
                        // {
                        //     doIt: function(){}
                        // }
                        //
                        // in this case we assign the method to this object and wrap it with "this" as context
                        // a very, very simple method to replace default implemenations of the object
                        else if($.isFunction(name[key])){
                            this[key] = $.proxy(name[key],this);
                        }

                    }
                }
            }
            else if(typeof name === "string"){
                // call attr as getter
                //
                if(typeof value ==="undefined"){
                    var getter = this.getterWhitelist[name];
                    if($.isFunction(getter)){
                        return getter.call(this);
                    }
                    // or it is a userData path notation like "userData.any.path.value"
                    else if(name.substring(0,9)==="userData."){
                        var data = {userData:this.userData};
                        return draw2d.util.JSON.get(data, name);
                    }
                    return; // undefined
                }
                // call attr as simple setter with (key , value)
                //
                
                // the value can be a function. In this case we must call the value().
                if($.isFunction(value)){
                    value = value();
                }
                if(name.substring(0,9)==="userData."){
                    if(this.userData===null){this.userData={};}
                    draw2d.util.JSON.set({userData:this.userData}, name, value);
                    this.fireEvent("change:"+name,{value:value});
                }
                else{
                    var setter = this.setterWhitelist[name];
                    if (setter){setter.call(this,value);}
                }
            }
            // may it is a array of attributes used for the getter
            //
            else if($.isArray(name)){
                result = {};

                $.each(name,function(index, entry){
                    result[entry] = _this.attr(entry);
                });
                return result;
            }
            // generic getter of all registered attributes
            else if(typeof name === "undefined"){
            	var result = {};
            	for(key in this.getterWhitelist){
             		result[key] = this.getterWhitelist[key].call(this);
            	}
            	return result;
            }
        }
        finally{
            this.repaintBlocked=orig;
        }
      //  this.repaint();
        
        return this;
    },
    
    /**
     * Return a copy of the object, filtered to only have values for the whitelisted keys.
     * @deprecated
     */
    pick: function(obj, var_keys) {
        var keys = typeof arguments[1] !== 'string' ? arguments[1] : Array.prototype.slice.call(arguments, 1);
        var out = {}, key;
        for (key in keys) {
            if(typeof obj[key] !== "undefined")
                out[key] = obj[key];
        }
        return out;
    },
    
   /**
    * @method
    * Add the figure to the current selection and propagate this to all edit policies.
    * 
    * @param {Boolean} [asPrimarySelection] true if the element should be the primary selection
    * @private
    */
    select: function(asPrimarySelection){
        if(typeof asPrimarySelection==="undefined"){
            asPrimarySelection=true;
        }

        // apply all EditPolicy for select Operations
        //
        var _this=this;
        this.editPolicy.each(function(i,e){
              if(e instanceof draw2d.policy.figure.SelectionPolicy){
                  e.onSelect(_this.canvas, _this,asPrimarySelection);
              }
        });

        if(this.canvas !== null){
            this.canvas.getSelection().add(this);
        }

         return this;
    },
    
    /**
     * @method
     * Unselect the figure and propagete this event to all edit policies.
     * 
     * @private
     **/
    unselect: function()
    {
        var _this = this;
        // apply all EditPolicy for select Operations
        //
        this.editPolicy.each(function(i,e){
              if(e instanceof draw2d.policy.figure.SelectionPolicy){
                  e.onUnselect(_this.canvas, _this);
              }
        });

        if(this.canvas !==null){
            this.canvas.getSelection().remove(this);
        }
        
        return this;
    },

    setSelectionAdapter: function(adapter)
    {
        if(adapter==null){
            this.selectionAdapter = this.defaultSelectionAdapter;
        }
        else {
            this.selectionAdapter = adapter;
        }

        return this;
    },

    /**
     * @method
     *
     * @returns {Function}
     */
    getSelectionAdapter: function()
    {
        return this.selectionAdapter;
    },

    /**
     * @method
     * Returns true if the figure part of the current canvas selection.
     *
     * @since 5.5.6
     *
     * @return {Boolean}
     */
    isSelected: function()
    {
        if(this.canvas !==null){
            return this.canvas.getSelection().contains(this);
        }

        return false;
    },

    /**
     * @method
     * Allows a user to attach (or remove) data to an element, without needing to create a custom figure or shape.
     * The data must be a valid JSON object.
     * 
     *      // Alternatively you can use the attr method:
     *      figure.attr({
     *        userData: object
     *      });
     * 
     * @since 2.7.2
     * @param {Object} object
     */
    setUserData: function(object)
    {
      this.userData = object;  
      this.fireEvent("change:userData",{value:object});
      return this;
    },

    /**
     * @method
     * Returns any user data set previously on the given figure by setUserData.
     * 
     * @since 2.7.2
     * @returns {Object}
     */
    getUserData: function()
    {
        return this.userData;
    },
    
    /**
     * @method
     * Return the UUID of this element. 
     * 
     * @return {String}
     */
    getId: function()
    {
       return this.id; 
    },
    
    	
    /**
     * @method
     * Set the id of this element. 
     * 
     *     // Alternatively you can use the attr method:
     *     figure.attr({
     *       id: newId
     *     });
     *     
     * @param {String} newId the new id for this figure
     */
    setId: function(newId)
    {
        this.id = newId; 

        return this;
    },
    

    /**
     * @method
     * Return the css styling class name of the element.
     * 
     *     
     * @return {String}
     */
    getCssClass: function()
    {
       return this.cssClass; 
    },
    
    /**
     * @method
     * Set the css class of the node.
     * 
     *      // Alternatively you can use the attr method:
     *      figure.attr({
     *        "cssClass": "red_border_figure"
     *      });
     *     
     * @param {String} cssClass the new css class name of the node
     * @since 2.9.0
     */
    setCssClass: function(cssClass)
    {
        this.cssClass = cssClass===null?null:$.trim(cssClass);
        
        if(this.shape===null){
            return this;
        }
        
        if(this.cssClass===null){
            this.shape.node.removeAttribute("class");
        }
        else{
            this.shape.node.setAttribute("class", this.cssClass);
        }
        this.fireEvent("change:cssClass",{value:this.cssClass});
               
        return this;
    },
    
    /**
     * @method
     * The method will return true if the class is assigned to the element, even if other classes also are.
     * 
     * @param {String} className the class name to check
     * @since 2.9.0
     */
    hasCssClass: function(className)
    {
        if(this.cssClass===null){
            return false;
        }
        
        return new RegExp(' ' + $.trim(className) + ' ').test(' ' + this.cssClass + ' ');
    },

    /**
     * @method
     * Add a CSS class to the figure.<br>
     * It's important to note that this method does not replace a class. It simply adds the class, 
     * appending it to any which may already be assigned to the elements.
     * 
     * @param {String} className
     * @since 2.9.0
     */
    addCssClass: function( className) 
    {
        className = $.trim(className);
        if (!this.hasCssClass( className)) {
            if(this.cssClass===null){
                this.setCssClass(className);
            }
            else{
                this.setCssClass(this.cssClass + ' ' + className);
            }
            this.fireEvent("change:cssClass",{value:this.cssClass});
        }
        
        return this;
    },

    /**
     * @method
     * 
     * Remove the given css class name from the figure
     * 
     * @param {String} className the css class name to add
     */
    removeCssClass: function(className)
    {
        className = $.trim(className);
        var newClass = ' ' + this.cssClass.replace( /[\t\r\n]/g, ' ') + ' ';
        if (this.hasCssClass(className)) {
            while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
                newClass = newClass.replace(' ' + className + ' ', ' ');
            }
            this.setCssClass( newClass.replace(/^\s+|\s+$/g, ''));
            this.fireEvent("change:cssClass",{value:this.cssClass});
       }
        
        return this;
    },
    
    /**
     * @method
     * 
     * Add or remove the given css class name from the figure
     * 
     * @param {String} className the class name to toggle
     */
    toggleCssClass: function( className)
    {
        className = $.trim(className);
        var newClass = ' ' + this.cssClass.replace( /[\t\r\n]/g, ' ' ) + ' ';
        if (this.hasCssClass( className)) {
            while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
                newClass = newClass.replace( ' ' + className + ' ' , ' ' );
            }
            this.setCssClass( newClass.replace(/^\s+|\s+$/g, ''));
        } else {
            this.setCssClass(this.cssClass + ' ' + className);
        }
        this.fireEvent("change:cssClass",{value:this.cssClass});
        
        return this;
    },

    /**
     * @method
     * Set the canvas element of this figures. This can be used to determine whenever an element
     * is added or removed to the canvas.
     * 
     * @param {draw2d.Canvas} canvas the new parent of the figure or null
     */
    setCanvas: function( canvas )
    {
      // remove the shape if we reset the canvas and the element
      // was already drawn
      if(canvas===null && this.shape!==null)
      {
          if(this.isSelected()) {
              this.unselect();
          }
          this.shape.remove();
          this.shape=null;
      }
    
      this.canvas = canvas;
      
      if(this.canvas!==null){
          this.getShapeElement();
      }

      // reset the attribute cache. We must start by paint all attributes
      //
      this.lastAppliedAttributes = {};


      if(canvas === null){
    	  this.stopTimer();
      }
      else{
    	  if(this.timerInterval>= this.MIN_TIMER_INTERVAL){
              this.startTimer(this.timerInterval);
    	  }
      }
      
      this.children.each(function(i,e){
          e.figure.setCanvas(canvas);
      });
      
      return this;    
     },
     
     /**
      * @method
      * Return the current assigned canvas container.
      * 
      * @return {draw2d.Canvas}
      */
     getCanvas: function()
     {
         return this.canvas;
     },
     
    
     /**
      * @method
      * Start a timer which calls the onTimer method in the given interval.
      * 
      * @param {Number} milliSeconds
      */
     startTimer: function(milliSeconds)
     {
    	 this.stopTimer();
    	 this.timerInterval = Math.max(this.MIN_TIMER_INTERVAL, milliSeconds);
    	 
    	 if(this.canvas!==null){
    		 this.timerId = window.setInterval($.proxy(function(){
    		     this.onTimer();
    		     this.fireEvent("timer");
    		 },this), this.timerInterval);
    	 }

    	 return this;
     },

     /**
      * @method
      * Stop the internal timer.
      * 
      */
     stopTimer: function()
     {
    	if(this.timerId>=0){
  		  window.clearInterval(this.timerId);
		  this.timerId=-1;
    	} 
    	
    	return this;
     },

     /**
      * @method
      * Callback method for the internal timer handling<br>
      * Inherit classes must override this method if they want use the timer feature.
      * 
      *      // Alternatively you can register for this event with  
      *      figure.on("timer", function(emitter){
      *          alert("timer fired");
      *      });
      * 
      * @template
      */
     onTimer: function()
     {
     },
     
    /**
     * @method
     * Moves the element so it is the closest to the viewer’s eyes, on top of other elements. Additional
     * the internal model changed as well.
     * 
     * Optional: Inserts current object in front of the given one. 
     * 
     * @param {draw2d.Figure} [figure] move current object in front of the given one. 
     * @since 3.0.0
     */
     toFront: function(figure)
     {
         // ensure that the z-oder is still correct if the figure is assigned
         // to a StrongComposite
         //
         if(this.composite instanceof draw2d.shape.composite.StrongComposite && (typeof figure !=="undefined")){
             var indexFigure = figure.getZOrder();
             var indexComposite= this.composite.getZOrder();
             if(indexFigure<indexComposite){
                 figure = this.composite;
             }
         }
         
         if(typeof figure ==="undefined"){
             this.getShapeElement().toFront();
             
             if(this.canvas!==null){
                 var figures = this.canvas.getFigures();
                 var lines = this.canvas.getLines();
                 if(figures.remove(this)!==null){
                     figures.add(this);
                 }else if(lines.remove(this)!==null){
                     lines.add(this);
                 }
             }
         }
         else{
             this.getShapeElement().insertAfter(figure.getTopLevelShapeElement());
             
             if(this.canvas!==null){
                 var figures = this.canvas.getFigures();
                 var lines = this.canvas.getLines();
                 if(figures.remove(this)!==null){
                     var index = figures.indexOf(figure);
                     figures.insertElementAt(this, index+1);
                 }else if(lines.remove(this)!==null){
                     lines.add(this);
                 }
             }
         }
         
         // bring all children in front of the parent
         var _this = this;
         this.children.each(function(i,child){
             child.figure.toFront(_this);
         });

         // and last but not lease the ResizeHandles if any present
         //
         this.selectionHandles.each(function(i,handle){
             handle.toFront();
         });

         return this;
     },
     
     /**
      * @method
      * Moves the element to the background. Additional
      * the internal model changed as well.
      * 
      * @since 4.7.2
      */
     toBack: function(figure )
     {
         // it is not allowed that a figure is behind an assigned composite
         //
         if(this.composite instanceof draw2d.shape.composite.StrongComposite){
             this.toFront(this.composite);
             return;
         }
         
         if(this.canvas!==null){
             var figures = this.canvas.getFigures();
             var lines = this.canvas.getLines();
             if(figures.remove(this)!==null){
                 figures.insertElementAt(this,0);
             }else if(lines.remove(this)!==null){
                 lines.insertElementAt(this,0);
             }
             if(typeof figure !=="undefined"){
                 this.getShapeElement().insertBefore(figure.getShapeElement());
             }
             else{
                 this.getShapeElement().toBack();
             }
         }

         // Bring all children in front of "this" figure
         //
         var _this = this;
         this.children.each(function(i,child){
             child.figure.toFront(_this);
         }, true);

         return this;
     },
     
     
     /**
      * @method
      * Install a new edit policy to the figure. Each editpolicy is able to focus on a single editing 
      * task or group of related tasks. This also allows editing behavior to be selectively reused across 
      * different figure implementations. Also, behavior can change dynamically, such as when the layouts 
      * or routing methods change.
      * 
      * Example for limited DragDrop behavior can be a draw2d.layout.constraint.RegionConstriantPolicy.
      * 
      * @param {draw2d.policy.EditPolicy} policy
      */
     installEditPolicy: function(policy)
     {
         // it is only possible to install one SelectionFeedbackPolicy at once
         //
         if(policy instanceof draw2d.policy.figure.SelectionFeedbackPolicy){
             var _this = this;
             this.editPolicy.grep(function(p){
                 var stay = !(p instanceof draw2d.policy.figure.SelectionFeedbackPolicy); 
                 if(!stay){
                     p.onUninstall(_this);
                 }
                 return stay;
             });
         }
         policy.onInstall(this);
         this.editPolicy.add(policy);
         
         return this;
     },
     
     /**
      * @method
      * 
      * UnInstall the edit policy from the figure. Either the instance itself if found
      * or all kind of the given edit policies.
      * 
      * 
      * @param {draw2d.policy.EditPolicy} policy
      * @since 4.81
      */
     uninstallEditPolicy: function(policy)
     {
         var removedPolicy = this.editPolicy.remove(policy);
         
         // we found the policy and we are happy
         //
         if(removedPolicy !==null){
             removedPolicy.onUninstall(this);
             return; 
         }
         
         // The policy isn'T part of the figure. In this case we "think" the user want
         // deinstall all instances of the policy
         //
         var _this = this;
         var name = (typeof policy === "string")?policy:policy.NAME;
         this.editPolicy.grep(function(p){
             if(p.NAME === name){
                 p.onUninstall(_this);
                 return false;
             }
             return true;
         });
     },
     
     /**
      * @method
      * Add a child figure to the figure. The hands over figure doesn't support drag&drop 
      * operations. It's only a decorator for the connection.<br>
      * Mainly for labels or other decorations
      *
      *     
      *     var start = new draw2d.shape.node.Start({x:80, y:150});
      *     start.add(new draw2d.shape.basic.Label({text:"Test Label"}), new draw2d.layout.locator.TopLocator());  
      *      
      *     canvas.add( start);
      *      
      * @param {draw2d.Figure} child the figure to add as decoration to the connection.
      * @param {draw2d.layout.locator.Locator} locator the locator for the child. 
      * @param {Number} [index] optional index where to insert the figure
     **/
     add: function(child, locator, index)
     {
         if(typeof locator ==="undefined" || locator ===null){
             throw "Second parameter 'locator' is required for method 'Figure#add'";
         }

         // the child is now a slave of the parent
         //
         child.setParent(this);

         // inform the locator that a new child is bounded to the parent
         // The call must happen after parent assignment. Reason: the locator
         // can override some behaviours which are propagated from the parent.
         //
         locator.bind(this, child);

         child.on("resize", this.relocateChildrenEventCallback);
         
         if($.isNumeric(index)){
             this.children.insertElementAt({figure:child, locator:locator}, index);
         }
         else{
             this.children.add({figure:child, locator:locator});
         }
         
         if(this.canvas!==null){
             child.setCanvas(this.canvas);
         }
         
         this.repaint();

         return this;
     },

     /**
      * @method
      * Remove the child figure from this figure and the canvas
      *
      * @param {draw2d.Figure} child the figure to remove.
      * 
      * @return {Object} the removed tupple of figure/locator or null if the child isn't found
      * @return {draw2d.Figure} return.figure The removed figure
      * @return {draw2d.shape.layout.Layout} return.locator The used locator of the figure
      *     
      * @since 5.0.0
     **/
     remove: function(child)
     {
         if(typeof child ==="undefined" || child ===null){
             debug.warn("The parameter child is required for Figure.remove");
             return null;
         }
         
         var removed = null;
         this.children.grep(function(e){
             var stay = e.figure!==child;
             if(!stay){
                 removed=e;
             }
             return stay;
         });

         if(removed!==null){
             child.setParent(null);
             child.setCanvas(null);
             removed.locator.unbind(this, child);
             child.off(this.relocateChildrenEventCallback);
             
             this.repaint();
             return removed;
         }

         return null;
     },

     /**
      * @method
      * Return all children/decorations of this shape which has been added with 
      * draw2d.Figure.add
      * 
      * @returns {draw2d.util.ArrayList}
      */
     getChildren: function()
     {
         return this.children.clone().map(function(e){return e.figure;});
     },
     
     
     /**
      * @method
      * Remove all children/decorations of this shape
      * 
      */
     resetChildren: function()
     {
         this.children.each(function(i,e){
             e.figure.setCanvas(null);
         });
         this.children= new draw2d.util.ArrayList();
         this.repaint();
         
         return this;
     },
     

     /**
     * @method
     * return the current SVG shape element or create it on demand.
     * 
     * @protected
     */
    getShapeElement: function()
    {
       if(this.shape!==null){
         return this.shape;
       }

      this.shape=this.createShapeElement();
      if(!this.isVisible()){
          this.shape.hide();
      }

      // add CSS class to enable styling of the element with CSS rules/files
      //
      if(this.cssClass!==null){
          this.shape.node.setAttribute("class",this.cssClass);
      }
      
      return this.shape;
    },

    /**
     * @method
     * Get the top level shape element. May the figure has a set of SVG elements. In this case this
     * method must return the top level node.<br>
     * This method is used for the toFront/toBack method to order the nodes in the correct way.
     * 
     * @since 5.0.0
     * @private
     */
    getTopLevelShapeElement: function()
    {
        return this.getShapeElement();
    },


    /**
     * @method
     * Inherited classes must override this method to implement it's own draw functionality.
     * 
     * @template
     * @abstract
     */
    createShapeElement: function()
    {
        throw "Inherited class ["+this.NAME+"] must override the abstract method createShapeElement";
    },


    /**
     * @method
     * propagate all attributes like color, stroke,... to the shape element
     * 
     * @param {Object} [attributes] the style attributes for the SVG shape
     * @private
     **/
     repaint: function(attributes)
     {
         if (this.repaintBlocked===true || this.shape === null){
             return this;
         }
         var _this = this;
         attributes = attributes || {};


         if(this.visible===true){
             if(this.shape.isVisible()===false){
                 if($.isNumeric(attributes.visibleDuration)){
                     $(this.shape.node).fadeIn(attributes.visibleDuration, function(){
                         _this.shape.show();
                     });
                 }
                 else {
                     this.shape.show();
                 }
             }
         }
         else{
             if(this.shape.isVisible()===true){
                 if($.isNumeric(attributes.visibleDuration)){
                     $(this.shape.node).fadeOut(attributes.visibleDuration, function(){
                         _this.shape.hide();
                     });
                 }
                 else {
                     this.shape.hide();
                 }
             }
        	 return this;
         }

         // enrich with common properties
         attributes.opacity = this.alpha;
         
         // performance improvement
         // Only apply attributes which has changed. This ends in a big performance improvement
         // because the raphael shape isn't redraw at all.
         //
         attributes = draw2d.util.JSON.flatDiff(attributes, this.lastAppliedAttributes);
         this.lastAppliedAttributes= attributes;


         if(!$.isEmptyObject(attributes)) {
             this.shape.attr(attributes);
         }

         this.applyTransformation();

         // Relocate all children of the figure.
         // This means that the Locator can calculate the new Position of the child.
         // This is not the best place for this. Move it to dim/size/shape changing
         // methods of the figure. A "repaint" isn't always dimension changing the figure.
         //
         this.children.each(function(i,e){
            e.locator.relocate(i, e.figure);
         });
        
         return this;
     },
     
     /**
      * @method
      * apply a transformation to the shape like rotation, translate,..
      * 
      * @private
      * @template
      */
     applyTransformation: function()
     {
         return this;
     },
     
     /**
      * @method
      * Highlight the element or remove the highlighting
      * 
      *      // Alternatively you can use the attr method:
      *      figure.attr({
      *        glow: flag
      *      });
      *     
      * @param {Boolean} flag indicates glow/noGlow
      * @template
      */
     setGlow: function(flag)
     {
    	 // do nothing in the base class. 
    	 // Subclasses must implement this method.

         return this;
     },


    /**
     * @method
     * Allow dragging only when the cursor is over a specific part of the figure.
     * <br>
     * Override this method to specify the bounding box of an element or a draw2d.util.ArrayList
     * of draw2d.geo.Rectangle of bounding boxes used to drag the figure. The returned coordinates
     * are absolute coordinates to the canvas.
     * <br>
     * <br>
     * Default implementation returns <b>null</b> to indicate to use the complete figures as
     * drag handle.
     *
     * @since 5.6.0
     * @returns {draw2d.geo.Rectangle|draw2d.util.ArrayList}
     */
     getHandleBBox: function()
     {
        return null;
     },

    /**
     * @method
     * Called if the drag and drop action begins. You can return [false] if you
     * want avoid that the figure can be move.
     * 
     * @param {Number} x the x-coordinate of the mouse up event
     * @param {Number} y the y-coordinate of the mouse up event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * 
     * @return {Boolean} true if the figure accepts dragging
     **/
    onDragStart: function(x, y, shiftKey, ctrlKey )
    {
      this.isInDragDrop =false;

      // Check whenever the figures has a drag-handle. Allow drag&drop
      // operation only if the x/y is inside this area.
      //
      // @since 5.6.0
      var bbox = this.getHandleBBox();
      if(bbox!==null && bbox.translate(this.getAbsolutePosition().scale(-1)).hitTest(x,y)===false){
          // design failure: we must catch the figure below the mouse to forward
          // the panning event to this figure. Special handling to provide sliders
          // and other UI elements which requires the panning event. Hack.
          this.panningDelegate = this.getBestChild(this.getX()+x,this.getY()+y);
          if(this.panningDelegate!==null){
              // transform x/y relative to the panning figure and request the dragStart event
              this.panningDelegate.onDragStart(x-this.panningDelegate.x, y-this.panningDelegate.y, shiftKey, ctrlKey);
          }
          return false;
      }

      this.command = this.createCommand(new draw2d.command.CommandType(draw2d.command.CommandType.MOVE));

      if(this.command!==null){
         this.ox = this.getX();
         this.oy = this.getY();
         this.isInDragDrop =true;

         // notify all installed policies
         //
         var _this = this;
         var canStartDrag = true;

         this.editPolicy.each(function(i,e){
             if(e instanceof draw2d.policy.figure.DragDropEditPolicy){
                 canStartDrag = canStartDrag && e.onDragStart(_this.canvas, _this, x,y,shiftKey,ctrlKey);
             }
         });

          if(canStartDrag) {
              // fire an event
              // @since 5.3.3
              this.fireEvent("dragstart", {x: x, y: y, shiftKey: shiftKey, ctrlKey: ctrlKey});
          }
          return canStartDrag;
      }

      return false;
    },

    /**
     * @method
     * Don't call them manually. This will be done by the framework.<br>
     * Will be called if the object are moved via drag and drop.
     * Sub classes can override this method to implement additional stuff. Don't forget to call
     * the super implementation via <code>this._super(dx, dy, dx2, dy2);</code>
     * 
     * @private
     * @param {Number} dx the x difference between the start of the drag drop operation and now
     * @param {Number} dy the y difference between the start of the drag drop operation and now
     * @param {Number} dx2 The x diff since the last call of this dragging operation
     * @param {Number} dy2 The y diff since the last call of this dragging operation
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     **/
    onDrag: function( dx,  dy, dx2, dy2, shiftKey, ctrlKey)
    {
      var _this = this;

      // apply all EditPolicy for DragDrop Operations
      //
      this.editPolicy.each(function(i,e){
            if(e instanceof draw2d.policy.figure.DragDropEditPolicy){
                var newPos = e.adjustPosition(_this,_this.ox+dx,_this.oy+dy);
                if(newPos) {
                    dx = newPos.x - _this.ox;
                    dy = newPos.y - _this.oy;
                }
            }
      });
        
      var newPos = new draw2d.geo.Point(this.ox+dx, this.oy+dy);

      // Adjust the new location if the object can snap to a helper
      // like grid, geometry, ruler,...
      //
      if(this.getCanSnapToHelper()){
        newPos = this.getCanvas().snapToHelper(this, newPos);
      }


      this.setPosition(newPos);
      
      // notify all installed policies
      //
      this.editPolicy.each(function(i,e){
          if(e instanceof draw2d.policy.figure.DragDropEditPolicy){
              e.onDrag(_this.canvas, _this);
          }
      });



      // fire an event
      // @since 5.3.3
      this.fireEvent("drag",{dx:dx, dy:dy, dx2:dx2, dy2:dy2, shiftKey:shiftKey, ctrlKey:ctrlKey});
    },

    /**
     * @method
     * Called by the framework if the figure returns false for the drag operation. In this
     * case we send a "panning" event - mouseDown + mouseMove. This is very useful for
     * UI-Widget like slider, spinner,...
     *
     *      // You can alternatively register an event handler with:
     *      figure.on("panning", function(emitter, eventData){
     *          alert("panning of the figure called");
     *      });
     *
     * @param {Number} dx the x difference between the mouse down operation and now
     * @param {Number} dy the y difference between the mouse down operation and now
     * @param {Number} dx2 The x diff since the last call of this dragging operation
     * @param {Number} dy2 The y diff since the last call of this dragging operation
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @template
     */
    onPanning: function(dx, dy, dx2, dy2, shiftKey, ctrlKey)
    {
    },

    /**
     * @method
     * Called by the framework if the panning event of the figures ends. This happens
     * after the mous up event if the panning is active.
     *
     *      // You can alternatively register an event handler with:
     *      figure.on("panningEnd", function(emitter){
     *          alert("panning of the figure called");
     *      });
     *
     */
    onPanningEnd: function()
    {
    },
    
    /**
     * @method
     * Will be called after a drag and drop action.<br>
     * Sub classes can override this method to implement additional stuff. Don't forget to call
     * the super implementation via <code>this._super();</code>
     * 
     * @param {Number} x the x-coordinate of the mouse event
     * @param {Number} y the y-coordinate of the mouse event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * 
     * @template
     **/
    onDragEnd: function( x, y, shiftKey, ctrlKey)
    {
      var _this = this;
      
      // Element ist zwar schon an seine Position, das Command muss aber trotzdem
      // in dem CommandStack gelegt werden damit das Undo funktioniert.
      //
      if (this.command !== null) {
          this.command.setPosition(this.x, this.y);
          this.canvas.getCommandStack().execute(this.command);
          this.command = null;
      }
      this.isInDragDrop = false;
      this.panningDelegate=null;

      // notify all installed policies
      //
      this.editPolicy.each(function(i,e){
          if(e instanceof draw2d.policy.figure.DragDropEditPolicy){
              e.onDragEnd(_this.canvas, _this, x, y, shiftKey, ctrlKey);
          }
      });

      this.fireEvent("move",    {figure:this, dx:0, dy:0});
      this.fireEvent("change:x",{figure:this, dx:0});
      this.fireEvent("change:y",{figure:this, dy:0});

      // fire an event
      // @since 5.3.3
      this.fireEvent("dragend",{x:x, y:y, shiftKey:shiftKey, ctrlKey:ctrlKey});
    },

    /**
     * @method
     * Called by the framework during drag&drop operations if the user drag a figure over this figure
     *
     * @param {draw2d.Figure} draggedFigure The figure which is currently dragging
     *
     * @return {draw2d.Figure} the figure which should receive the drop event or null if the element didn't want a drop event
     * @since 6.1.0
     * @private
     **/
    delegateTarget: function( draggedFigure )
    {
        var _this = this;
        var delegate = draggedFigure;
        this.getCanvas().getDropInterceptorPolicies().each(function(i, policy){
            delegate = policy.delegateTarget(draggedFigure, _this);
            if(delegate!==null){
                return false; // break the loop
            }
        });

        return delegate;
    },

    /**
     * @method
     * Called by the framework during drag&drop operations if the user drag a figure over this figure
     * 
     * @param {draw2d.Figure} draggedFigure The figure which is currently dragging
     *
     * @template
     **/
    onDragEnter: function( draggedFigure )
    {
    },
 
    /**
     * @method
     * Called if the DragDrop object leaving the current hover figure.
     * 
     * @param {draw2d.Figure} draggedFigure The figure which is currently dragging
     * @template
     **/
    onDragLeave: function( draggedFigure )
    {
    },

    
    /**
     * @method
     * Called if the user drop this element onto the dropTarget. This event is ONLY fired if the
     * shape return "this" in the {@link draw2d.Figure#onDragEnter} method.
     * 
     * 
     * @param {draw2d.Figure} dropTarget The drop target.
     * @param {Number} x the x-coordinate of the mouse up event
     * @param {Number} y the y-coordinate of the mouse up event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @template
     **/
    onDrop: function(dropTarget, x, y, shiftKey, ctrlKey)
    {
    },

    /**
     * @method
     * Called if the user dropped an figure onto this element. This event is ONLY fired if the
     * in the canvas installed {@link draw2d.policy.canvas.DropInterceptorPolicy} allow this.
     * 
     * 
     * @param {draw2d.Figure} droppedFigure The dropped figure.
     * @param {Number} x the x-coordinate of the mouse up event
     * @param {Number} y the y-coordinate of the mouse up event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @template
     * @since 4.8.0
     **/
    onCatch: function(droppedFigure, x, y, shiftKey, ctrlKey)
    {
    },
   

    /**
     * @method
     * Callback method for the mouse enter event. Usefull for mouse hover-effects.
     * Override this method for your own effects. Don't call them manually.
     *
     * @template
     **/
    onMouseEnter: function()
    {
    },
    
    
    /**
     * @method
     * Callback method for the mouse leave event. Useful for mouse hover-effects.
     * 
     * @template
     **/
    onMouseLeave: function()
    {
    },

    /**
     * @method
     * Called when a user dbl clicks on the element
     *
     *      // Alternatively you can register an event with:
     *      //
     *      figure.on("dblclick", function(emitter, event){
     *          alert("user dbl click on the figure");
     *      });
     * 
     * @template
     */
    onDoubleClick: function()
    {
    },
    
    
    /**
     * @method
     * Called when a user clicks on the element.
     * 
     *      // You can alternatively register an event handler with:
     *      figure.on("click", function(emitter, event){
     *          alert("user click on the figure");
     *      });
     * 
     * @template
     * @deprecated
     */
    onClick: function()
    {
    },
   
    /**
     * @method
     * called by the framework if the figure should show the context menu.<br>
     * The strategy to show the context menu depends on the platform. Either looong press or
     * right click with the mouse.
     * 
     *      // Alternatively you register for this event with:
     *      figure.on("contextmenu", function(emitter, event){
     *          alert("user press the right mouse button for a context menu");
     *      });
     * 
     * @param {Number} x the x-coordinate to show the menu
     * @param {Number} y the y-coordinate to show the menu
     * @since 1.1.0
     * @template
     */
    onContextMenu: function(x,y)
    {
    },

    /**
     * @method
     * Set the alpha blending of this figure. 
     * 
     *      // Alternatively you can use the attr method:
     *      figure.attr({
     *        "alpha": percent
     *      });
     *     
     *      // ...or:
     *      figure.attr({
     *        "opacity": percent
     *      });
     *
     * @param {Number} percent value between [0..1].
     * @template
     **/
    setAlpha: function( percent)
    {
      percent = Math.min(1,Math.max(0,parseFloat(percent)));
      if(percent===this.alpha){
         return;
      }

      this.alpha =percent;
      this.repaint();
      this.fireEvent("change:opacity",{value:this.alpha});

      return this;
    },

        
    /**
     * @method 
     * Return the alpha blending of the figure
     * 
     * @return {Number} the current alpha blending
     */
    getAlpha: function()
    {
        return this.alpha;
    },
    
    
    /**
     * @method
     * Set the rotation angle in degree [0..356]<br>
     * <b>Only steps of 90 degree is working well</b>
     * <br>
      *      // Alternatively you can use the attr method:
      *      figure.attr({
      *        angle: angle
      *      });
      *     
     * @param {Number} angle the rotation angle in degree
     */
    setRotationAngle: function(angle)
    {
        var _this = this;
        
        this.rotationAngle = angle;

        // Update the resize handles if the user change the position of the element via an API call.
        //
        this.editPolicy.each(function(i,e){
            if(e instanceof draw2d.policy.figure.DragDropEditPolicy){
                e.moved(_this.canvas, _this);
            }
        });

        this.fireEvent("change:angle",{value:this.rotationAngle});
        this.repaint();

        return this;
    },
    
    /**
     * @method
     * return the rotation angle of the figure in degree of [0..356].
     * 
     * <br>
     * <b>NOTE: this method is pre alpha and not for production. Only steps of 90 degree is working well</b>
     * <br>
     * @returns {Number}
     */
    getRotationAngle: function()
    {
        return this.rotationAngle;
    },
    
    
    /**
     * @method
     * Show/hide the element. The element didn't receive any mouse events (click, dblclick) if you hide the
     * figure.
     * 
      *      // Alternatively you can use the attr method:
      *      figure.attr({
      *        visible: flag
      *      });
      *     
     * @param {Boolean} flag
     * @param {Number} [duration] the optional number for the fadeIn /fadeOut of the figure
     * @since 1.1.0
     */
    setVisible: function(flag, duration)
    {
        flag=!!flag;
        if(flag===this.visible){
            return;
        }
    	this.visible = flag;
    	
    	this.repaint({visibleDuration:duration});

        if (this.visible) {
            this.fireEvent("show");
        } else {
            this.fireEvent("hide");
        }
        this.fireEvent("change:visibility",{value:this.visible});

    	return this;
    },
    
    /**
     * @method
     * Return true if the figure visible.
     * 
     * @return {Boolean}
     * @since 1.1.0
     */
    isVisible: function()
    {
        return this.visible && this.shape!==null;
    },
    
    /**
     * @method
     * Guarantee, that the figure width/height will not be distorted. Applicable before calling setDimension().
     * It is false by default.
     * 
     * @since 4.1.0
     * @param {Boolean} flag boolean flag if the figure should respect the aspect ratio
     */
    setKeepAspectRatio: function( flag)
    {
        this.keepAspectRatio = flag;
        
        return this;
    },
    
    /**
     * @method
     * Return the flag if the shape keep the aspect ratio.
     * 
     * @since 4.1.0
     */
    getKeepAspectRatio: function()
    {
        return this.keepAspectRatio;
    },
    
    /**
     * @method
     * Return the current z-index of the element. Currently this is an expensive method. The index will be calculated
     * all the time. Caching is not implemented at the moment.
     * 
     * @return {Number}
     */
    getZOrder: function()
    {
        if(this.shape===null){
            return -1;
        }
        
        var i = 0;
        var child = this.shape.node;
        while( (child = child.previousSibling) !== null ) {
          i++;
        }
        return i;
    },
    
    /**
     * @method
     * Set the flag if this object can snap to grid or geometry.
     * A window of dialog should set this flag to false.
     * 
     * @param {Boolean} flag The snap to grid/geometry enable flag.
     *
     **/
    setCanSnapToHelper: function(flag)
    {
      this.canSnapToHelper = !!flag;

      return this;
    },

    /**
     * @method
     * Returns true if the figure can snap to any helper like a grid, guide, geometrie
     * or something else.
     *
     * @return {Boolean}
     **/
    getCanSnapToHelper: function()
    {
      return this.canSnapToHelper;
    },

    /**
     *
     * @return {draw2d.geo.Point}
     **/
    getSnapToGridAnchor: function()
    {
      return this.snapToGridAnchor;
    },

    /**
     * @method
     * Set the hot spot for all snapTo### operations.
     *
     * @param {draw2d.geo.Point} point
     **/
    setSnapToGridAnchor: function(point)
    {
      this.snapToGridAnchor = point;
      
      return this;
    },

    /**
     * @method
     * Set the width of the figure and consider the minWidth attribute
     * 
     * @param {Number} width the new width of the figure
     * @since 5.1.0
     */
    setWidth: function( width)
    {
        this.setDimension(parseFloat(width), this.getHeight());
        this.fireEvent("change:width",{value:this.width});

        return this;
    },
    
    /**
     * @method
     * The current width of the figure.
     * 
     * @type {Number}
     **/
    getWidth: function()
    {
      return this.width;
    },

    /**
     * @method
     * Set the heigth of the figure and consider the minWidth attribute
     * 
     * @param {Number} height the new height of the figure
     * @since 5.1.0
     */
    setHeight: function( height)
    {
        this.setDimension(this.getWidth(), parseFloat(height));
        this.fireEvent("change:height",{value:this.height});

        return this;
    },
    
    /**
     * @method 
     * The current height of the figure.
     * 
     * @return {Number}
     **/
    getHeight: function()
    {
      return this.height;
    },


    /**
     * @method
     * This value is relevant for the interactive resize of the figure.
     *
     * @return {Number} Returns the min. width of this object.
     */
    getMinWidth: function()
    {
      return this.minWidth;
    },

    /**
     * @method
     * Set the minimum width of this figure
     * 
     * @param {Number} w
     */
    setMinWidth: function(w)
    {
      this.minWidth = parseFloat(w);
      this.fireEvent("change:minWidth",{value:this.minWidth});

      // fit the width with the new constraint
      this.setWidth(this.getWidth());
      
      return this;
    },
    
    /**
     * @method
     * This value is relevant for the interactive resize of the figure.
     *
     * @return {Number} Returns the min. height of this object.
     */
    getMinHeight: function()
    {
      return this.minHeight;
    },

    /**
     * @method
     * Set the minimum height of the figure.
     * 
     * @param {Number} h
     */
    setMinHeight: function(h)
    {
        this.minHeight =parseFloat(h);
        this.fireEvent("change:minHeight",{value:this.minHeight});

        // fit the height with the new constraint
        this.setHeight(this.getHeight());

        return this;
    },

    
    /**
     * @method
     * the the x-offset related to the parent figure or canvas
     * 
     * @param {Number} x the new x offset of the figure
     * @since 5.0.8
     */
    setX: function(x)
    {
        this.setPosition(parseFloat(x), this.y);
        this.fireEvent("change:x",{value:this.x});

        return this;
    },
    
    /**
     * @method
     * The x-offset related to the parent figure or canvas.
     * 
     * @return {Number} the x-offset to the parent figure
     **/
    getX: function()
    {
        return this.x;
    },

    /**
     * @method
     * the the y-offset related to the parent figure or canvas
     * 
     * @param {Number} y the new x offset of the figure
     * @since 5.0.8
     */
    setY: function(y)
    {
        this.setPosition(this.x, parseFloat(y));
        this.fireEvent("change:y",{value:this.y});

        return this;
    },
    
    
    /**
     * @method
     * The y-offset related to the parent figure or canvas.
     * 
     * @return {Number} The y-offset to the parent figure.
     **/
    getY: function()
    {
        return this.y;
    },

    
    /**
     * @method
     * The x-offset related to the canvas.
     * 
     * @return {Number} the x-offset to the canvas
     **/
    getAbsoluteX: function()
    {
        if(!this.parent){
            return this.getX();
        }
        
        return this.getX() + this.parent.getAbsoluteX();  
    },


    /**
     * @method
     * The y-offset related to the canvas.
     * 
     * @return {Number} The y-offset to the canvas.
     **/
    getAbsoluteY: function()
    {
        if(!this.parent){
            return this.getY();
        }
        return this.getY() + this.parent.getAbsoluteY();  
    },


    /**
     * @method
     * Returns the absolute y-position of the port.
     *
     * @type {draw2d.geo.Point}
     **/
    getAbsolutePosition: function()
    {
      return new draw2d.geo.Point(this.getAbsoluteX(), this.getAbsoluteY());
    },
    
    /**
     * @method
     * Returns the absolute y-position of the port.
     *
     * @return {draw2d.geo.Rectangle}
     **/
    getAbsoluteBounds: function()
    {
      return new draw2d.geo.Rectangle(this.getAbsoluteX(), this.getAbsoluteY(),this.getWidth(),this.getHeight());
    },
    

    /**
     * @method
     * Set the position of the object.
     *
      *      // Alternatively you can use the attr method:
      *      figure.attr({
      *        x: x,
      *        y: y
      *      });
      *     
     * @param {Number|draw2d.geo.Point} x The new x coordinate of the figure or the x/y coordinate if it is an draw2d.geo.Point
     * @param {Number} [y] The new y coordinate of the figure 
     **/
    setPosition: function(x, y)
    {
        if(typeof x==="undefined"){
            debugger;
        }

        var oldPos = {x:this.x, y:this.y};

        if (x instanceof draw2d.geo.Point) {
            this.x = x.x;
            this.y = x.y;
        }
        else {
            this.x = x;
            this.y = y;
        }


        var _this = this;

        this.editPolicy.each(function(i,e){
            if(e instanceof draw2d.policy.figure.DragDropEditPolicy){
                var newPos = e.adjustPosition(_this,_this.x,_this.y);
                _this.x = newPos.x;
                _this.y = newPos.y;
            }
        });

        this.repaint();

        // don't fire any events or update the ResizeHandles if nothing has happen
        //
      //  if(oldPos.x!=this.x || oldPos.y!=this.y)
        {

            // Update the resize handles if the user change the position of the
            // element via an API call.
            //
            this.editPolicy.each(function (i, e) {
                if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
                    e.moved(_this.canvas, _this);
                }
            });

            var dx = this.x-oldPos.x;
            var dy = this.y-oldPos.y;
            this.fireEvent("move",     {figure:this,dx: dx, dy:dy});
            this.fireEvent("change:x", {figure:this,dx: dx});
            this.fireEvent("change:y", {figure:this,dy: dy});
        }

        return this;
    },
    

    
    /**
     * @method
     * Get the current position of the figure 
     * 
     * @return {draw2d.geo.Point}
     * @since 2.0.0
     */
    getPosition: function()
    {
        return new draw2d.geo.Point(this.getX(), this.getY());
    },
    
    /**
     * @method
     * Translate the figure with the given x/y offset.
     *
     * @param {Number} dx The x offset to translate
     * @param {Number} dy The y offset to translate 
     **/
    translate: function(dx , dy )
    {
    	this.setPosition(this.getX()+dx,this.getY()+dy);
    	
    	return this;
    },
    
    
    /**
     * @method
     * Set the new width and height of the figure. 
     *
     *      // Alternatively you can use the attr method:
     *      figure.attr({
     *         width:  w,
     *         height: h
     *      });
     *     
     * @param {Number} w The new width of the figure
     * @param {Number} h The new height of the figure
     **/
    setDimension: function(w, h)
    {
        var old = {width:this.width, height:this.height};

        var _this = this;
        w = Math.max(this.getMinWidth(),w);
        h = Math.max(this.getMinHeight(),h);

        if(this.width === w && this.height ===h){
            // required if an inherit figure changed the w/h to a given constraint.
            // In this case the Resize handles must be informed that the shape didn't resized.
            // because the minWidth/minHeight did have a higher prio.
            this.editPolicy.each(function(i,e){
                if(e instanceof draw2d.policy.figure.DragDropEditPolicy){
                    e.moved(_this.canvas, _this);
                }
             });
            return this;
        }

        
    	// apply all EditPolicy to adjust/modify the new dimension
        //
        this.editPolicy.each(function(i,e){
              if(e instanceof draw2d.policy.figure.DragDropEditPolicy){
                  var newDim = e.adjustDimension(_this,w,h);
                  w = newDim.w;
                  h = newDim.h;
              }
        });

        // respect the aspect ratio if required
        //
        if(this.keepAspectRatio===true){
            if (w >= this.getMinWidth()) {
                // scale the height to the given ratio
                h = this.getHeight() * (w/this.getWidth());
                // and apply the new dimension only if the values are in range of the given constraints
                if(h>=this.getMinHeight()){
                    this.width = w;
                    this.height= h;
                }
            } 
        }
        else{
            this.width = Math.max(this.getMinWidth(),w);
            this.height= Math.max(this.getMinHeight(),h);
        }



        // just fire the event if really something happens
        //
        //if(old.w!=this.width || old.h != this.height)
        {
            this.repaint();

            this.fireEvent("resize");
            this.fireEvent("change:dimension",{value:{height:this.height, width:this.width, old:old}});

            // Update the resize handles if the user change the position of the element via an API call.
            //
            this.editPolicy.each(function (i, e) {
                if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
                    e.moved(_this.canvas, _this);
                }
            });
        }

		return this;
    },


    /**
     * @method
     * Set the bounding box of the figure
     * 
     *      // Alternatively you can use the attr method:
     *      figure.attr({
     *        width: w,
     *        height: h,
     *        x: x,
     *        y: y
     *      });
     *      
     *      // or
     *      figure.attr({
     *        boundingBox: {x:1, y:100, width:30, height:30}
     *      });
     *     
     * @param {draw2d.geo.Rectangle} rect
     * @since 4.8.0
     */
    setBoundingBox: function(rect)
    {
    	rect = new draw2d.geo.Rectangle(rect);

        var orig = this.repaintBlocked;
        this.repaintBlocked=true;
        this.setPosition(rect.x, rect.y);
        this.repaintBlocked=orig;
        this.setDimension(rect.w,rect.h);
        
        return this;
    },
    
    /**
     * @method
     * Return the bounding box of the figure in absolute position to the canvas.
     * 
     * @return {draw2d.geo.Rectangle}
     **/
    getBoundingBox: function()
    {
        return new draw2d.geo.Rectangle(this.getAbsoluteX(),this.getAbsoluteY(),this.getWidth(),this.getHeight());
    },

    /**
     * @method
     * Detect whenever the hands over coordinate is inside the figure.
     * The default implementation is a simple bounding box test. 
     * 
     * @param {Number} iX
     * @param {Number} iY
     * @param {Number} [corona]
     * 
     * @returns {Boolean}
     */
    hitTest: function ( iX , iY, corona)
    {
        if(typeof corona === "number"){
            return this.getBoundingBox().scale(corona,corona).hitTest(iX,iY);
        }
        return this.getBoundingBox().hitTest(iX,iY);
    },


    /**
     * @method
     * Switch on/off the drag drop behaviour of this object
     *
     * @param {Boolean} flag The new drag drop indicator
     **/
    setDraggable: function(flag)
    {
      this.draggable= !!flag;

      return this;
    },

    /**
     * @method
     * Get the Drag drop enable flag
     *
     * @return {Boolean} The new drag drop indicator
     **/
    isDraggable: function()
    {
        // delegate to the composite if given
        if(this.composite!==null){
            return this.composite.isMemberDraggable(this, this.draggable);
        }
        
        return this.draggable;
    },


    /**
     * @method
     * Returns the true if the figure can be resized.
     *
     * @return {Boolean}
     **/
    isResizeable: function()
    {
      return this.resizeable;
    },

    /**
     * @method
     * You can change the resizeable behaviour of this object. Hands over [false] and
     * the figure has no resizehandles if you select them with the mouse.<br>
     *
     *      // Alternatively you can use the attr method:
     *      figure.attr({
     *        resizeable: flag
     *      });
     *     
     * @param {Boolean} flag The resizeable flag.
     **/
    setResizeable: function(flag)
    {
      this.resizeable=!!flag;
      this.fireEvent("change:resizeable",{value:this.resizeable});

      return this;
    },

    /**
     * @method
     * Indicates whenever the element is selectable by user interaction or API.
     * 
     * @return {Boolean}
     **/
    isSelectable: function()
    {
        // delegate to the composite if given
        if(this.composite!==null){
            return this.composite.isMemberSelectable(this, this.selectable);
        }
        
        return this.selectable;
    },


    /**
     * @method
     * You can change the selectable behavior of this object. Hands over [false] and
     * the figure has no selection handles if you try to select them with the mouse.<br>
     *
     * @param {Boolean} flag The selectable flag.
     **/
    setSelectable: function(flag)
    {
      this.selectable=!!flag;
      this.fireEvent("change:selectable",{value:this.selectable});

      return this;
    },

    /**
     * @method
     * Return true if the object doesn't care about the aspect ratio.
     * You can change the height and width independent.<br>
     * 
     * Replaced with "getKeepAspectRatio"
     * @return {Boolean}
     * @deprecated
     */
    isStrechable: function()
    {
      return !this.getKeepAspectRatio();
    },

    /**
     * @method
     * Return false if you avoid that the user can delete your figure.
     * Sub class can override this method.
     * 
     * @return {Boolean}
     **/
    isDeleteable: function()
    {
      return this.deleteable;
    },

    /**
     * @method
     * Set the flag if the shape is deleteable.
     * 
     * @param {Boolean} flag enable or disable flag for the delete operation
     **/
    setDeleteable: function(flag)
    {
      this.deleteable = !!flag;
      this.fireEvent("change:deleteable",{value:this.deleteable});

      return this;
    },

    /**
     * @method
     * Set the parent of this figure.
     * Don't call them manually.
     * 
     * @param {draw2d.Figure} parent The new parent of this figure
     * @private
     **/
    setParent: function( parent)
    {
      this.parent = parent;

      if(parent!==null) {
          // inherit the selection handling impl from the parent
          this.setSelectionAdapter(parent.getSelectionAdapter());
      }
      else{
          // use default
          this.setSelectionAdapter(null);
      }

      return this;
    },

    /**
     * @method
     * Get the parent of this figure.
     *
     * @return {draw2d.Figure}
     **/
    getParent: function()
    {
      return this.parent;
    },

    /**
     * @method
     * Check to see if a figure is a descendant of another figure.
     * <br>
     * The contains() method returns true if the figure provided by the argument is a descendant of this figure,
     * whether it is a direct child or nested more deeply. Otherwise, it returns false.
     *
     * @param {draw2d.Figure} containedFigure The figure that may be contained by (a descendant of) this figure.
     * @since 5.5.4
     */
    contains: function(containedFigure)
    {
        if(containedFigure.getParent()===this){
            return true;
        }

        for(var i= 0,len=this.children.getSize(); i<len;i++){
            var child = this.children.get(i).figure;
            if(child.contains(containedFigure)) {
                return true;
            }
        }
        return false;
    },

    /**
     * @method
     * Get the top most parent of this figure. This can be an layout figure or parent container
     *
     * @return {draw2d.Figure}
     * @since 5.0.6
     **/
    getRoot: function()
    {
        var root = this.parent;
        while(root!==null && root.parent!==null){
            root = root.parent;
        }
        return root;
    },

    /**
     * @method
     * Set the assigned composite of this figure.
     * 
     * @param {draw2d.shape.composite.StrongComposite} composite The assigned composite of this figure
     * @private
     * @since 4.8.0
     **/
    setComposite: function( composite)
    {
        if(composite!==null && !(composite instanceof draw2d.shape.composite.StrongComposite)){
            throw "'composite must inherit from 'draw2d.shape.composite.StrongComposite'";
        }
        
        this.composite = composite;

        return this;
    },

    /**
     * @method
     * Get the assigned composite of this figure.
     *
     * @return {draw2d.shape.composite.StrongComposite}
     * @since 4.8.0
     **/
    getComposite: function()
    {
      return this.composite;
    },



    /**
     * @method
     * Execute all handlers and behaviors attached to the figure for the given event type.
     * 
     * 
     * @param {String} event the event to trigger
     * @param {Object} [args] optional parameters for the triggered event callback
     * 
     * @since 5.0.0
     */
    fireEvent: function(event, args) 
    {
        try{
            if (typeof this.eventSubscriptions[event] === 'undefined') {
                return;
            }
            
            // avoid recursion
            if(this._inEvent===true){
                return;
            }
            this._inEvent=true;
            var subscribers = this.eventSubscriptions[event];
            for (var i=0; i<subscribers.length; i++) {
                subscribers[i](this, args);
            }
        }
        finally{
            this._inEvent=false;
            
            // fire a generic change event if an attribute has changed
            // required for some DataBinding frameworks or for the Backbone.Model compatibility
            // the event "change" with the corresponding attribute name as additional parameter
            if(event.substring(0,7)==="change:"){
                this.fireEvent("change",event.substring(7));
            }
       }
    },
    
    /**
     * @method
     * Attach an event handler function for one or more events to the figure.
     * To remove events bound with .on(), see {@link #off}.
     * 
     * possible events are:<br>
     * <ul>
     *   <li>click</li>
     *   <li>dblclick</li>
     *   <li>move</li>
     *   <li>resize</li>
     *   <li>timer</li>
     *   <li>contextmenu</li>
     *   <li>show</li>
     *   <li>hide</li>
     *   <li>added</li>
     *   <li>removed</li>
     *   <li>change:[attr]</li>
     * </ul>
     * 
     * @param {String}   event One or more space-separated event types
     * @param {Function} callback A function to execute when the event is triggered. 
     * @param {draw2d.Figure} callback.emitter the emitter of the event
     * @param {Object} [callback.obj] optional event related data
     * @param {Object} [context] optional context of the function callback.
     * @since 5.0.0
     */
    on: function(event, callback, context) {
        var events = event.split(" ");
        if(typeof callback ==="undefined"){
            debugger;
        }
        // the "context" param is add to be compatible with Backbone.Model.
        // The project "backbone.ModelBinder" requires this signature and we want to be nice.
        //
        if(context){
            callback = $.proxy(callback,context);
            callback.___originalCallback = callback;
        }
        
        for(var i=0; i<events.length; i++){
            if (typeof this.eventSubscriptions[events[i]] === 'undefined') {
                this.eventSubscriptions[events[i]] = [];
            }
            // avoid doublicate registration for the same event with the same callback method
            if(-1 !== $.inArray(callback, this.eventSubscriptions[events[i]])){
             //   debugger
            }
            else {
                this.eventSubscriptions[events[i]].push(callback);
            }
        }
        return this;
    },
    
    /**
     * @method
     * The .off() method removes event handlers that were attached with {@link #on}.<br>
     * Calling .off() with no arguments removes all handlers attached to the elements.<br>
     * <br>
     * If a simple event name such as "move" is provided, all events of that type are removed from the figure. 
     * 
     * 
     * @param {String|Function} eventOrFunction the event name of the registerd function or the function itself
     * @since 5.0.0
     */
    off: function( eventOrFunction)
    {
        if(typeof eventOrFunction ==="undefined"){
            this.eventSubscriptions = {};
        }
        else if( typeof eventOrFunction === 'string'){
            this.eventSubscriptions[eventOrFunction] = [];
        }
        else{
            for(var event in this.eventSubscriptions ){
                this.eventSubscriptions[event] =$.grep(this.eventSubscriptions[event], function( callback ) { 
                    if(typeof callback.___originalCallback !=="undefined"){
                        return callback.___originalCallback !== eventOrFunction;
                    }
                    return callback !== eventOrFunction; 
                });
            }
        }

        return this;
    },



    /**
     * @method
     * Returns the best figure at the location [x,y]. It is a simple hit test. Keep in mind that only visible objects
     * are returned.
     *
     * @param {Number} x The x position.
     * @param {Number} y The y position.
     * @param {draw2d.Figure|Array} [figureToIgnore] The figures which should be ignored.
     **/
    getBestChild: function(x, y, figureToIgnore)
    {
        if(!$.isArray(figureToIgnore)){
            if(figureToIgnore instanceof draw2d.Figure){
                figureToIgnore = [figureToIgnore];
            }
            else{
                figureToIgnore=[];
            }
        }

        var result = null;

        // tool method to check recursive a figure for hitTest
        //
        var checkRecursive = function(children){
            children.each(function(i,e){
                var c=e.figure;
                checkRecursive(c.children);
                if(result===null && c.isVisible()===true && c.hitTest(x,y)===true && $.inArray(c, figureToIgnore)===-1){
                    result = c;
                }
                return result===null; // break the each-loop if we found an element
            });
        };

        checkRecursive( this.children);

        return result;
    },

    /**
     * @method
     * Returns the Command to perform the specified Request or null.
      *
     * @param {draw2d.command.CommandType} request describes the Command being requested
     * @return {draw2d.command.Command} null or a Command
     * @private
     **/
    createCommand: function( request)
    {
      if(request===null){
          return null;
      }
      
      if(request.getPolicy() === draw2d.command.CommandType.MOVE)
      {
        if(!this.isDraggable()){
          return null;
        }
        return new draw2d.command.CommandMove(this);
      }

      if(request.getPolicy() === draw2d.command.CommandType.DELETE)
      {
        if(!this.isDeleteable()){
           return null;
        }
        return new draw2d.command.CommandDelete(this);
      }
      
      if(request.getPolicy() === draw2d.command.CommandType.RESIZE)
      {
        if(!this.isResizeable()){
           return null;
        }
        return new draw2d.command.CommandResize(this);
      }
      
      return null;
    },
    
    /**
     * @method
     * Clone the figure. <br>
     * You must override and implement the methods <b>getPersistentAttributes</b> and <b>setPersistentAttributes</b> for your custom
     * figures if the have special attributes.
     *
     * The clone() method performs a deep copy of the object, meaning that it copies the children, ports and decorations
     * per default. You can control the clone procedure with the 'cloneMetaData'.
     *
     *
     * @param {Object} [cloneMetaData] controls the clone procedure
     * @param {Boolean} [cloneMetaData.excludeChildren] set it to true if you want exclude the children.
     *
     * @since 4.1.0
     * @experimental
     */
    clone: function(cloneMetaData)
    {
        cloneMetaData = $.extend({exludeChildren:false},cloneMetaData);

        var clone = eval("new "+this.NAME+"();");
        var initialId = clone.id;

        clone.setPersistentAttributes( this.getPersistentAttributes());
        
        clone.id = initialId;
        
        // add all decorations to the memento 
        //
        if(cloneMetaData.exludeChildren===false) {
            clone.resetChildren();
            this.children.each(function (i, entry) {
                var child = entry.figure.clone();
                // we can ignore the locator if this didn't provide a "correct" name, this can happen in some
                // Layout shapes like VerticalLayout or Horziontal Layout. This figures injects it own kind
                // of layouter...so didn'T care about this.

                var locator = entry.locator.NAME ? eval("new " + entry.locator.NAME + "();") : null;
                clone.add(child, locator);
            });
        }

        return clone;
    },
    
    /**
     * @method 
     * Return an objects with all important attributes for XML or JSON serialization
     * 
     * @return
     */
    getPersistentAttributes: function()
    {
        // force deep copy of userData to avoid side effects in the clone method.
        //
        var memento= {
            type  : this.NAME,
            id    : this.id,
            x     : this.getX(),
            y     : this.getY(),
            width : this.width,
            height: this.height,
            alpha : this.alpha,
            angle : this.rotationAngle,
           userData: $.extend(true,{},this.userData)
        };

        
        if(this.cssClass!==null){
            memento.cssClass= this.cssClass;
        }
        
        if(this.composite!==null){
            memento.composite = this.composite.getId();
        }

        return memento;
    },
    
    /**
     * @method 
     * Read all attributes from the serialized properties and transfer them into the shape.
     * 
     * @param {Object} memento
     */
    setPersistentAttributes: function(memento)
    {
        this.id    = memento.id;
        this.setPosition( parseFloat(memento.x), parseFloat(memento.y));
        
        // width and height are optional parameter for the JSON stuff.
        // We use the defaults if the attributes not present
        if(typeof memento.width !== "undefined"){
            this.width = parseFloat(memento.width);
        }
        
        if(typeof memento.height !== "undefined"){
            this.height= parseFloat(memento.height);
        }
        
        if(typeof memento.userData !== "undefined"){
            this.userData= memento.userData;
        }

        if(typeof memento.cssClass !== "undefined"){
            this.setCssClass(memento.cssClass);
        }
        
        if(typeof memento.alpha !== "undefined"){
            this.setAlpha(parseFloat(memento.alpha));
        }

        if(typeof memento.angle !== "undefined"){
            this.rotationAngle = parseFloat(memento.angle);
        }

        return this;
    }
});


