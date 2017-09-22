
/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************/
/**
 * @class draw2d.HybridPort
 * A HybridPort can work as Input and as Output port in the same way for a {@link draw2d.Connection}.
 * 
 * @author Andreas Herz
 * @extends draw2d.Port
 */ 
draw2d.HybridPort = draw2d.Port.extend({

    NAME : "draw2d.HybridPort",

    /**
     * @constructor
     * Create a new HybridPort element
     * 
     * @param {Object} [attr] the configuration of the shape
     */
    init: function(attr, setter, getter)
    {
        this._super(attr, setter, getter);

        // responsive for the arrangement of the port 
        // calculates the x/y coordinates in relation to the parent node
        this.locator=new draw2d.layout.locator.InputPortLocator();
    },

    /**
     * @inheritdoc
     */
    createCommand: function(request)
    {
       // Connect request between two ports
       //
       if(request.getPolicy() === draw2d.command.CommandType.CONNECT) {
           
         if(request.source.getParent().getId() === request.target.getParent().getId()){
            return null;
         }    

         if (request.source instanceof draw2d.InputPort) {
            // This is the difference to the InputPort implementation of createCommand.
            return new draw2d.command.CommandConnect(request.target, request.source, request.source, request.router);
         }
         else if (request.source instanceof draw2d.OutputPort) {
            // This is the different to the OutputPort implementation of createCommand
            return new draw2d.command.CommandConnect(request.source, request.target, request.source, request.router);
         }
         else if (request.source instanceof draw2d.HybridPort) {
            // This is the different to the OutputPort implementation of createCommand
            return new draw2d.command.CommandConnect(request.target,request.source, request.source, request.router);
         }
         
         return null;
       }
    
       // ...else call the base class
       return this._super(request);
    }
});