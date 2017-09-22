/**
 * @class example.connection_labeledit.LabelConnection
 * 
 * A simple Connection with a label wehich sticks in the middle of the connection..
 *
 * @author Andreas Herz
 * @extend draw2d.Connection
 */
var MyConnection= draw2d.Connection.extend({
    
    NAME: "MyConnection",  /* required for JSON read/write */
    
    init:function(attr)
    {
      this._super(attr);
    },


});
