// user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Invoice = new mongoose.Schema({
    
    date: {
      type: String
    },
    username: {
      type: String
    }
   
});




var invoice = mongoose.model('invoice', Invoice);
module.exports = invoice;