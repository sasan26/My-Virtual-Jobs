// payment history model ( gamer and partner console )
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PayHis = new mongoose.Schema({
    
    date: {   // payment date
      type: String
    },
    username: {   // username
      type: String
    },
    coins: {    // purchased coins
      type: String
    },
    amount: {   // purchased $
      type: Number
    }
   
});

var paymentHistory = mongoose.model('paymentHistory', PayHis);
module.exports = paymentHistory;