// user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Msg = new mongoose.Schema({
    
    date: {
      type: String
    },
    username: {
      type: String
    },
    subject: {
      type: String
    },
    msg: {
      type: String
    }
   
});




var messageBox = mongoose.model('messageBox', Msg);
module.exports = messageBox;