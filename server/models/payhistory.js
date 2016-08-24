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
    amount: {
      type: Number
    }
   
});




var paymentHistory = mongoose.model('paymentHistory', PayHis);
module.exports = paymentHistory;