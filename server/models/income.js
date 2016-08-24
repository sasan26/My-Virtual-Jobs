// user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PayHis = new mongoose.Schema({
    
    date: {
      type: String
    },
    username: {
      type: String
    },
    coins: {
      type: String
    },
    employer: {
      type: String
    }
   
});




var income = mongoose.model('income', PayHis);
module.exports = income;