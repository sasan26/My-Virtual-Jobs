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
    employee: {
      type: String
    }
   
});




var payout = mongoose.model('payout', PayHis);
module.exports = payout;