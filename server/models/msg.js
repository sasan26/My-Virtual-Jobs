// message model ( partner console )
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Msg = new mongoose.Schema({
    
    date: {   // msg date
      type: String
    },
    username: {   // gamer username
      type: String
    },
    subject: {    // message subject
      type: String
    },
    msg: {    // message body
      type: String
    }   
});

var messageBox = mongoose.model('messageBox', Msg);
module.exports = messageBox;