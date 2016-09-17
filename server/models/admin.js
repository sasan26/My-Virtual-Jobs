// admin model ( admin console )
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Invoice = new mongoose.Schema({
    
    date: {		// requested date
      type: String
    },
    username: {		// requested gamer username
      type: String
    }
   
});

var invoice = mongoose.model('invoice', Invoice);
module.exports = invoice;