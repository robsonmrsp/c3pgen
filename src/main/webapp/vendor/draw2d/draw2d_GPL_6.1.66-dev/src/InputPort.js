
/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************/
/**
 * @class draw2d.InputPort
 * A InputPort is the start anchor for a {@link draw2d.Connection}.
 * 
 * @author Andreas Herz
 * @extend draw2d.Port
 */ 
draw2d.InputPort = draw2d.Port.extend({

    NAME : "draw2d.InputPort",

    /**
     * @constructor
     * Create a new InputPort element
     * 
     * @param {Object} [attr] the configuration of the shape
     */
    init: function( attr, setter, getter)
    {
        this._super( attr, setter, getter);
        
        // responsive for the arrangement of the port 
        // calculates the x/y coordinates in relation to the parent node
        this.locator=new draw2d.layout.locator.InputPortLocator();
    },


    /**
     * @inheritdoc
     */
    createCommand: function( request)
    {
       // Connect request between two ports
       //
       if(request.getPolicy() === draw2d.command.CommandType.CONNECT)  {
           return new draw2d.command.CommandConnect(request.source, request.target, request.source, request.router);
       }

       // ...else call the base class
       return this._super(request);
    }
});